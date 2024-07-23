import React, { useState, useEffect } from "react";
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

import Organiser from "../../../contracts/Organiser.json";

const { ethers } = require("ethers");
const contractABI = Organiser.abi;
const contractAddress = '0xAc4868F06f8e797e65c0ea3328B31A7238695869';

// const game = {
//   gameId: 1,
//   gameName: "Game 1",
//   gameImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdr2OZSEgsmXE14s9auzTchMIOPCMtVIoymQ&s",
//   gameStreamLink: "https://dfhfjfhdfgdgd",
//   gamePrice: 200,
//   gameAuthor: "0x0",
//   nickName: "gjdos",
//   totalParticipants: 52,
//   maxParticipants: 100,
//   totalPrizeMoney: 500,
//   bIsInvite: false,
//   privateCode: "lghdyhdfirtvrd",
//   bIsMultiplayer: false,
//   lobbyCode: "0",
//   couponCode: "887195",
//   organiserAddress: "0x0",
//   date: new Date(),
// };

export default function GamePage() {
  const { eventId } = useParams();
  const [selectedTab, setSelectedTab] = useState("details");
  const [game, setgame] = useState({
    gameId: 1,
    gameName: "Game 1",
    gameImage: "https://via.placeholder.com/150",
    gamePrice: 200,
    videoLink: "https://youtu.be/wjJU3lbiGTU?si=d6NC--IjqY6_xtev",
    gameDescription: "dfhfbd rtjhdkr kdrhvtir niurrvthd viur kv liuigoi livihrdli lvgrsmh mghls  vigs  mjgr mjgis mjgl",
    streamTicketPrice: 100,
    nickName: "gjdos",
    totalParticipants: 52,
    maxParticipants: 100,
    totalPrizeMoney: 500,
    bIsInvite: false,
    privateCode: "lghdyhdfirtvrd",
    bIsMultiplayer: false,
    organiserAddress: "0x0",
    date: new Date(),
    time: new Date().getTime(),
    noOfHour: 2,
    lobbyTimeInMin: 10,
  });
  const [gameParticipants, setGameParticipants] = useState([
    {
      playerNickName: "Aman",
      playerAddress: "0x054654616df1gdf5hgh1",
      playerScore: 78,
      profileImage: 'https://bootdey.com/img/Content/avatar/avatar6.png',
      frameImage: frame1,
      streamLink: "/"
    }, {
      playerNickName: "Mohit",
      playerAddress: '0x66546513df1gdfgdf0df',
      playerScore: 67,
      profileImage: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      frameImage: frame2,
    }
  ])

  async function getDataFromIpfs(requestId) {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "QN_71b6031049974cf5a5a8260011c03b60");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`https://api.quicknode.com/ipfs/rest/v1/s3/get-object/${requestId}`, requestOptions);
      const result = await response.json();
      return result; // Return the result
    } catch (error) {
      console.log(error);
      return null; // Return null in case of an error
    }
  }

  const GetLeaderBOard = async() => {
     
  }

  useEffect(() => {
    const getGameData = async () => {
      console.log("sad", eventId);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const _contract = new ethers.Contract(contractAddress, contractABI, provider);
      try {
        const gamed = await _contract.getGameById(eventId);

        if(gamed.playersJoined){
          console.log("valid");
          const LeaderBoardArray = [];
          for (const player of gamed.playersJoined) {
            const Playerdata = await _contract.GetProfileIpfs(player.playerAddress);
            const playerProfileData = await getDataFromIpfs(Playerdata);
            const leaderboardData = {
              playerNickName: playerProfileData.nickName,
              playerAddress: player.playerAddress,
              playerScore: player.leaderboardScore.toNumber(),
              profileImage: playerProfileData.profileImage,
              frameImage: playerProfileData.frameImage ? playerProfileData.frameImage : 0 ,
              streamLink: player.streamLink ? player.streamLink : "/",
            }
            LeaderBoardArray.push(leaderboardData);
            setGameParticipants(LeaderBoardArray);
          }
        }
        //console.log(gamed.playersJoined);
        //console.log(gamed);
        const res = await getDataFromIpfs(gamed.Ipfs);
        const profileIpfs = await _contract.GetProfileIpfs(gamed.organiserAddress);
        const res2 = await getDataFromIpfs(profileIpfs);
        const gameData = {
          gameId: eventId,
          gameName: res.gameName,
          gameImage: res.gameImage,
          gameDescription: res.description,
          gamePrice: gamed.gameTicketPrice.toNumber(),
          videoLink: res.videoLink,
          streamTicketPrice: gamed.streamTicketPrice.toNumber(),
          nickName: res2.nickName ? res2.nickName : "--",
          totalParticipants: gamed.playersJoined.length,
          maxParticipants: res.maxParticipants,
          totalPrizeMoney: gamed.totalRevenue.toNumber(),
          bIsInvite: res.bIsInvite,
          privateCode: res.privateCode,
          bIsMultiplayer: res.bIsMultiplayer,
          organiserAddress: gamed.organiserAddress,
          date: new Date(res.date),
          noOfHour: res.noOfHour,
          lobbyTimeInMin: res.lobbyTimeInMin,
        }
        setgame(gameData);
      }
      catch (error) {
        console.log(error);
      }
  
    }
    getGameData();
  }, []);


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