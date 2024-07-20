import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Select, Checkbox, Button } from '@chakra-ui/react';
// import DateTimePicker from 'react-datetime-picker';
import DateTimePicker from './components/DateTimePicker';

import Organiser from "../../../contracts/Organiser.json";

const { ethers } = require("ethers");
const contractABI = Organiser.abi;
const contractAddress = '0xfdEE63eB6431E502809E6c5eC31A4994686Cfa63';

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
  const [maxParticipants, setMaxParticipants] = useState("");
  const [PrizeFromOwner, setPrizeFromOwner] = useState("");
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
  const handleMaxParticipantsChange = (e) => setMaxParticipants(e.target.value);
  const handlePrizeFromOwnerChange = (e) => setPrizeFromOwner(e.target.value);
  const handleNoOfHourChange = (e) => setNoOfHour(e.target.value);

  async function uploadToIPFS(jsonObject) {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "QN_71b6031049974cf5a5a8260011c03b60");

    const blob = new Blob([JSON.stringify(jsonObject)], { type: "application/json" });

    var formdata = new FormData();
    const fileName = `${gameName}.json`;
    formdata.append("Body", blob, fileName); // Set your desired file name here
    formdata.append("Key", fileName); // The name under which the file will be stored
    formdata.append("ContentType", "application/json"); // Set content type to application/json

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    try {
      const response = await fetch("https://api.quicknode.com/ipfs/rest/v1/s3/put-object", requestOptions);
      const result = await response.json(); // Parse the response as JSON
      console.log(result.requestid);
      return result.requestid; // Return the IPFS CID
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function uploadGameTOContract(_ipfs) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const _contract = new ethers.Contract(contractAddress, contractABI, signer);
    try {
      const txResponse = await _contract.UploadGames(_ipfs, playTicketPrice, streamTicketPrice, PrizeFromOwner, { value: PrizeFromOwner });
      await txResponse.wait();
      console.log('Transaction successful:');
    } catch (error) {
      console.error('Transaction error:', error);
    }
  }

  const handleSubmit = async () => {
    
    const jsonObject = {
      "gameName": gameName,
      "gameLink": gameLink,
      "gameImage": gameImage,
      "description": gameDescription,
      "videoLink": gameVideoLink,
      "bIsMultiplayer" : isMultiplayer,
      "bIsInvite" : isInvite === "InviteOnly",
      "privateCode" : privateCode,
      "maxParticipants": maxParticipants,
      "date" : selectedDate,
      "time" : selectedTime,
      "noOfHour" : noOfHour,
    };
    console.log(jsonObject);
    //return;

    uploadToIPFS(jsonObject).then(ipfs => {
      if (ipfs) {
        console.log(`IPFS CID: ${ipfs}`);
        uploadGameTOContract(ipfs);
      } else {
        console.log("Failed to upload to IPFS");
      }
    });
  };

  return (
    <main className='mt-[6em]'>
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

      <Button mt={4} colorScheme="teal" type="submit" onClick={handleSubmit}> 
        Submit
      </Button>
    </main>
  );
};