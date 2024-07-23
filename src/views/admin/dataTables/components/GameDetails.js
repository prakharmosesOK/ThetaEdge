import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  Heading,
  VStack,
  Input
} from "@chakra-ui/react";

const GameDetails = ({ game }) => {
  const [inviteCode, setInviteCode] = useState(null);
  const [lobbyCode, setLobbyCode] = useState(null);
  const [obsApi, setObsApi] = useState(null);
  const [timeToDisplay, setTimeToDisplay] = useState(new Date().getTime())

  const handlePaymentClicked = async () => {
    console.log("Payment clicked")
  }

  const handleStartGame = async () => {
    console.log("Game Started");
  }

  return (
    <Box p={5}>
      <Text>{timeToDisplay.toString()} remaining</Text>
      <Image
        src={game.gameImage}
        alt="Game image"
        w="67vw"
        mx="auto"
        mt="1em"
        rounded="3em"
        h="24em"
        sizes="fit"
      />
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <VStack>
          <Flex>
            <Text>{game.gameId}</Text>
            <Text>{game.gameName}</Text>
          </Flex>
          <Flex>
            <Flex>
              <Text>Game Organiser: {game.nickName}</Text>
              <Text>Organiser address: {game.organiserAddress}</Text>
              <Text>Total Prize Money: {game.totalPrizeMoney}</Text>
              <Text>Start Date: {game.date.toString().slice(0, 21)} IST</Text>
            </Flex>
            <Flex>
              <Text>Total Participants: {game.totalParticipants} / {game.maxParticipants}</Text>
              <Text>Multiplayer: {game.IsMultiplayer ? "Yes" : "No"}</Text>
              <Text>Invite: {game.bIsInvite ? "Yes" : "No"}</Text>
              <Text>Duration: {game.noOfHour}</Text>
            </Flex>
          </Flex>
          <div>
            <Heading>Game Description:</Heading>
            <Text>{game.gameDescription}</Text>
          </div>
          <Box>
            <iframe src={game.videoLink} frameborder="0"></iframe>
          </Box>
        </VStack>
      </Flex>
      <Flex>
        {game.bIsInvite === true && <Input
          placeholder="Enter the invite code to join"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          color="white"
        />}
        {<Button onClick={handlePaymentClicked}>Join Game</Button>}
        {game.IsMultiplayer && (
          <>
            <Input
              placeholder="Enter lobby code"
              value={lobbyCode}
              onChange={(e) => setLobbyCode(e.target.value)}
              color="white"
            />
            <Input
              placeholder="Enter OBS apis"
              value={obsApi}
              onChange={(e) => setObsApi(e.target.value)}
              color="white"
            />
            <Button onClick={handleStartGame}>Go to Game</Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default GameDetails;