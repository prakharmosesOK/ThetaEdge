import { useState, createContext } from 'react';

export const GameListContext = createContext();

export const GameListProvider = ({ children }) => {
    const [totalGamesList, setTotalGamesList] = useState([
        {
            gameId: 1,
            gameName: "Game 1",
            gameImage: "https://via.placeholder.com/150",
            gamePrice: 200,
            videoLink: "https://www.youtube.com/watch?v=WrrLd4evArA",
            gameDescription: "dfhfbd rtjhdkr kdrhvtir niurrvthd viur kv liuigoi livihrdli lvgrsmh mghls  vigs  mjgr mjgis mjgl",
            streamTicketPrice: 100,
            nickName: "gjdos",
            totalParticipants: 52,
            maxParticipants: 100,
            totalPrizeMoney: 500,
            bIsInvite: false,
			privateCode: "lghdyhdfirtvrd",
			bIsMultiplayer: false,
            organiserAddress: "0x0",
            date: new Date(),
            time: new Date().getTime(),
            noOfHour: 2,
            lobbyTimeInMin: 10,
        },
        {
            gameId: 2,
            gameName: "Game 1",
            gameImage: "https://via.placeholder.com/150",
            gamePrice: 200,
            videoLink: "https://www.youtube.com/watch?v=WrrLd4evArA",
            gameDescription: "dfhfbd rtjhdkr kdrhvtir niurrvthd viur kv liuigoi livihrdli lvgrsmh mghls  vigs  mjgr mjgis mjgl",
            streamTicketPrice: 100,
            nickName: "gjdos",
            totalParticipants: 52,
            maxParticipants: 100,
            totalPrizeMoney: 500,
            bIsInvite: false,
			privateCode: "lghdyhdfirtvrd",
			bIsMultiplayer: false,
            organiserAddress: "0x0",
            date: new Date(),
            time: new Date().getTime(),
            noOfHour: 2,
            lobbyTimeInMin: 10,
        },
        {
            gameId: 3,
            gameName: "Game 1",
            gameImage: "https://via.placeholder.com/150",
            gamePrice: 200,
            videoLink: "https://www.youtube.com/watch?v=WrrLd4evArA",
            gameDescription: "dfhfbd rtjhdkr kdrhvtir niurrvthd viur kv liuigoi livihrdli lvgrsmh mghls  vigs  mjgr mjgis mjgl",
            streamTicketPrice: 100,
            nickName: "gjdos",
            totalParticipants: 52,
            maxParticipants: 100,
            totalPrizeMoney: 500,
            bIsInvite: false,
			privateCode: "lghdyhdfirtvrd",
			bIsMultiplayer: false,
            organiserAddress: "0x0",
            date: new Date(),
            time: new Date().getTime(),
            noOfHour: 2,
            lobbyTimeInMin: 10,
        },
    ]);
    const [filteredGamesList, setFilteredGamesList] = useState(totalGamesList);
    const [searchedGamesList, setSearchedGamesList] = useState(totalGamesList);
    const [account, setAccount] = useState(localStorage.getItem('account') || '0x0');

    return (
        <GameListContext.Provider
            value={{totalGamesList, setTotalGamesList, filteredGamesList, setFilteredGamesList, searchedGamesList, setSearchedGamesList, account, setAccount}}
        >
            {children}
        </GameListContext.Provider>
    )
}