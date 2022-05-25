import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Text,
    Badge,
    Flex
} from '@chakra-ui/react'
import { useCallback } from 'react';
import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import { applyToQuest } from "../services/noticeService.js"
import { applicantType } from "../types/questType"
export const QuestModal = (props: { quest: any }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        address,
    } = useInjectedProvider();

    const handleApplyToQuest = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        applyToQuest(props.quest._id, { "applicants": { "address": address, "time": Date.now() } })
            .then((res) => { alert("Success") })
            .catch((error) => alert(error));
        ;
    }, [address, props.quest])

    return (
        <>
            <Button onClick={onOpen} mr={"5px"}>See details</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {props.quest.quest_text}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost' onClick={handleApplyToQuest}>Apply to this Task</Button>
                    </ModalFooter>
                    <ModalBody>
                        {props.quest.applicants.map((applicant: (applicantType)) => {
                            return <Flex p={2}>
                                <Text fontWeight={"bold"} pr={"10px"}> {applicant.address.substring(2, 6)} ...
                                    {address.substring(37, 41)}  </Text>
                                <Badge variant='solid' colorScheme='green' >
                                    APPLIED
                                </Badge>
                                <Text marginLeft={'auto'} color={"gray.500"} fontSize={'13px'}>
                                    {new Date(applicant.time).toLocaleString()}
                                </Text>
                            </Flex>
                        })}
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
};
