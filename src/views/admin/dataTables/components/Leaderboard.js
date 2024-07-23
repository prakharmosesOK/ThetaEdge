import React from "react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Text,
    useColorModeValue,
    Image,
} from "@chakra-ui/react";

const Leaderboard = ({ gameParticipants }) => {
    const bg = useColorModeValue("gray.100", "gray.900");
    const textColor = useColorModeValue("gray.800", "white");

    return (
        <Box w="full" p={4} bg={bg} borderRadius="md" boxShadow="md">
            <Text fontSize="2xl" fontWeight="bold" mb={4} color={textColor}>
                Leaderboard
            </Text>
            <Table variant="simple">
                <TableCaption>Current standings of the game</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Position</Th>
                        <Th>Profile Image</Th>
                        <Th>Nick Name</Th>
                        <Th>Address</Th>
                        <Th>Score</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {gameParticipants.map((player, index) => (
                        <Tr key={player.playerAddress}>
                            <Td>{index + 1}</Td>
                            <Td>
                                <Image
                                    src={player.profileImage}
                                    alt="Image"
                                    w="3em"
                                    h="3em"
                                />
                                <Image
                                    src={player.frameImage}
                                    alt="Frame"
                                    position="absolute"
                                    top={`${5*index + 17}em`}
                                    left="15.1em"
                                    w="4.6em"
                                    h="4.6em"
                                    zIndex={30}
                                />
                            </Td>
                            <Td>{player.playerNickName}</Td>
                            <Td>{player.playerAddress}</Td>
                            <Td>{player.playerScore}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default Leaderboard;