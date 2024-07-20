import React, { useState } from 'react';
import { Box, Flex, Image, Text, Stack, Heading, IconButton, Input, Button } from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

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
                    <Stack
                        spacing="0.1em"
                        zIndex={5}
                        position="absolute"
                        w="10em"
                        left="48%"
                        top="19.8em"
                    >
                        {isEditing ? (
                            <Input
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                size="sm"
                                placeholder="Enter name"
                            />
                        ) : (
                            <Heading size="md" color="black">{actualName}</Heading>
                        )}
                        <Box
                            position="absolute"
                            top={-2}
                            left="66%"
                            transform="translateX(-50%)"
                            w={8}
                            h={1}
                            bg="blue.600"
                        />
                    </Stack>
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
                    <Box position="absolute" top="20em" right="1em" border="3px solid red" zIndex={10}>
                        {isEditing ? (
                            <>
                                <IconButton
                                    aria-label="Save"
                                    icon={<CheckIcon />}
                                    onClick={handleSave}
                                    size="sm"
                                    mr="2"
                                />
                                <IconButton
                                    aria-label="Cancel"
                                    icon={<CloseIcon />}
                                    onClick={handleCancel}
                                    size="sm"
                                />
                            </>
                        ) : (
                            <IconButton
                                aria-label="Edit"
                                icon={<EditIcon />}
                                onClick={handleEdit}
                                size="sm"
                            />
                        )}
                    </Box>
                    {isEditing && (
                        <>
                            <Input
                                value={newProfileImage}
                                onChange={(e) => setNewProfileImage(e.target.value)}
                                size="sm"
                                placeholder="Enter profile image URL"
                                position="absolute"
                                bottom="1em"
                                left="1em"
                                right="1em"
                                zIndex={6}
                            />
                            <Input
                                value={newFrameImage}
                                onChange={(e) => setNewFrameImage(e.target.value)}
                                size="sm"
                                placeholder="Enter frame image URL"
                                position="absolute"
                                bottom="1em"
                                left="1em"
                                right="1em"
                                zIndex={6}
                            />
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
