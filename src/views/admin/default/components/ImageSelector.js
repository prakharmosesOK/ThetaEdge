import React, { useState } from 'react';
import { Box, Button, Image, Textarea, HStack, Flex, Input, FormLabel } from '@chakra-ui/react';

const ImageSelector = (props) => {
    const { images, name, setImages, setName } = props;
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);

    const handleGenerateImages = async () => {
        // const generatedImages = await generateImages(description);
        // setImages[selectedImage](generatedImages);
        // setSelectedImage(null);
    };

    const handleImageSelect = (index) => {
        setSelectedImage(index);
    };

    return (
        <Flex
            spacing={4}
            position="absolute"
            top="-8vh"
            left="5vw"
            zIndex={110}
            flexDirection="column"
            w="64vw"
            h="85vh"
            bg="black"
            p={4}
            alignItems="center"
            rounded="2em"
            justifyContent="space-evenly"
        >
            <Flex>
                <FormLabel>Enter new name</FormLabel>
                <Input
                    placeholder="Enter nwe name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    size="md"
                    w="20em"
                    h="2em"
                    rounded="1em"
                    color="white"
                />
            </Flex>
            <HStack spacing={4} border="3px solid greeen">
                {images.map((img, index) => (
                    <Box
                        key={index}
                        onClick={() => handleImageSelect(index)}
                        cursor="pointer"
                        flex={selectedImage === index ? 2 : 1}
                        transition="flex 0.3s"
                    >
                        <Image
                            src={img}
                            alt={`Generated ${index}`}
                            objectFit="cover"
                            w="100%"
                            h={selectedImage === index ? '300px' : '150px'}
                        />
                    </Box>
                ))}
            </HStack>
            <Textarea
                placeholder="Describe something..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="sm"
            />
            <Button
                onClick={handleGenerateImages}
                colorScheme="yellow"
                size="sm"
                w="14em"
            >Generate Images</Button>
        </Flex>
    );
};

export default ImageSelector;