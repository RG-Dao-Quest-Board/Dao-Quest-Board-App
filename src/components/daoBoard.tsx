import { Box, Button, Textarea } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useUser } from "../contexts/UserContext";
import { createQuest, deleteQuest, getAllQuests } from "../services/noticeService";
import { questType } from "../types/questType";
import { userHubDaosType } from "../types/userDao";

export const DaoBoard = (props: { dao: any }) => {
    const [questMessage, setQuestMessage] = useState<string>("");
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [allQuests, setAllQuests] = useState([]);
    const { userHubDaos } = useUser();
    const userDaoMembershipNames = userHubDaos.reduce((daos: string[], network: userHubDaosType) => {
        if (network.data.length) {
            network.data.forEach(net => daos.push(net.meta.name));
        }
        return daos;
    }, []);
    const refreshAllQuests = useCallback(() => {
        getAllQuests().then(quests => {
            const daoQuests = quests.reduce((quests: any, quest: any) => {
                if (quest.dao === props.dao) quests.push(quest);
                return quests;
            }, []);
            console.log("DAOQUESTS", daoQuests)
            setAllQuests(daoQuests);
        })
    }, [props.dao])

    useEffect(() => {
        refreshAllQuests();
    }, [props.dao, refreshAllQuests]);

    const handleDeleteQuest = useCallback((e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        deleteQuest(id).then((res) => { alert("Success"); refreshAllQuests() }).catch((error) => alert(error));
        ;
    }, [refreshAllQuests])

    const currentDaoQuests = () => {
        return allQuests.length ? allQuests.map((quest: any) => {
            const startingPosition = {
                x: quest.position_x,
                y: quest.position_y
            };
            return (
                <Draggable bounds="parent" defaultPosition={startingPosition} disabled={!userDaoMembershipNames.includes(props.dao)} >
                    <Box p={4} maxW='lg' borderWidth='2px' borderRadius="lg">
                        <Textarea isDisabled={!userDaoMembershipNames.includes(props.dao)} defaultValue={quest.quest_text} marginTop={4} />
                        {userDaoMembershipNames.includes(props.dao) &&
                            (<Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDeleteQuest(e, quest._id)} value={quest.id}>Delete</Button>)}
                    </Box>
                </Draggable>
            )
        }) : null;
    }
    const handleQuestChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setQuestMessage(e.target.value);
    }
    const handlePostQuest = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        //submit to db
        const quest: questType = {
            dao: props.dao,
            quest_text: questMessage,
            position_x: x,
            position_y: y
        }
        console.log("QUEST:", quest)
        createQuest(quest).then((res) => { if (res) { alert("Success"); refreshAllQuests(); setShowCreateForm(false); } }).catch((error) => alert(error));
    }


    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        e.preventDefault();
        setX(data.x)
        setY(data.y)
    };
    const handleCreateQuest = (e: React.MouseEvent<HTMLButtonElement>, show: boolean) => {
        e.preventDefault();
        setShowCreateForm(show);
    }


    return (
        <Box>
            {showCreateForm ? null :
                userDaoMembershipNames.includes(props.dao) &&
                (<Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleCreateQuest(e, true)} m={4}>
                    Create Quest
                </Button>)
            }

            <Box p={4} m={4} w="1000" h="1000" position={"relative"} borderWidth='5px' borderRadius="lg" borderColor={"blue.900"} overflow={"auto"}>
                {
                    showCreateForm ?
                        userDaoMembershipNames.includes(props.dao) && (
                            <Draggable bounds={"parent"} defaultPosition={{ x: 0, y: 0 }} onStop={handleStop}  >
                                <Box p={4} maxW='lg' borderWidth='2px' borderRadius="lg">
                                    {userDaoMembershipNames.includes(props.dao) ?
                                        <>
                                            <Textarea value={questMessage}
                                                onChange={handleQuestChange} placeholder="Create a quest" marginY={4} />
                                            <Button onClick={handlePostQuest} >Post Quest</Button>
                                        </>
                                        : "NOT a member"}
                                    <Button ml={"5px"} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleCreateQuest(e, false)}>
                                        Close
                                    </Button>
                                </Box>

                            </Draggable>
                        )
                        : null
                }
                {currentDaoQuests()}
            </Box>

        </Box>
    )
};