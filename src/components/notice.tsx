import { Box, FormControl, FormLabel, Select, Text, Textarea } from "@chakra-ui/react";
import Draggable from 'react-draggable';
import { useUser } from "../contexts/UserContext";
import { userHubDaosType } from "../types/userDao";

export const Notice = () => {
    const { userHubDaos } = useUser();
    const userDaoMembershipNames = userHubDaos.reduce((daos: string[], network: userHubDaosType) => {
      if(network.data.length) {
        network.data.forEach(net => daos.push(net.meta.name));
      }
      return daos;
    }, []);
    return (
        <Draggable>
            <Box p={4} maxW='lg' borderWidth='2px' borderRadius="lg">
              <FormControl>
                <FormLabel htmlFor="dao-select">Which DAO are you posting for?</FormLabel>
                <Select id="dao-select" placeholder="Select DAO" isRequired >
                  {userDaoMembershipNames.map((dao: string) => (
                    <option value={dao} key={dao}>{dao}</option>
                  ))}
                </Select>
              </FormControl>
                <Textarea placeholder="Create a notice" marginTop={4}/>
            </Box>
        </Draggable>
    );
};