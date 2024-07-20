import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Select, Checkbox, Button } from '@chakra-ui/react';
// import DateTimePicker from 'react-datetime-picker';
import DateTimePicker from './components/DateTimePicker';

// import Organiser from "../../../contracts/Organiser.json";

// const { ethers } = require("ethers");
// const contractABI = Organiser.abi;
// const contractAddress = '0xb27A31f1b0AF2946B7F582768f03239b1eC07c2c';

export default function UserReports() {
  // Chakra Color Mode
  // const brandColor = useColorModeValue("brand.500", "white");
  // const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  // const brandColor = useColorModeValue("brand.500", "white");
  // const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [gameName, setGameName] = useState("");
  const [gameLink, setGameLink] = useState("");
  const [gameImage, setGameImage] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameVideoLink, setGameVideoLink] = useState("");
  const [playTicketPrice, setPlayTicketPrice] = useState("");
  const [streamTicketPrice, setStreamTicketPrice] = useState("");
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [isInvite, setIsInvite] = useState("OpenToAll");
  const [privateCode, setPrivateCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [PrizeFromOwner, setPrizeFromOwner] = useState("");
  const [startingTime, setStartingTime] = useState(new Date());
  const [noOfHour, setNoOfHour] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('12:00 AM');


  const handleGameNameChange = (e) => setGameName(e.target.value);
  const handleGameLinkChange = (e) => setGameLink(e.target.value);
  const handleGameImageChange = (e) => setGameImage(e.target.value);
  const handleGameDescriptionChange = (e) => setGameDescription(e.target.value);
  const handleGameVideoLinkChange = (e) => setGameVideoLink(e.target.value);
  const handlePlayTicketPriceChange = (e) => setPlayTicketPrice(e.target.value);
  const handleStreamTicketPriceChange = (e) => setStreamTicketPrice(e.target.value);
  const handleIsMultiplayerChange = (e) => setIsMultiplayer(e.target.checked);
  const handleIsInviteChange = (e) => setIsInvite(e.target.value);
  const handlePrivateCodeChange = (e) => setPrivateCode(e.target.value);
  const handleCouponCodeChange = (e) => setCouponCode(e.target.value);
  const handleMaxParticipantsChange = (e) => setMaxParticipants(e.target.value);
  const handlePrizeFromOwnerChange = (e) => setPrizeFromOwner(e.target.value);
  const handleStartingTimeChange = (date) => setStartingTime(date);
  const handleNoOfHourChange = (e) => setNoOfHour(e.target.value);

  return (
    <main>
      <FormControl>
        <FormLabel>Game Name</FormLabel>
        <Input type="text" value={gameName} onChange={handleGameNameChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Game Link</FormLabel>
        <Input type="text" value={gameLink} onChange={handleGameLinkChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Game Image</FormLabel>
        <Input type="text" value={gameImage} onChange={handleGameImageChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Game Description</FormLabel>
        <Input type="text" value={gameDescription} onChange={handleGameDescriptionChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Game Video Link</FormLabel>
        <Input type="text" value={gameVideoLink} onChange={handleGameVideoLinkChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Play Ticket Price</FormLabel>
        <Input type="text" value={playTicketPrice} onChange={handlePlayTicketPriceChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Stream Ticket Price</FormLabel>
        <Input type="text" value={streamTicketPrice} onChange={handleStreamTicketPriceChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Is Multiplayer</FormLabel>
        <Checkbox isChecked={isMultiplayer} onChange={handleIsMultiplayerChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Is Invite</FormLabel>
        <Select value={isInvite} onChange={handleIsInviteChange}>
          <option value="OpenToAll">Open To All</option>
          <option value="InviteOnly">Invite Only</option>
        </Select>
      </FormControl>

      {isInvite === "InviteOnly" && (
        <FormControl>
          <FormLabel>Private Code</FormLabel>
          <Input type="text" value={privateCode} onChange={handlePrivateCodeChange} />
        </FormControl>
      )}

      <FormControl>
        <FormLabel>Coupon Code</FormLabel>
        <Input type="text" value={couponCode} onChange={handleCouponCodeChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Max Participants</FormLabel>
        <Input type="text" value={maxParticipants} onChange={handleMaxParticipantsChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Prize From Owner</FormLabel>
        <Input type="text" value={PrizeFromOwner} onChange={handlePrizeFromOwnerChange} />
      </FormControl>

      {/* <FormControl>
        <FormLabel>Starting Time</FormLabel>
        <DateTimePicker
          onChange={handleStartingTimeChange}
          value={startingTime}
          format="y-MM-dd h:mm a"
          calendarIcon={null}
          clearIcon={null}
        />
      </FormControl> */}

      <FormControl>
        <FormLabel>Number of Hours</FormLabel>
        <Input type="text" value={noOfHour} onChange={handleNoOfHourChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Select the Date and Time of event start</FormLabel>
        <DateTimePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </FormControl>

      <Button mt={4} colorScheme="teal" type="submit">
        Submit
      </Button>
    </main>
  );
};