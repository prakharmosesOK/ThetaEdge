import React from "react";
import {
  Box,
  Button,
  VStack,
} from "@chakra-ui/react";

const GameStream = ({ game }) => {
  return (
    <Box p={5}>
      <iframe
        src={game.gameStreamLink}
        title={game.gameName}
        width="100%"
        height="500px"
        style={{ border: 0 }}
        allowFullScreen
      ></iframe>
      <Button mt={5} colorScheme="green">Make Payment</Button>
    </Box>
  );
};

export default GameStream;