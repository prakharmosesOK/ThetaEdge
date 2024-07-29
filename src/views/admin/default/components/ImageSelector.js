import React, { useEffect, useState } from 'react';
import { Box, Button, Image, Textarea, HStack, Flex, Input, FormLabel } from '@chakra-ui/react';

const ImageSelector = (props) => {
    const { profileImage, frameImage, name, setProfileImage, setFrameImage, setName, framesArray, frameAllowed } = props;
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);
    const [newImage, setNewImage] = useState(null);

    async function getAuthToken() {
        if (!window.ethereum) {
            throw 'wallet not installed';
        }

        const timestamp = Date.now().toString();
        const msg = 'Theta EdgeStore Call ' + timestamp;

        const sig = await window.ethereum.request({
            method: 'personal_sign',
            params: [msg, Myaddress],
        });

        return `${timestamp}.${Myaddress}.${sig}`;
    }

    const handleNewImageUpload = async (e) => {
        setNewImageUpload(e.target.value);
    }

    const handleGenerateImages = async () => {
        // const generatedImages = await generateImages(description);
        // setProfileImage(generatedImages);
        // setSelectedImage(null);
    };

    const handleImageSelect = (index) => {
        setSelectedImage(index);
    };

    useEffect(() => {
        const uploadFile = async () => {
            if (!selectedFile) return;

            const authToken = await getAuthToken();

            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await axios.post('https://api.thetaedgestore.com/api/v2/data', formData, {
                    headers: {
                        'x-theta-edgestore-auth': authToken,
                    },
                });

                const fileKey = response.data.key;
                const fileUrl = `https://data.thetaedgestore.com/api/v2/data/${fileKey}`;


                return fileUrl;  // Return the complete URL
                alert('File uploaded successfully!');
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Failed to upload file.');
            }
        };
        uploadFile();
    }, [newImage])

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
                <FormLabel color="white">Enter new name</FormLabel>
                <Input
                    placeholder="Enter new name"
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
                <Box
                    onClick={() => handleImageSelect(0)}
                    cursor="pointer"
                    flex={selectedImage === 0 ? 2 : 1}
                    transition="flex 0.3s"
                >
                    <Image
                        src={profileImage}
                        alt={`Generated`}
                        objectFit="cover"
                        w="100%"
                        h={selectedImage === 0 ? '300px' : '150px'}
                    />
                </Box>
                <Box
                    onClick={() => handleImageSelect(1)}
                    cursor="pointer"
                    flex={selectedImage === 1 ? 2 : 1}
                    transition="flex 0.3s"
                >
                    <Image
                        src={framesArray[frameImage]}
                        alt={`Generated`}
                        objectFit="cover"
                        w="100%"
                        h={selectedImage === 1 ? '300px' : '150px'}
                    />
                </Box>
            </HStack>
            {selectedImage === 0 ? (
                <>
                    <Textarea
                        placeholder="Describe something..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        size="sm"
                        color="white"
                    />
                    <Button
                        onClick={handleGenerateImages}
                        colorScheme="yellow"
                        size="sm"
                        w="14em"
                    >Generate Images</Button>
                    {/* <Input
                        placeholder='Or provide the profile image link here'
                        value={profileImage}
                        onChange={(e) => setProfileImage(e.target.value)}
                        color="white"
                    /> */}
                    <Input
                        type="file"
                        accept="image/*"
                        value={newImage}
                        onChange={handleNewImageUpload}
                    />
                </>
            ) : (
                <Flex
                    flexDirection="row"
                    overflow="scroll"
                >
                    {framesArray.map((frame, idx) => (
                        <>
                            <Image
                                src={frame}
                                key={idx}
                                alt={`Generated`}
                                objectFit="cover"
                                onClick={() => setFrameImage(idx)}
                                cursor="pointer"
                                pointerEvents={frameAllowed.includes(idx) ? 'auto' : 'none'}
                                bg={frameAllowed.includes(idx) ? 'transsparent' : 'gray-300'}
                                opacity={frameAllowed.includes(idx) ? '1' : '0.3'}
                            />
                        </>
                    ))}
                </Flex>
            )}
        </Flex>
    );
};

export default ImageSelector;