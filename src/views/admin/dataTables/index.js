import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import GameDetails from "./components/GameDetails";
import GameStream from "./components/GameStream";
import Leaderboard from './components/Leaderboard';

// Importing frames and images
import frame1 from 'assets/img/dashboards/frame1.png';
import frame2 from 'assets/img/dashboards/frame2.png';
import bgImage from 'assets/img/bgImage.jpg';

const game = {
  gameId: 1,
  gameName: "Game 1",
  gameImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdr2OZSEgsmXE14s9auzTchMIOPCMtVIoymQ&s",
  gamePrice: 200,
  videoLink: "https://youtu.be/wjJU3lbiGTU?si=d6NC--IjqY6_xtev",
  gameDescription: "dfhfbd rtjhdkr kdrhvtir niurrvthd viur kv liuigoi livihrdli lvgrsmh mghls  vigs  mjgr mjgis mjgl",
  streamTicketPrice: 100,
  nickName: "gjdos",
  totalParticipants: 52,
  maxParticipants: 100,
  totalPrizeMoney: 500,
  bIsInvite: true,
  privateCode: "lghdyhdfirtvrd",
  bIsMultiplayer: true,
  organiserAddress: "0x0",
  date: new Date(),
  time: new Date().getTime(),
  noOfHour: 2,
  lobbyTimeInMin: 10,
}

export default function GamePage() {
  const [selectedTab, setSelectedTab] = useState("details");
  const [gameParticipants, setGameParticipants] = useState([
    {
      playerNickName: "Aman",
      playerAddress: "0x054654616df1gdf5hgh1",
      playerScore: 78,
      profileImage: 'https://bootdey.com/img/Content/avatar/avatar6.png',
      frameImage: frame1,
    }, {
      playerNickName: "Mohit",
      playerAddress: '0x66546513df1gdfgdf0df',
      playerScore: 67,
      profileImage: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      frameImage: frame2,
    }
  ])

  return (
    <Box
      p={5}
      mt="4em"
      bgImage={bgImage}
      bgSize='fit'
      w="full"
      h="full"
    >
      <Flex
        flexDirection="row"
        w="60vw"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
        gap="2%"
      >
        <Button
          w={selectedTab === 'details' ? "60%" : "20%"}
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
          w={selectedTab === 'stream' ? "60%" : "20%"}
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
        <Button
          w={selectedTab === 'leaderboard' ? "60%" : "20%"}
          onClick={() => setSelectedTab("leaderboard")}
          colorScheme="green"
          variant={selectedTab === "leaderboard" ? "solid" : "outline"}
          _hover={{
            bg: "green.800",
            color: "white",
          }}
          _focus={{
            ring: 4,
            outline: "none",
            ringColor: "green.300",
          }}
          fontWeight="medium"
          fontSize="sm"
          rounded="lg"
          px={5}
          py={2.5}
          me={2}
          mb={2}
        >
          Leaderboard
        </Button>
      </Flex>
      {selectedTab === "details" ? <GameDetails game={game} /> : (selectedTab === 'stream' ? <GameStream game={game} /> : <Leaderboard gameParticipants={gameParticipants} />)}
    </Box>
  );
};