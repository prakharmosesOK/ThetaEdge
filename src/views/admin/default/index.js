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
import Organiser from "../../../contracts/Organiser.json";

// Importing frames
import frame1 from 'assets/img/dashboards/frame1.png'
import frame2 from 'assets/img/dashboards/frame2.png'
import frame3 from 'assets/img/dashboards/frame3.png'
import frame4 from 'assets/img/dashboards/frame4.png'
import frame5 from 'assets/img/dashboards/frame5.png'
import frame6 from 'assets/img/dashboards/frame6.png'
import frame7 from 'assets/img/dashboards/frame7.png'
import frame8 from 'assets/img/dashboards/frame8.png'
import frame9 from 'assets/img/dashboards/frame9.png'
import frame10 from 'assets/img/dashboards/frame10.png'
import defaultFrame from 'assets/img/dashboards/defaultFrame.png'

const framesArray = [defaultFrame, frame1, frame2, frame3, frame4, frame5, frame6, frame7, frame8, frame9, frame10];
const { ethers } = require("ethers");
const contractABI = Organiser.abi;
const contractAddress = '0x191e1fa2056d68d167930db8b8cdecb7b9cfce9c';

export default function UserReports() {
  const { account } = useContext(GameListContext);
  const [profileData, setProfileData] = useState({
    address: account,
    nickName: "John Doe",
    profileImage: "https://bootdey.com/img/Content/avatar/avatar1.png",
    frameImage: 0,
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
    currentBalance: 85369,
    frameImageArray: [0],
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
    }
  ]);
  const [complexGameOrganised, setComplexGameOrganised] = useState([
    {
      "gameName": "Clash of Clans",
      "status": "Upcoming",
      "prizePool": '$65',
      "participants": 75.5
    },
    {
      "gameName": "Ninja Fighter",
      "status": "Ended",
      "prizePool": "$85",
      "participants": 25.5
    },
    {
      "gameName": "Free Fire",
      "status": "Live",
      "prizePool": "$94",
      "participants": 90
    },
    {
      "gameName": "Weekly Updates",
      "status": "Live",
      "prizePool": "$35",
      "participants": 50.5
    },
    {
      "gameName": "Clash of Clans",
      "status": "Upcoming",
      "prizePool": '$65',
      "participants": 75.5
    },
    {
      "gameName": "Ninja Fighter",
      "status": "Ended",
      "prizePool": "$85",
      "participants": 25.5
    },
    {
      "gameName": "Free Fire",
      "status": "Live",
      "prizePool": "$94",
      "participants": 90
    },
    {
      "gameName": "Weekly Updates",
      "status": "Live",
      "prizePool": "$35",
      "participants": 50.5
    },
    {
      "gameName": "Clash of Clans",
      "status": "Upcoming",
      "prizePool": '$65',
      "participants": 75.5
    },
    {
      "gameName": "Ninja Fighter",
      "status": "Ended",
      "prizePool": "$85",
      "participants": 25.5
    },
    {
      "gameName": "Free Fire",
      "status": "Live",
      "prizePool": "$94",
      "participants": 90
    },
    {
      "gameName": "Weekly Updates",
      "status": "Live",
      "prizePool": "$35",
      "participants": 50.5
    },
  ]);
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

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

  async function fetchGameParticipated() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _contract = new ethers.Contract(contractAddress, contractABI, provider);
    try {
      const gameEvents = await Promise.all(
        profileData.gamesParticipating.map(async (game) => {
          const result = await _contract.getGameById(game.gameId);
          const ipfsData = await getDataFromIpfs(result.Ipfs);
          return {
            gameId: game.gameId,
            gameName: ipfsData.gameName,
            isCollected: game.isCollected,
            totalPrizeMoney: result.totalRevenue.toNumber(),
            startDate: new Date(ipfsData.date),
            score: result.playersJoined[account] ? result.playersJoined[account].leaderboardScore : 0, 
          };
        })
      );
      setGameParticipated(gameEvents);
    }
    catch (error) {
      console.log(error);
    }
  }

  async function fetchGameEventsOrganised() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _contract = new ethers.Contract(contractAddress, contractABI, provider);
    
    try {
      const gameEvents = await Promise.all(
        profileData.gamesUpload.map(async (game) => {
          //console.log("first",game.gameId);
          const result = await _contract.getGameById(game.gameId);
          //console.log("ye chahiye", result);
          const ipfsData = await getDataFromIpfs(result.Ipfs);
          // console.log(ipfsData);
          return {
            gameId: game.gameId,
            playPrizeRevenue: result.totalRevenueFromGame.toNumber(),
            streamRevenue: result.totalRevenueFromStream.toNumber(),
            totalPrizeMoney: result.totalRevenue.toNumber(),
            gameName: ipfsData.gameName,
            noOfPlayers: result.playersJoined.length,
            maxParticipants: ipfsData.maxParticipants,
            startDate: new Date(ipfsData.date),
            hours: ipfsData.noOfHour
          };
        })
      );

      setGameEventsOrganised(gameEvents);
    }
    catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    const fetchProfileInfo = async () => {
      console.log(account);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //const signer = provider.getSigner();
      const _contract = new ethers.Contract(contractAddress, contractABI, provider);
      try {
        const result1 = await _contract.GetProfileIpfs(account);

        //console.log(result1);
        const result = await getDataFromIpfs(result1);
        //console.log(result);
        setProfileData(prevProfileData => ({
          ...prevProfileData, // Keep the existing properties
          nickName: result.nickName, // Hardcoded new nickname
          profileImage: result.profileImage, // Hardcoded new moneyGained value
          frameImage: result.frameImage ? result.frameImage : 0
        }));
      }
      catch (error) {
        console.log(error);
      }

      try {
        const result2 = await _contract.getGamesStatus(account);
        const gamesJoined = result2[0].map(num => num.toNumber());
        const gamesOrganized = result2[1].map(num => num.toNumber());
        const frameImageArray = result2[4].map(num => num.toNumber());

        const gamesParticipating = result2[5].slice(0, gamesJoined.length).map((game, index) => ({
          gameId: game[0].toNumber(),
          isCollected: game[1]
        }));

        const gamesUpload = result2[5].slice(gamesJoined.length).map((game, index) => ({
          gameId: game[0].toNumber(),
          isCollected: game[1]
        }));
        setProfileData(prevProfileData => ({
          ...prevProfileData,
          moneyGained: result2[2].toNumber(),
          moneySpent: result2[3].toNumber(),
          frameImageArray,
          gamesParticipating,
          gamesUpload,
        }));
        console.log(result2);
      }
      catch (error) {
        console.log(error);
      }

    }

    fetchProfileInfo();
  }, []);

  useEffect(async () => {
    await fetchGameEventsOrganised();
    await fetchGameParticipated();
  }, [profileData]);

  useEffect(() => {
    const fetchBarChartGameRevenue = () => {
      let lastGamesOrganised = gameEventsOrganised.toReversed().slice(0, 4);
      console.log("organise", lastGamesOrganised);
      setBarChartGameOptions({
        ...barChartGameOptions,
        xaxis: {
          ...barChartGameOptions.xaxis,
          categories: lastGamesOrganised.map(game => game.gameName)
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
    fetchBarChartGameRevenue();
  }, [profileData,gameEventsOrganised]);


  useEffect(() => {
    const applyCheckGameParticipated = () => {
      let gamesPart = gameParticipated.map(game => {
        return {
          gameName: [game.gameName, game.isCollected],
          playPrize: `$${game.totalPrizeMoney}`,
          gameDate: game.startDate,
          stream: game.score //score
        }
      });
      setCheckGameParticipated(gamesPart);
    }

    applyCheckGameParticipated();
  }, [gameParticipated])

  useEffect(() => {
    const applyComplexGameOrganised = () => {
      let gamesOrg = gameEventsOrganised.map(game => {
        return {
          gameName: game.gameName,
          status: game.startDate > new Date() ? "Upcoming" : (new Date(game.startDate.getTime() - parseInt(game.hours) * 3600 * 1000) > new Date() ? "Live" : "Ended"),
          prizePool: game.totalPrizeMoney,
          participants: (game.noOfPlayers / parseFloat(game.maxParticipants)) * 100,
        }
      });
      setComplexGameOrganised(gamesOrg);
    }

    applyComplexGameOrganised();
  }, [gameEventsOrganised]);

  return (
    <Box mt={{ base: "8em", md: "8em", xl: "6em" }}>
      <Flex flexDirection="row">
        <ProfileIcon
          profileData={profileData}
          setProfileData={setProfileData}
          framesArray={framesArray}
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
