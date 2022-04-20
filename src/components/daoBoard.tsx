import { Box, Textarea } from "@chakra-ui/react";
import Draggable from 'react-draggable';
import { useUser } from "../contexts/UserContext";
import { userHubDaosType } from "../types/userDao";

export const DaoBoard = (props: { dao: any, quests: any }) => {
    const { userHubDaos } = useUser();
    const userDaoMembershipNames = userHubDaos.reduce((daos: string[], network: userHubDaosType) => {
        if (network.data.length) {
            network.data.forEach(net => daos.push(net.meta.name));
        }
        return daos;
    }, []);

    const daoQuests = props.quests.reduce((quests: any, quest: any) => {
        if(quest.dao === props.dao) quests.push(quest);
        return quests;
    }, []);

    const currentDaoQuests = () => {
        return daoQuests.length ? daoQuests.map((quest: any) => {
            const startingPosition = {
                x: quest.position_x,
                y: quest.position_y
            };
            return (
              <Draggable defaultPosition={startingPosition} disabled={!userDaoMembershipNames.includes(props.dao)}>
              <Box p={4} maxW='lg' borderWidth='2px' borderRadius="lg">
                  <Textarea isDisabled={!userDaoMembershipNames.includes(props.dao)} defaultValue={quest.quest_text} marginTop={4} />
              </Box>
          </Draggable>
        )}) : null;
    }

    return (
      <div>
          {currentDaoQuests()}
          {userDaoMembershipNames.includes(props.dao) && (
              <Draggable defaultPosition={{x: 0, y: 0}}>
                  <Box p={4} maxW='lg' borderWidth='2px' borderRadius="lg">
                      {userDaoMembershipNames.includes(props.dao) ? <Textarea placeholder="Create a notice" marginTop={4} /> : "NOT a member"}
                  </Box>
              </Draggable>
          )}
      </div>
    )
};