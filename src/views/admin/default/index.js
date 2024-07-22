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
import React, { useState, useEffect, useContext } from "react";

// Importing Context
import { GameListContext } from "contexts/GameListContext";

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
  // columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
// import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
// import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import frameImage from 'assets/img/dashboards/frameImage.png';

export default function UserReports() {
  const { account } = useContext(GameListContext);
  const [profileData, setProfileData] = useState({
    address: "0x0fturtydtuftyur0tseeydrtydr",
    nickName: "John Doe",
    profileImage: "https://bootdey.com/img/Content/avatar/avatar1.png",
    frameImage: frameImage,
    gamesParticipating: [
      { gameId: 1, isCollected: false },
      { gameId: 2, isCollected: true }
    ],
    gamesUpload: [{ gameId: 3, isCollected: true },
    { gameId: 4, isCollected: false },
    { gameId: 5, isCollected: true }
    ],
    moneyGained: 65896,
    moneySpent: 7897,
    currentBalance: 85369
  });
  const [gameEventsOrganised, setGameEventsOrganised] = useState([]);
  const [gameParticipated, setGameParticipated] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState('usa');
  const [barChartGameRevenue, setBarChartGameRevenue] = useState([
    {
      name: "Game Play",
      data: [400, 370, 330],
    },
    {
      name: "Stream",
      data: [400, 370, 330],
    },
  ])
  const [barChartGameOptions, setBarChartGameOptions] = useState({
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: [17, 18, 19],
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: false,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },

    grid: {
      borderColor: "rgba(163, 174, 208, 0.3)",
      show: true,
      yaxis: {
        lines: {
          show: false,
          opacity: 0.5,
        },
      },
      row: {
        opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#ff6237", "#6AD2FF"],
    },
    legend: {
      show: false,
    },
    colors: ["#ff6237", "#6AD2FF"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "20px",
      },
    }
  });
  const [checkGameParticipated, setCheckGameParticipated] = useState([
    {
      "gameName": ["New International Game", false],
      "playPrize": 2458,
      "gameDate": "12 Jan 2021",
      "stream": 'Yes'
    },
    {
      "gameName": ["Among Us", true],
      "playPrize": 1485,
      "gameDate": "21 Feb 2021",
      "stream": 'No'
    },
    {
      "gameName": ["Weekly Update", true],
      "playPrize": 1024,
      "gameDate": "13 Mar 2021",
      "stream": 'Yes'
    },
    {
      "gameName": ["Venus 3D Asset", true],
      "playPrize": 858,
      "gameDate": "24 Jan 2021",
      "stream": 'No'
    },
    {
      "gameName": ["Marketplace", false],
      "playPrize": 258,
      "gameDate": "24 Oct 2022",
      "stream": 'Yes'
    },
    {
      "gameName": ["New International Game", false],
      "playPrize": 2458,
      "gameDate": "12 Jan 2021",
      "stream": 'No'
    },
    {
      "gameName": ["Among Us", true],
      "playPrize": 1485,
      "gameDate": "21 Feb 2021",
      "stream": 'Yes'
    },
    {
      "gameName": ["Weekly Update", true],
      "playPrize": 1024,
      "gameDate": "13 Mar 2021",
      "stream": 'No'
    },
    {
      "gameName": ["Venus 3D Asset", true],
      "playPrize": 858,
      "gameDate": "24 Jan 2021",
      "stream": 'Yes'
    },
    {
      "gameName": ["Marketplace", false],
      "playPrize": 258,
      "gameDate": "24 Oct 2022",
      "stream": 'No'
    },
    {
      "gameName": ["New International Game", false],
      "playPrize": 2458,
      "gameDate": "12 Jan 2021",
      "stream": 'Yes'
    },
    {
      "gameName": ["Among Us", true],
      "playPrize": 1485,
      "gameDate": "21 Feb 2021",
      "stream": 'No'
    },
    {
      "gameName": ["Weekly Update", true],
      "playPrize": 1024,
      "gameDate": "13 Mar 2021",
      "stream": 'Yes'
    },
    {
      "gameName": ["Venus 3D Asset", true],
      "playPrize": 858,
      "gameDate": "24 Jan 2021",
      "stream": 'No'
    },
    {
      "gameName": ["Marketplace", false],
      "playPrize": 258,
      "gameDate": "24 Oct 2022",
      "stream": 'Yes'
    }
  ]);
  const [complexGameOrganised, setComplexGameOrganised] = useState([
    {
      "gameName":"Clash of Clans",
      "status": "Upcoming",
      "prizePool": '$65',
      "participants": 75.5  
    },
    {
      "gameName":"Ninja Fighter",
      "status": "Ended",
      "prizePool": "$85",
      "participants": 25.5  
    },
    {
      "gameName":"Free Fire",
      "status": "Live",
      "prizePool": "$94",
      "participants": 90  
    },
    {
      "gameName":"Weekly Updates",
      "status": "Live",
      "prizePool": "$35",
      "participants": 50.5  
    },
    {
      "gameName":"Clash of Clans",
      "status": "Upcoming",
      "prizePool": '$65',
      "participants": 75.5  
    },
    {
      "gameName":"Ninja Fighter",
      "status": "Ended",
      "prizePool": "$85",
      "participants": 25.5  
    },
    {
      "gameName":"Free Fire",
      "status": "Live",
      "prizePool": "$94",
      "participants": 90  
    },
    {
      "gameName":"Weekly Updates",
      "status": "Live",
      "prizePool": "$35",
      "participants": 50.5  
    },
    {
      "gameName":"Clash of Clans",
      "status": "Upcoming",
      "prizePool": '$65',
      "participants": 75.5  
    },
    {
      "gameName":"Ninja Fighter",
      "status": "Ended",
      "prizePool": "$85",
      "participants": 25.5  
    },
    {
      "gameName":"Free Fire",
      "status": "Live",
      "prizePool": "$94",
      "participants": 90  
    },
    {
      "gameName":"Weekly Updates",
      "status": "Live",
      "prizePool": "$35",
      "participants": 50.5  
    },
  ]);
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

  useEffect(() => {
    const fetchBarChartGameRevenue = () => {
      let lastGamesOrganised = gameEventsOrganised.toReversed().slice(0, 7);
      console.log("Thw last games are: ", lastGamesOrganised);
      setBarChartGameOptions({
        ...barChartGameOptions,
        xaxis: {
          ...barChartGameOptions.xaxis,
          categories: lastGamesOrganised.map(game => game.gameId)
        }
      })

      // Fetch the revenue collected from last 7 games from fetchBarChartGameRevenue
      setBarChartGameRevenue([
        {
          name: "Game Play",
          data: lastGamesOrganised.map(game => game.playPrizeRevenue)
        }, {
          name: "Stream",
          data: lastGamesOrganised.map(game => game.streamRevenue)
        }
      ])
    }

    // Call the function here
    // fetchBarChartGameRevenue();
  }, [profileData]);

  // useEffect(() => {
  //   const applyCheckGameParticipated = () => {
  //     let gamesPart = gameParticipated.map(game => {
  //       return {
  //         gameName: [game.gameName, game.isCollected],
  //         playPrize: `$${game.gameDate}`,
  //         gameDate: game.gameDate,
  //         stream: game.startDate
  //       }
  //     });
  //     setCheckGameParticipated(gamesPart);
  //   }

  //   applyCheckGameParticipated();
  // }, [gameParticipated])

  // useEffect(() => {
  //   const applyComplexGameOrganised = () => {
  //     let gamesOrg = gameEventsOrganised.map(game => {
  //       return {
  //         gameName: game.gameName,
  //         status: game.startDate > new Date() ? "Upcoming" : (new Date(game.startDate - game.hours*3600*1000) > new Date() ? "Live" : "Ended"),
  //         prizePool: game.totalPrizeMoney,
  //         participants: game.participants
  //       }
  //     });
  //     setComplexGameOrganised(gamesOrg);
  //   }

  //   applyComplexGameOrganised();
  // }, [gameEventsOrganised]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex flexDirection="row">
        <ProfileIcon
          name={profileData.nickName}
          address={profileData.address}
          profileImage={profileData.profileImage}
          frameImage={profileData.frameImage}
        />
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 2, "3xl": 6 }}
          w="72%"
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
            value={currentCurrency === 'theta' ? (profileData.currentBalance / 3).toFixed(3) : (currentCurrency === 'eth' ? (profileData.currentBalance / 56677).toFixed(3) : `$${profileData.currentBalance.toFixed(2)}`)}
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
        <TotalSpent gameParticipated={gameParticipated} />
        <WeeklyRevenue
          barChartDataConsumption={barChartGameRevenue}
          barChartOptionsConsumption={barChartGameOptions}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable
          // columnsData={columnsDataCheck}
          tableData={checkGameParticipated}
        />
        <ComplexTable
          // columnsData={columnsDataComplex}
          tableData={complexGameOrganised}
        />
        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid> */}
      </SimpleGrid>
      {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid> */}
    </Box>
  );
}