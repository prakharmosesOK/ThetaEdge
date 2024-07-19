// Chakra imports
import {
  // AvatarGroup,
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, { useState } from "react";

export default function NFT(props) {
  const { gameEvent } = props;
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  return (
    <Card p='20px' h="10em">
      <Flex direction="row" justify='center'>
        <Box mb="20px" position='absolute' left={{ base: "20px", md: "30px" }}>
          <Image
            src={gameEvent.gameImage}
            w="12em"
            h="8em"
            borderRadius='20px'
          />
        </Box>
        <Flex
          flexDirection='row'
          justify='space-between'
          h='100%'
          w={{ base: "100%", md: "60%" }}
          position="relative"
          right="-6em"
        >
          <Flex
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb='auto'>
            <Flex direction='column'>
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                mb='5px'
                fontWeight='bold'
                me='14px'>
                {gameEvent.gameName}
              </Text>
              <Text
                color='secondaryGray.600'
                fontSize={{
                  base: "sm",
                }}
                fontWeight='400'
                mb="10px"
                me='14px'>
                {gameEvent.nickName}
              </Text>
            </Flex>
            {/* <AvatarGroup
              max={3}
              color={textColorBid}
              size='sm'
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}
              fontSize='12px'>
              {players.map((avt, key) => (
                <Avatar key={key} src={avt} />
              ))}
            </AvatarGroup> */}
            <Text
              color='secondaryGray.600'
              fontSize={{
                base: "sm",
              }}
              fontWeight='400'
              mb="10px"
              me='14px'>
              Total Participants: {gameEvent.maxParticipants} / {gameEvent.totalParticipants} joined
            </Text>
            <Text
              color='secondaryGray.600'
              fontSize={{
                base: "sm",
              }}
              fontWeight='400'
              mb="10px"
              me='14px'>
              Prize Pool: ${gameEvent.totalPrizeMoney}
            </Text>
          </Flex>
          <Flex
            align='start'
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mt='25px'>
            <Text fontWeight='700' fontSize='sm' color={textColorBid}>
              NFT Game Price: {gameEvent.gameTicketPrice} <br /> NFT Stream Price: {gameEvent.streamTicketPrice}
            </Text>
            <Link
              href={`/admin/data-tables/${gameEvent.gameId}`}
              mt={{
                base: "0px",
                md: "10px",
                lg: "0px",
                xl: "10px",
                "2xl": "0px",
              }}>
              <Button
                variant='darkBrand'
                color='white'
                fontSize='sm'
                fontWeight='500'
                borderRadius='70px'
                px='24px'
                py='5px'>
                Discover
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
