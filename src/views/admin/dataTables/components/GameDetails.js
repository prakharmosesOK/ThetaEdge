import React from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  VStack,
} from "@chakra-ui/react";

const GameDetails = ({ game }) => {
  return (
    <Box p={5}>
      <Image src={game.gameImage} alt={game.gameName} mb={5} />
      <Text fontSize="2xl" fontWeight="bold">{game.gameName}</Text>
      <Text fontSize="md" color="gray.500">{game.nickName}</Text>
      <Text mt={3}><strong>Author:</strong> {game.gameAuthor}</Text>
      <Text><strong>Total Participants:</strong> {game.totalParticipants}/{game.maxParticipants}</Text>
      <Text><strong>Total Prize Money:</strong> ${game.totalPrizeMoney}</Text>
      <Text><strong>Is Invite Only:</strong> {game.bIsInvite ? "Yes" : "No"}</Text>
      <Text><strong>Multiplayer:</strong> {game.bIsMultiplayer ? "Yes" : "No"}</Text>
      <Text><strong>Lobby Code:</strong> {game.lobbyCode}</Text>
      <Text><strong>Coupon Code:</strong> {game.couponCode}</Text>
      <Text><strong>Organiser Address:</strong> {game.organiserAddress}</Text>
      <Text><strong>Date:</strong> {game.date.toLocaleDateString()}</Text>
      <Flex mt={5}>
        <Button colorScheme="blue" mr={3}>Go to Game Page</Button>
        <Button colorScheme="green">Make Payment</Button>
      </Flex>
    </Box>
  );
};

export default GameDetails;