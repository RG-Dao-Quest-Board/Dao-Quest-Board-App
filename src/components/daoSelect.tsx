import {
    Box,
    Flex,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    HStack,
    Text,
    Link,
    Input
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useInjectedProvider } from "../contexts/InjectedProviderContext";
import { useUser } from '../contexts/UserContext';
import { userHubDaosType, sortedDaosType } from "../types/userDao"
declare var window: any;

export const DaoSelect = () => {
    const {
        address,
    } = useInjectedProvider();
    const { userHubDaos } = useUser();
    const [sortedDaos, setSortedDaos] = useState<sortedDaosType>();
    useEffect(() => {
        const networkDaos = userHubDaos.sort((a: userHubDaosType, b: userHubDaosType) => {
            return a.hubSortOrder - b.hubSortOrder;
        });
        const count = userHubDaos.reduce((sum: number, network: userHubDaosType) => {
            sum += network.data.length;
            return sum;
        }, 0);
        setSortedDaos({ networkDaos, count });
    }, [userHubDaos]);
    return (
        <Box>
            {sortedDaos?.count ? (
                <Flex justify='space-between' alignItems='center' mb={6}>
                    <Text size='xs'>
                        {`Member of ${sortedDaos?.count || 0} DAO`}
                        {sortedDaos!.count > 1 && 's'}
                    </Text>

                </Flex>
            ) : (
                <>
                    <Text>You aren't a member in any DAOs</Text>
                    <Flex justify='flex-start' alignItems='center' my={10}>
                        {/* <Icon boxSize={10} as={BsFillCircleFill} color='grey' mr={5} /> */}
                        <Text size='sm'>your DAOs will show here</Text>
                    </Flex>
                    {/* <Link as={RouterLink} to='/explore'>
                        Explore DAOs
                    </Link> */}
                </>
            )}
        </Box>
    );
};