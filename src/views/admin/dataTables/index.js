import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import GameDetails from "./components/GameDetails";
import GameStream from "./components/GameStream";

const game = {
  gameId: 1,
  gameName: "Game 1",
  gameImage: "https://via.placeholder.com/150",
  gameStreamLink: "https://dfhfjfhdfgdgd",
  gamePrice: 200,
  gameAuthor: "0x0",
  nickName: "gjdos",
  totalParticipants: 52,
  maxParticipants: 100,
  totalPrizeMoney: 500,
  bIsInvite: false,
  privateCode: "lghdyhdfirtvrd",
  bIsMultiplayer: false,
  lobbyCode: "0",
  couponCode: "887195",
  organiserAddress: "0x0",
  date: new Date(),
};

export default function GamePage() {
  const [selectedTab, setSelectedTab] = useState("details");

  return (
    <Box p={5} mt="4em">
      <Flex
        flexDirection="row"
        w="60vw"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
        gap="2%"
      >
        <Button
          w={selectedTab === 'details' ? "80%" : "20%"}
          onClick={() => setSelectedTab("details")}
          colorScheme="yellow"
          variant={selectedTab === "details" ? "solid" : "outline"}
          _hover={{
            bg: "yellow.500",
            color: "white",
          }}
          _focus={{
            ring: 4,
            outline: "none",
            ringColor: "yellow.300",
          }}
          fontWeight="medium"
          fontSize="sm"
          rounded="lg"
          px={5}
          py={2.5}
          me={2}
          mb={2}
        >
          Game Details
        </Button>
        <Button
          w={selectedTab === 'stream' ? "80%" : "20%"}
          onClick={() => setSelectedTab("stream")}
          colorScheme="purple"
          variant={selectedTab === "stream" ? "solid" : "outline"}
          _hover={{
            bg: "purple.800",
            color: "white",
          }}
          _focus={{
            ring: 4,
            outline: "none",
            ringColor: "purple.300",
          }}
          fontWeight="medium"
          fontSize="sm"
          rounded="lg"
          px={5}
          py={2.5}
          me={2}
          mb={2}
        >
          Game Streaming
        </Button>
      </Flex>
      {selectedTab === "details" ? <GameDetails game={game} /> : <GameStream game={game} />}
    </Box>
  );
};