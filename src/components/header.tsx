import {
    Box,
    Flex,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useInjectedProvider } from "../contexts/InjectedProviderContext";

declare var window: any;

export const Header = () => {
    const {
        address,
        requestWallet,
        disconnectDapp,
    } = useInjectedProvider();
    const handleDisconnect = () => {
        disconnectDapp();
    };

    const handleConnect = () => {
        requestWallet();
    };
    return (
        <Box bg={"blue.500"}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                <HStack spacing={8} alignItems={"center"}>
                    <Box pl={"10px"} color={"whiteAlpha.900"}>
                        Logo
                    </Box>
                </HStack>
                <Flex alignItems={"center"} pr={"10px"}>
                    {!address ? (
                        <Button onClick={handleConnect}>Connect Wallet</Button>
                    ) : (
                        <Menu>
                            <MenuButton as={Button} color="blackAlpha.900">
                                Connected: {address.substring(2, 6)} ...
                                {address.substring(37, 41)}
                                <ChevronDownIcon boxSize={"25px"} pl="5px" />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};