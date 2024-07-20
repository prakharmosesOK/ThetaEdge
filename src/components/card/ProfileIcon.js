import React, { useState } from 'react';
import { Box, Flex, Image, Text, Stack, Heading, IconButton, Input, Button, Icon, FormControl, FormLabel } from '@chakra-ui/react';
import { MdCancel, MdSave } from 'react-icons/md';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';

export default function ProfileIcon({ name, address, profileImage, frameImage }) {
    const [isEditing, setIsEditing] = useState(false);
    const [actualName, setActualName] = useState(name);
    const [actualProfileImage, setActualProfileImage] = useState(profileImage);
    const [actualFrameImage, setActualFrameImage] = useState(frameImage);
    const [newName, setNewName] = useState(name);
    const [newProfileImage, setNewProfileImage] = useState(profileImage);
    const [newFrameImage, setNewFrameImage] = useState(frameImage);

    const handleEdit = () => setIsEditing(true);
    const handleSave = () => {
        setActualName(newName);
        setActualProfileImage(newProfileImage);
        setActualFrameImage(newFrameImage);
        setIsEditing(false);
    };
    const handleCancel = () => {
        setNewName(actualName);
        setNewProfileImage(actualProfileImage);
        setNewFrameImage(actualFrameImage);
        setIsEditing(false);
    };

    return (
        <Box
            w="full"
            maxW="19em"
            h="24em"
            bg="transparent"
            mr="2em"
            ml="0.2em"
            mb="1em"
        >
            <Box
                bg="white"
                shadow="md"
                rounded="lg"
                overflow="hidden"
                position="relative"
                h="full"
                _hover={{ shadow: 'xl' }}
            >
                <Box position="relative">
                    <Box
                        position="absolute"
                        inset="0"
                        border="4px solid white"
                        roundedTop="lg"
                    />
                    <Image
                        src={actualProfileImage}
                        alt={actualName}
                        w="full"
                        h="20em"
                        mt="1.8em"
                        ml="1.8em"
                        position="absolute"
                        zIndex="2"
                    />
                </Box>
                <Box p={4} textAlign="center" position="relative" bg="white">
                    <Flex
                        spacing="0.1em"
                        zIndex={5}
                        position="absolute"
                        w="10em"
                        right="1.8em"
                        top="19.8em"
                        alignItems="flex-end"
                    >
                        <Heading size="md" color="black">{actualName}</Heading>
                        <Box
                            position="absolute"
                            top={-2}
                            right="-0.5em"
                            transform="translateX(-50%)"
                            w={8}
                            h={1}
                            bg="blue.600"
                        />
                    </Flex>
                    <Text
                        color="black"
                        position="absolute"
                        left="17%"
                        top="21.5em"
                        zIndex={5}
                    >{address}</Text>
                    <Box
                        position="absolute"
                        top="20em"
                        right="0em"
                        width="full"
                        h="4em"
                        bg="white"
                        zIndex="3"
                        transform="skewY(-6deg)"
                        transformOrigin="bottom left"
                    />
                    <Box position="absolute" top="0.5em" right="1em" zIndex={10}>
                        {isEditing ? (
                            <>
                                <IconButton
                                    aria-label="Save"
                                    icon={<Icon w='32px' h='32px' as={MdSave} color="#02c456" />}
                                    onClick={handleSave}
                                    size="sm"
                                    mr="2"
                                />
                                <IconButton
                                    aria-label="Cancel"
                                    icon={<Icon w='32px' h='32px' as={MdCancel} color="red.600" />}
                                    onClick={handleCancel}
                                    size="sm"
                                />
                            </>
                        ) : (
                            <IconButton
                                aria-label="Edit"
                                icon={<Icon w='32px' h='32px' as={BiSolidMessageSquareEdit} color="black" />}
                                onClick={handleEdit}
                                size="sm"
                            />
                        )}
                    </Box>
                    {isEditing && (
                        <section className="bg-navy-blue text-white flex flex-col justify-between items-center absolute top-[2.5em] right-[3%] z-10 w-[94%] h-[21em] p-3 rounded-lg shadow-md bg-black">
                            <div className="mb-4">
                                <label className="text-lg font-semibold">Enter your new nickname:</label>
                                <input
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                    placeholder="Enter name"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="text-lg font-semibold">Enter your new profile image link:</label>
                                <input
                                    value={newProfileImage}
                                    onChange={(e) => setNewProfileImage(e.target.value)}
                                    className="w-full p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                    placeholder="Enter profile image URL"
                                />
                            </div>

                            <div>
                                <label className="text-lg font-semibold">Enter your new frame image link:</label>
                                <input
                                    value={newFrameImage}
                                    onChange={(e) => setNewFrameImage(e.target.value)}
                                    className="w-full p-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                                    placeholder="Enter frame image URL"
                                />
                            </div>
                        </section>
                    )}
                </Box>
            </Box>
        </Box >
    );
};
