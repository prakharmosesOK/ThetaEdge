import React, { useState, useEffect } from "react";
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
    Button,
} from "@chakra-ui/react";

const Leaderboard = ({ gameParticipants }) => {
    const [streamUrl, setStreamUrl] = useState('/');
    const bg = useColorModeValue("gray.100", "gray.900");
    const textColor = useColorModeValue("gray.800", "white");

    useEffect(() => {

    }, [streamUrl]);

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
                        <Th>Stream</Th>
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
                                    top={`${5 * index + 17}em`}
                                    left="14vw"
                                    w="4.6em"
                                    h="4.6em"
                                    zIndex={30}
                                />
                            </Td>
                            <Td>{player.playerNickName}</Td>
                            <Td>{player.playerAddress}</Td>
                            <Td>{player.playerScore}</Td>
                            <Td><Button color="yellow" onClick={() => setStreamUrl(player.streamLink)}>Go to stream</Button></Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {streamUrl !== '/' && (
                <div id="default-modal" tabIndex="-1" aria-hidden="true" className="absolute top-[0em] left-[5em] z-[500] flex w-[60em] h-[40em]">
                    {/* <div className="relative p-4 w-full max-w-2xl max-h-full"> */}
                        <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Live Stream
                                </h3>
                                <button onClick={() => setStreamUrl('/')} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <hr/>
                            <div className="p-4 md:p-5 space-y-4">
                                <iframe
                                    src={streamUrl}
                                    frameborder="0"
                                    className="w-[60em] h-[32em]"
                                ></iframe>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            )}
        </Box>
    );
};

export default Leaderboard;