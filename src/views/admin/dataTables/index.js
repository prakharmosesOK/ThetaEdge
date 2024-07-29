import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import GameDetails from "./components/GameDetails";
import Leaderboard from './components/Leaderboard';

import { GameListContext } from "contexts/GameListContext";

// Importing frames and images
import bgImage from 'assets/img/bgImage.jpg';

import Organiser from "../../../contracts/Organiser.json";

const { ethers } = require("ethers");
const contractABI = Organiser.abi;
const contractAddress = '0x2d4779C47d83dBfE6CA41233A077018c3F4890cb';

export default function GamePage() {
  const { eventId } = useParams();
  const { account } = useContext(GameListContext);
  const [selectedTab, setSelectedTab] = useState("details");
  const [game, setgame] = useState({
    gameId: -1,
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
    streamDetails: {
      stream_id: "",
      stream_key: "",
      stream_server: ""
    }
  });
  const [timeToDisplay, setTimeToDisplay] = useState([0, new Date().getSeconds()]);
  const [gameParticipants, setGameParticipants] = useState([
    {
      playerNickName: "Aman",
      playerAddress: "0x054654616df1gdf5hgh1",
      playerScore: 78,
      profileImage: 'https://bootdey.com/img/Content/avatar/avatar6.png',
      frameImage: 1,
      streamLink: "/fjfohjdf;o"
    }, {
      playerNickName: "Mohit",
      playerAddress: '0x66546513df1gdfgdf0df',
      playerScore: 67,
      profileImage: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      frameImage: 2,
      streamLink: "/kdrtjorsj"
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

  useEffect(() => {
    const getGameData = async () => {
      console.log("sad", eventId);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const _contract = new ethers.Contract(contractAddress, contractABI, provider);
      try {
        const gamed = await _contract.getGameById(eventId);
        let hasPlay = false;
        let hasStream = false;

        if (gamed.playersJoined) {
          const LeaderBoardArray = [];
          for (const player of gamed.playersJoined) {
            const Playerdata = await _contract.GetProfileIpfs(player.playerAddress);
            const playerProfileData = await getDataFromIpfs(Playerdata);
            const leaderboardData = {
              playerNickName: playerProfileData.nickName,
              playerAddress: player.playerAddress,
              playerScore: player.leaderboardScore.toNumber(),
              profileImage: playerProfileData.profileImage,
              frameImage: playerProfileData.frameImage ? playerProfileData.frameImage : 0,
              streamLink: player.streamLink ? player.streamLink : "/",
            }
            if (String(account).toLowerCase() === String(player.playerAddress).toLowerCase()) {
              hasPlay = player.bHasPlayTicket;
              hasStream = player.bHasStreamTicket;
            }
            LeaderBoardArray.push(leaderboardData);
          }
          LeaderBoardArray.sort((a, b) => b.playerScore - a.playerScore);
          setGameParticipants(LeaderBoardArray);
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
          hasPlay: hasPlay,
          hasStream: hasStream,
          gameLink: res.gameLink,
          streamDetails: {
            stream_id: "",
            stream_server: "",
            stream_key: ""
          },
        }
        setgame(gameData);
        console.log("Inside fetching the Game: ", gameData);
        // setTimeToDisplay((new Date(res.date).getTime() - parseInt(res.noOfHour) * 3600 * 1000) / 1000);
      }
      catch (error) {
        console.log(error);
      }

    }
    getGameData();
  }, []);

  useEffect(() => {
    const updateDisplayTime = () => {
      const now = new Date();
      const eventTime = game.date;
      const lobbyEndTime = new Date(eventTime.getTime() + game.lobbyTimeInMin * 60 * 1000);
      const eventEndTime = new Date(eventTime.getTime() + game.noOfHour * 3600 * 1000);

      if (now < eventTime) {
        setTimeToDisplay([0, Math.round((eventTime - now) / 1000)]);
      } else if (game.bIsMultiplayer && now < lobbyEndTime) {
        setTimeToDisplay([1, Math.round((lobbyEndTime - now) / 1000)]);
      } else if (now < eventEndTime) {
        setTimeToDisplay([2, Math.round((eventEndTime - now) / 1000)]);
      } else {
        setTimeToDisplay([3, "Event has ended!"]);
      }
    }

    const intervalId = setInterval(updateDisplayTime, 1000);
    updateDisplayTime();

    return () => clearInterval(intervalId);
  }, [game]);

  function secondsToHMS(secs) {
    function z(n) { return (n < 10 ? '0' : '') + n; }
    var sign = secs < 0 ? '-' : '';
    secs = Math.abs(secs);
    return sign + z(secs / 3600 | 0) + ':' + z((secs % 3600) / 60 | 0) + ':' + Math.round(z(secs % 60));
  }

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
          w={selectedTab === 'leaderboard' ? "80%" : "20%"}
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
      <Text
        fontSize="1em"
        color="yellow"
        float="right"
        position="relative"
        top="2em"
        right="1em"
        fontWeight="bold"
      >{timeToDisplay[0] === 0 ? `Starts in ${secondsToHMS(timeToDisplay[1])}` : (timeToDisplay[0] === 1 ? `Lobby time ends in ${secondsToHMS(timeToDisplay[1])}` : (timeToDisplay[0] === 2 ? `Event ends in ${secondsToHMS(timeToDisplay[1])}` : 'The event has been ended!'))}</Text>
      {selectedTab === "details" ? <GameDetails game={game} setGame={setgame} timeToDisplay={timeToDisplay} setGameParticipants={setGameParticipants} /> : <Leaderboard gameParticipants={gameParticipants} startTime={game.date} hoursActive={game.noOfHour} hasStream={game.hasStream} setGameParticipants={setGameParticipants} eventId={game.gameId} />}
    </Box>
  );
};