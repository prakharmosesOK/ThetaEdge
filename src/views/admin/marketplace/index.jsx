/*!                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.prakharmosesOK.github.io/ThetaEdge/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

// Importing context
import { GameListContext } from "contexts/GameListContext";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  // SimpleGrid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

// Custom components
import Carousel from "views/admin/marketplace/components/Carousel";
// import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
// import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
// import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";

const filters = [
  {
    id: 'status',
    name: 'Status',
    options: [{ optionId: 'open', optionName: 'Open' },
    { optionId: 'upcoming', optionName: 'Upcoming' }]
  },
  {
    id: 'openTo',
    name: 'Open to',
    options: [{ optionId: 'all', optionName: 'All' },
    { optionId: 'inviteOnly', optionName: 'Invite Only' }]
  },
  {
    id: 'prizePool',
    name: 'Prize Pool',
    options: [{ optionId: 'increasing', optionName: 'Increasing' },
    { optionId: 'decreasing', optionName: 'Decreasing' }]
  },
  {
    id: 'type',
    name: 'Type',
    options: [{ optionId: 'singlePlayer', optionName: 'Single Player' },
    { optionId: 'multiPlayer', optionName: 'Multi Player' }]
  }
]

export default function Marketplace(props) {
  const [purchaseHistory, setPurchaseHistory] = useState([
    {
      gameName: "Colourfull Heaven",
      datePurchased: "30s ago",
      price: "0.911 ETH",
      gameImage: Nft5,
      purchaseCategory: "Stream Play"
    },
    {
      gameName: "Abstract Colors",
      datePurchased: "58s ago",
      price: "0.911 ETH",
      gameImage: Nft1,
      purchaseCategory: "Stream Play"
    },
    {
      gameName: "ETH AI Brain",
      datePurchased: "1m ago",
      price: "0.911 ETH",
      gameImage: Nft2,
      purchaseCategory: "Stream Play"
    },
    {
      gameName: "Swipe Circles",
      datePurchased: "1m ago",
      price: "0.911 ETH",
      gameImage: Nft4,
      purchaseCategory: "Stream Play"
    },
    {
      gameName: "Mesh Gradients",
      datePurchased: "2m ago",
      price: "0.911 ETH",
      gameImage: Nft3,
      purchaseCategory: "Stream Play"
    },
    {
      gameName: "3D Cubes Art",
      datePurchased: "3m ago",
      price: "0.911 ETH",
      gameImage: Nft6,
      purchaseCategory: "Stream Play"
    }
  ]);
  const [filterState, setFilterState] = useState({
    'status': [],
    'openTo': [],
    'prizePool': [],
    'type': []
  })
  const { account, searchText, setSearchText } = props;
  const history = useHistory();
  const {
    totalGamesList, setTotalGamesList, filteredGamesList, setFilteredGamesList, searchedGamesList, setSearchedGamesList
  } = useContext(GameListContext);
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  const fetchGamesList = async () => {
    try {
      // const response = await fetch("https://api.example.com/games-list");
      // const data = await response.json();
      // setTotalGamesList(data);
    } catch (error) {
      console.error(error);
    }
  }

  const applyFilters = async () => {
    let filteredList = totalGamesList;

    // Status Filter
    if (filterState.status.length > 0) {
      switch (filterState.status[0]) {
        case 'open':
          filteredList = filteredList.filter((item) => item.date > new Date());
          break;
        case 'upcoming':
          filteredList = filteredList.filter((item) => item.date < new Date());
          break;
      }
    }

    // Open to Filter
    if (filterState.openTo.length > 0) {
      filteredList = filteredList.filter((item) => filterState.openTo.includes(item.bIsInvite));
    }

    // Prize Pool Filter
    if (filterState.prizePool.length > 0) {
      switch (filterState.prizePool[0]) {
        case 'increasing':
          filteredList = filteredList.sort((a, b) => a.totalPrizeMoney - b.totalPrizeMoney);
          break;
        case 'decreasing':
          filteredList = filteredList.sort((a, b) => b.totalPrizeMoney - a.totalPrizeMoney);
          break;
      }
    }

    // Type Filter
    if (filterState.type.length > 0) {
      filteredList = filteredList.filter((item) => filterState.type.includes(item.bIsMultiplayer));
    }

    setFilteredGamesList(filteredList);
    setSearchedGamesList(filteredList);
  }

  const handleFilterChange = (filterId, optionId) => {
    let newFilterState = { ...filterState };
    if (newFilterState[filterId].includes(optionId)) {
      newFilterState[filterId] = newFilterState[filterId].filter((option) => option !== optionId);
    } else {
      newFilterState[filterId] = [optionId];
    }
    setFilterState(newFilterState);
  }

  useEffect(() => {
    if (searchText) {
      const searchedList = filteredGamesList.filter((item) => item.gameName.toLowerCase().includes(searchText.toLowerCase()));
      setSearchedGamesList(searchedList);
    } else {
      setSearchedGamesList(filteredGamesList);
    }
  }, [searchText]);

  useEffect(() => {
    applyFilters();
  }, [filterState, totalGamesList]);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        // const response = await fetch("https://api.example.com/purchase-history");
        // const data = await response.json();
        // setPurchaseHistory(data);
      } catch (error) {
        console.error(error);
      }
    }

    // Call this function to fetch purchase history
    // fetchPurchaseHistory();
  }, []);

  useEffect(() => {
    // Call this function to fetch games List
    // fetchGamesList();
  }, []);

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
          <Carousel />
          <Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Trending NFT tickets
              </Text>
              <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                {filters.map((filter, index) => (
                  <Menu key={index}>
                    <MenuButton>
                      <Link
                        color={textColorBrand}
                        fontWeight='500'
                        me={{ base: "34px", md: "44px" }}
                        to='#art'>
                        {filter.name}
                      </Link>
                    </MenuButton>
                    <MenuList>
                      {filter.options.map((option, idx) => (
                        <MenuItem
                          key={idx}
                          onClick={() => handleFilterChange(filter.id, option.optionId)}
                          bg={filterState[filter.id].includes(option.optionId) ? 'brand.500' : 'transparent'}
                        >{option.optionName}</MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                ))}
              </Flex>
            </Flex>
            <Flex flexDirection="column" gap='20px'>
              {searchedGamesList.map((game) => (
                <NFT
                  key={game.gameId}
                  gameEvent={game}
                />))}
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>
          {/* <Card px='0px' mb='20px'>
            <TableTopCreators
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            />
          </Card> */}
          <Card
            p='0px'
            w={{ base: "40em", md: "32em", xl: "23em" }}
            mx="auto"
          >
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify='space-between'
              w='100%'
              px='22px'
              py='18px'>
              <Text color={textColor} fontSize='xl' fontWeight='600'>
                History
              </Text>
              <Button variant='action' onClick={() => history.push(`/admin/${account}`)}>See all</Button>
            </Flex>

            {purchaseHistory.map((purchase, index) => (
              <HistoryItem key={index}
                name={purchase.gameName}
                category={purchase.purchaseCategory}
                date={purchase.datePurchased}
                image={purchase.gameImage}
                price={purchase.price}
              />
            ))}
          </Card>
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
