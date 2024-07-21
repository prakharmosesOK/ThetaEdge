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
      <HStack spacing={4} mb={5}>
        <Button onClick={() => setSelectedTab("details")} colorScheme={selectedTab === "details" ? "blue" : "gray"}>Game Details</Button>
        <Button onClick={() => setSelectedTab("stream")} colorScheme={selectedTab === "stream" ? "blue" : "gray"}>Game Stream</Button>
      </HStack>
      {selectedTab === "details" ? <GameDetails game={game} /> : <GameStream game={game} />}
    </Box>
  );
};