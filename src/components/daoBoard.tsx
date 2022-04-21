import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useUser } from "../contexts/UserContext";
import { createQuest, deleteQuest } from "../services/noticeService";
import { questType } from "../types/questType";
import { userHubDaosType } from "../types/userDao";

export const DaoBoard = (props: { dao: any, quests: any }) => {
    const [questMessage, setQuestMessage] = useState<string>("");
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const { userHubDaos } = useUser();
    const userDaoMembershipNames = userHubDaos.reduce((daos: string[], network: userHubDaosType) => {
        if (network.data.length) {
            network.data.forEach(net => daos.push(net.meta.name));
        }
        return daos;
    }, []);

    const daoQuests = props.quests.reduce((quests: any, quest: any) => {
        if (quest.dao === props.dao) quests.push(quest);
        return quests;
    }, []);

    const handleDeleteQuest = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        deleteQuest(id).then((res) => { if (res) { console.log("Success! refresh to see the changes") } }).catch((error) => alert(error)); // TODO dont show deleted quest before refresh as well
    }

    const currentDaoQuests = () => {
        return daoQuests.length ? daoQuests.map((quest: any) => {
            const startingPosition = {
                x: quest.position_x,
                y: quest.position_y
            };
            return (
                <Draggable defaultPosition={startingPosition} disabled={!userDaoMembershipNames.includes(props.dao)} >
                    <Box p={4} maxW='lg' borderWidth='2px' borderRadius="lg">
                        <Textarea isDisabled={!userDaoMembershipNames.includes(props.dao)} defaultValue={quest.quest_text} marginTop={4} />
                        <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDeleteQuest(e, quest._id)} value={quest.id}>Delete</Button>
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
        createQuest(quest).then((res) => { if (res) { alert("Success") } }).catch((error) => alert(error)); //TODO show posted quest after submit instead of after refresh
    }


    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        e.preventDefault();
        setX(data.x)
        setY(data.y)
    };

    return (
        <div>
            {currentDaoQuests()}
            {userDaoMembershipNames.includes(props.dao) && (
                <Draggable bounds={{ top: -100, left: 0 }} defaultPosition={{ x: 0, y: 0 }} onStop={handleStop}  >
                    <Box p={4} maxW='lg' borderWidth='2px' borderRadius="lg">
                        {userDaoMembershipNames.includes(props.dao) ? <><Textarea value={questMessage}
                            onChange={handleQuestChange} placeholder="Create a quest" marginTop={4} /><Button onClick={handlePostQuest} >Post Quest</Button> </> : "NOT a member"}
                    </Box>
                </Draggable>
            )}
        </div>
    )
};