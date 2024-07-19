import { useState, createContext } from 'react';

export const GameListContext = createContext();

export const GameListProvider = ({ children }) => {
    const [totalGamesList, setTotalGamesList] = useState([
        {
            gameId: 1,
            gameName: "Game 1",
            gameImage: "https://via.placeholder.com/150",
            gamePrice: 200,
            gameAuthor: "0x0",
            nickName: "gjdos",
            totalParticipants: 52,
            maxParticipants: 100,
            totalPrizeMoney: 500,
            bIsInvite: false,
			privateCode: "lghdyhdfirtvrd",
			bIsMultiplayer: false,
			lobbyCode: "0",
			couponCode: "887195",
            organiserAddress: "0x0",
            date: new Date()
        },
        {
            gameId: 2,
            gameName: "Game 2",
            gameImage: "https://via.placeholder.com/150",
            gamePrice: 200,
            gameAuthor: "0x0",
            gameAuthorName: "gjdos",
            totalParticipants: 52,
            maxParticipants: 100,
            totalPrizeMoney: 500,
            bIsInvite: false,
			privateCode: "lghdyhdfirtvrd",
			bIsMultiplayer: false,
			lobbyCode: "0",
			couponCode: "887195",
            organiserAddress: "0x0",
            date: new Date()
        },
        {
            gameId: 3,
            gameName: "Game 3",
            gameImage: "https://via.placeholder.com/150",
            gamePrice: 200,
            gameAuthor: "0x0",
            gameAuthorName: "gjdos",
            totalParticipants: 52,
            maxParticipants: 100,
            totalPrizeMoney: 500,
            bIsInvite: false,
			privateCode: "lghdyhdfirtvrd",
			bIsMultiplayer: false,
			lobbyCode: "0",
			couponCode: "887195",
            organiserAddress: "0x0",
            date: new Date()
        }
    ]);
    const [filteredGamesList, setFilteredGamesList] = useState(totalGamesList);
    const [searchedGamesList, setSearchedGamesList] = useState(totalGamesList);

    return (
        <GameListContext.Provider
            value={{totalGamesList, setTotalGamesList, filteredGamesList, setFilteredGamesList, searchedGamesList, setSearchedGamesList}}
        >
            {children}
        </GameListContext.Provider>
    )
}