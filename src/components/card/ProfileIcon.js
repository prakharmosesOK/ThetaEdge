import React from 'react';
import { Box, Flex, Image, Text, Link, Stack, Heading, IconButton } from '@chakra-ui/react';

export default function ProfileIcon({ name, address, image }) {
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
                        src={image}
                        alt={name}
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
                        <Heading size="md" color="black">{name}</Heading>
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
                </Box>
            </Box>
        </Box>
    );
};