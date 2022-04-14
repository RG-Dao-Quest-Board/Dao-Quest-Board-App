import { Box, Textarea } from "@chakra-ui/react";
import Draggable from 'react-draggable';
import { useUser } from "../contexts/UserContext";
import { userHubDaosType } from "../types/userDao";

export const DaoBoard = (props: { dao: any, notices: any }) => {
    const { userHubDaos } = useUser();
    const userDaoMembershipNames = userHubDaos.reduce((daos: string[], network: userHubDaosType) => {
        if (network.data.length) {
            network.data.forEach(net => daos.push(net.meta.name));
        }
        return daos;
    }, []);

    const daoNotices = props.notices.reduce((notices: any, notice: any) => {
        if(notice.dao === props.dao) notices.push(notice);
        return notices;
    }, []);

    const currentDaoNotices = () => {
        const currentNotices = daoNotices.length ? daoNotices.map((notice: any) => {
            const startingPosition = {
                x: notice.position_x,
                y: notice.position_y
            };
            return (
              <Draggable defaultPosition={startingPosition}>
              <Box p={4} maxW='lg' borderWidth='2px' borderRadius="lg">
                  {userDaoMembershipNames.includes(props.dao) ? <Textarea value={notice.quest_text} placeholder="Create a notice" marginTop={4} /> : "NOT a member"}
              </Box>
          </Draggable>
        )}) : null;
        return currentNotices;
    }

    return (
      <div>
          {currentDaoNotices()}
          <Draggable>
              <Box p={4} maxW='lg' borderWidth='2px' borderRadius="lg">
                  {userDaoMembershipNames.includes(props.dao) ? <Textarea placeholder="Create a notice" marginTop={4} /> : "NOT a member"}
              </Box>
          </Draggable>
      </div>
    )
};