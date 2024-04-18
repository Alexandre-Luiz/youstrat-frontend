import { useEffect, useState } from 'react';
import Header from '../components/Header';
import GameBoxStrategy from '../components/GameBoxStrategy';
import GoogleAdSense from '../components/GoogleAdSense';
import { Link, useParams } from 'react-router-dom';
import { apiGetAllGames, apiGetGameStrategies, apiGetMapsByGame } from '../services/apiService';
import { sortMapsArray } from '../helpers/utils';
import Footer from '../components/Footer';

export default function HomePage() {
  const params = useParams();
  const [gameSelected, setGameSelected] = useState(null);
  const [error, setError] = useState('');
  const [allGames, setAllGames] = useState([]);
  const [allGameMaps, setAllGameMaps] = useState([]);
  const [allGameStrats, setAllGameStrats] = useState([]);

  // Load all games and maps from backend
  useEffect(() => {
    let isMounted = true;
    (async function getAllGames() {
      try {
        const backendAllGames = await apiGetAllGames();
        setAllGames(backendAllGames);
      } catch (error) {
        setError(error.message);
      }
    })();
    return () => {
      isMounted = false; // Cleanup to prevent state updates after unmounting
    };
  }, []);

  async function handleGameClick(game) {
    setGameSelected(game);
    try {
      const gameMaps = await apiGetMapsByGame(game);
      const sortedGameMaps = sortMapsArray(gameMaps);
      setAllGameMaps(sortedGameMaps);
      const gameStrats = await apiGetGameStrategies(game);

      // Sort strategies by stratName
      const sortedGameStrats = gameStrats.sort((a, b) => a.stratName.localeCompare(b.stratName));
      setAllGameStrats(sortedGameStrats);
    } catch (error) {
      setAllGameStrats([]);
      setError(error.message);
    }
    // Scroll to the GameBoxStrategy component when a game is selected
    const gameBoxElement = document.getElementById('game-box-strategy-id');
    if (gameBoxElement) {
      gameBoxElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  useEffect(() => {
    if (params.gameName) {
      handleGameClick(params.gameName);
    }
  }, [params.gameName]);

  // Update the title whenever the gameSelected state changes
  useEffect(() => {
    if (params.gameName) {
      document.title = `Youstrat - ${params.gameName} lineups`;
    } else {
      document.title = 'Youstrat';
    }
  }, [params.gameName]);

  return (
    <div id="homepage">
      <Header>You Strat</Header>
      <div className="flex flex-row justify-center gap-10 mt-24 mb-10 h-full">
        {allGames.map((game) => (
          <div key={game.gameId}>
            {/* Quando implementar valorant, so descomentar esse codigo e apagar a condicional abaixo */}
            {/* <Link to={`/${game.gameName}`} onClick={() => handleGameClick(game.gameName)}>
              <img
                className={`object-cover h-full w-96 rounded-md hover:scale-105 transition duration-400 ease-in-out hover:shadow-lg hover:shadow-slate-300`}
                src={process.env.PUBLIC_URL + `/images/${game.gameName}.jpg`}
                alt={game.gameName}
              />
            </Link> */}
            {game.gameName === 'valorant' ? (
              <Link to={''} onClick={''}>
                <img
                  className={`object-cover h-full w-96 rounded-md hover:scale-95 transition duration-400 ease-in-out hover:shadow-lg hover:shadow-slate-300 hover:grayscale `}
                  src={process.env.PUBLIC_URL + `/images/${game.gameName}.jpg`}
                  alt={game.gameName}
                  onMouseOver={() => {}}
                />
              </Link>
            ) : (
              <Link to={game.gameName} onClick={() => handleGameClick(game.gameName)}>
                <img
                  className={`object-cover h-full w-96 rounded-md hover:scale-105 transition duration-400 ease-in-out hover:shadow-lg hover:shadow-slate-300 
                `}
                  src={process.env.PUBLIC_URL + `/images/${game.gameName}.jpg`}
                  alt={game.gameName}
                />
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="py-2 my-5 text-center">
        <GoogleAdSense dataAdSlot={process.env.DATA_AD_SLOT} />
      </div>

      {params.gameName ? (
        <div className="flex justify-center my-10 h-screen " id="game-box-strategy-id">
          <GameBoxStrategy game={gameSelected} maps={allGameMaps} gameStrats={allGameStrats} />
        </div>
      ) : null}

      <div>
        <Footer />
      </div>
    </div>
  );
}
