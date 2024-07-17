/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

import { useState } from "react";
import {
  FormControl,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

export default function UserReports() {
  // Chakra Color Mode
  // const brandColor = useColorModeValue("brand.500", "white");
  // const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [gameName, setGameName] = useState("");
  const [gameLink, setGameLink] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameVideoLink, setGameVideoLink] = useState("");
  const [playTicketPrice, setPlayTicketPrice] = useState("");
  const [streamTicketPrice, setStreamTicketPrice] = useState("");
  const [isMultiplayer, setIsMultiplayer] = useState("");
  const [type, setType] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const handleGameNameChange = (event) => {
    setGameName(event.target.value);
  };

  const handleGameLinkChange = (event) => {
    setGameLink(event.target.value);
  };

  const handleGameDescriptionChange = (event) => {
    setGameDescription(event.target.value);
  };

  const handleGameVideoLinkChange = (event) => {
    setGameVideoLink(event.target.value);
  };

  const handlePlayTicketPriceChange = (event) => {
    setPlayTicketPrice(event.target.value);
  };

  const handleStreamTicketPriceChange = (event) => {
    setPlayTicketPrice(event.target.value);
  };

  const handleIsMultiplayerChange = (event) => {
    setIsMultiplayer(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  }

  const handleCouponCodeChange = (event) => {
    setCouponCode(event.target.value);
  }
  
  return (
    <main>
      <FormControl>
        <FormLabel>Game Name</FormLabel>
        <Input
          type="text"
          value={gameName}
          onChange={handleGameNameChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Game Link</FormLabel>
        <Input
          type="text"
          value={gameLink}
          onChange={handleGameLinkChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Game Description</FormLabel>
        <Input
          type="text"
          value={gameDescription}
          onChange={handleGameDescriptionChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Game Video Link</FormLabel>
        <Input
          type="text"
          value={gameVideoLink}
          onChange={handleGameVideoLinkChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Play Ticket Price</FormLabel>
        <Input
          type="text"
          value={playTicketPrice}
          onChange={handlePlayTicketPriceChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Stream Ticket Price</FormLabel>
        <Input
          type="text"
          value={streamTicketPrice}
          onChange={handleStreamTicketPriceChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Is Multiplayer?</FormLabel>
        <RadioGroup value={isMultiplayer} onChange={handleIsMultiplayerChange}>
          <Stack direction="row">
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Type</FormLabel>
        <RadioGroup value={type} onChange={handleTypeChange}>
          <Stack direction="row">
            <Radio value="yes">Open to all</Radio>
            <Radio value="no">Invites only</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Coupon Code</FormLabel>
        <Input
          type="text"
          value={couponCode}
          onChange={handleCouponCodeChange}
        />
      </FormControl>
    </main>
  );
}
