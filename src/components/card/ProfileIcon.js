import React, { useState } from 'react';
import { Box, Flex, Image, Text, Stack, Heading, IconButton, Input, Button, Icon, FormControl, FormLabel } from '@chakra-ui/react';
import { MdCancel, MdSave } from 'react-icons/md';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';

import ImageSelector from 'views/admin/default/components/ImageSelector';

export default function ProfileIcon({ name, address, profileImage, frameImage }) {
    const [isEditing, setIsEditing] = useState(false);
    const [actualName, setActualName] = useState(name);
    const [actualProfileImage, setActualProfileImage] = useState(profileImage);
    const [actualFrameImage, setActualFrameImage] = useState(frameImage);
    const [newName, setNewName] = useState(actualName);
    const [newProfileImage, setNewProfileImage] = useState(actualProfileImage);
    const [newFrameImage, setNewFrameImage] = useState(actualFrameImage);

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
            w="25em"
            h="26em"
            bg="transparent"
            mr="2em"
            ml="0.2em"
            mb="1em"
            mt="1em"
        >
            <Box
                bg="transparent"
                shadow="md"
                rounded="lg"
                position="absolute"
                h="50em"
                w="50em"
                _hover={{ shadow: 'xl' }}
            >
                <Image
                    src={actualProfileImage}
                    alt={actualName}
                    w="18em"
                    h="18em"
                    position="absolute"
                    top="1.8em"
                    left="1.8em"
                    zIndex="2"
                />
                <Image
                    src={actualFrameImage}
                    alt={actualName}
                    w='28.3em'
                    h='28.3em'
                    position='absolute'
                    top="-3.9em"
                    left="-3.35em"
                    zIndex='3'
                />
            </Box>
            <Box p={4} textAlign="center" position="relative" bg="transparent">
                <Flex
                    flexDirection="column"
                    zIndex={5}
                    position="absolute"
                    w="18em"
                    h="4em"
                    left="1.8em"
                    top="22em"
                    bg="#f2f218"
                    alignItems="center"
                    justifyContent="space-evenly"
                    p="0.3em"
                    rounded="full"
                >
                    <Box
                        w="3em"
                        h="0.1em"
                        bg="blue.600"
                    />
                    <Heading size="md" color="black">{actualName}</Heading>
                    <Text color="black">{address}</Text>
                </Flex>
                <Box position="absolute" top="0.5em" right="1em" zIndex={10}>
                    {isEditing === false &&
                        <IconButton
                            aria-label="Edit"
                            icon={<Icon w='32px' h='32px' as={BiSolidMessageSquareEdit} color="red" />}
                            onClick={handleEdit}
                            size="sm"
                        />
                    }
                </Box>
                <Box position="relative" top="-3.5em" left="49em" zIndex={130}>
                    {isEditing &&
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
                    }
                </Box>
                {isEditing &&
                    <ImageSelector
                        images={[newProfileImage, newFrameImage]}
                        setImages={[setNewProfileImage, setNewFrameImage]}
                        name={newName}
                        setName={setNewName}
                    />
                }
            </Box>
        </Box >
    );
};
