/*!                                                                                                                                                                                                                                                                                                                                       
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
import ETH from "assets/img/dashboards/ETH.png";
import THETA from "assets/img/dashboards/THETA.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import ProfileIcon from "components/card/ProfileIcon";
import React, { useState, useEffect } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdMilitaryTech,
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

export default function UserReports() {
  const [profileData, setProfileData] = useState({
    address: "0x0fturtydtuftyur0tseeydrtydr",
    nickName: "John Doe",
    progileImage: "https://bootdey.com/img/Content/avatar/avatar1.png",
    frameImage: "fghgdbgymtyftydtsrtdrts",
    gamesParticipating: [
      { gameId: 1, isCollected: false },
      { gameId: 2, isCollected: true }
    ],
    gamesUpload: [{ gameId: 3, isCollected: true },
      { gameId: 4, isCollected: false },
      {gameId: 5, isCollected: true}
    ],
    moneyGained: 65896,
    moneySpent: 7897,
    currentBalance: 85369
  });
  const [gameEventsOrganised, setGameEventsOrganised] = useState([]);
  const [gameParticipated, setGameParticipated] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState('usa');
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  // useEffect(() => {
  //   const fetchProfileInfo = () => {
  //     // Do the needfull
  //     setProfileData();
  //   }

      // const fetchGameEventsOrganised = () => {
      // }

      // const fetchGameParticipated = () => {
      // }

  //   // Call the function
  //   fetchProfileInfo();
  // }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex flexDirection="row">
        <ProfileIcon
          name={profileData.nickName}
          address={profileData.address}
          image={profileData.progileImage}
        />
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 2, "2xl": 6 }}
          w="80%"
          gap='20px'
          mb='20px'
        >
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={
                  <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
                }
              />
            }
            name='Earnings'
            value={`$${profileData.moneyGained}`}
          />
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={
                  <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                }
              />
            }
            name='Spends'
            value={`$${profileData.moneySpent}`}
          />
          <MiniStatistics growth='+23%' name='Sales' value='$574.34' />
          <MiniStatistics
            endContent={
              <Flex me='-16px' mt='10px'>
                <FormLabel htmlFor='balance'>
                  <Avatar src={currentCurrency === 'theta' ? THETA : (currentCurrency === 'eth' ? ETH : Usa)} />
                </FormLabel>
                <Select
                  id='balance'
                  variant='filled'
                  mt='5px'
                  me='0px'
                  value={currentCurrency}
                  onChange={(e) => setCurrentCurrency(e.target.value)}
                >
                  <option value='usd'>USD</option>
                  <option value='theta'>THETA</option>
                  <option value='eth'>ETH</option>
                </Select>
              </Flex>
            }
            name='Current Balance'
            value={currentCurrency === 'theta' ? (profileData.currentBalance/3).toFixed(3) : (currentCurrency === 'eth' ? (profileData.currentBalance/56677).toFixed(3) : `$${profileData.currentBalance.toFixed(2)}`)}
          />
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
              />
            }
            name='Events Participated'
            value={profileData.gamesParticipating.length}
          />
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={
                  <Icon w='32px' h='32px' as={MdMilitaryTech} color={'yellow'} />
                }
              />
            }
            name='Total Events Organised'
            value={profileData.gamesUpload.length}
          />
        </SimpleGrid>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
