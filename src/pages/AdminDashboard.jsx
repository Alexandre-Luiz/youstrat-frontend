import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import {
  apiDeleteGameById,
  apiDeleteMapById,
  apiDeleteStratById,
  apiEditGameById,
  apiEditMapById,
  apiEditStratById,
  apiGetAllGames,
  apiGetAllMaps,
  apiGetGameStrategies,
  apiNewCsStrat,
  apiNewGame,
  apiNewMap,
} from '../services/apiService';
import DashTable from '../components/DashTable';
import EditModal from '../components/EditModal';
import AddModal from '../components/AddModal';

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [games, setGames] = useState([]);
  const [maps, setMaps] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [newEntryType, setNewEntryType] = useState(null);
  const [error, setError] = useState('');
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = useState(false);
  const [createMode, setCreateMode] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      console.log('Fetching data started');
      const gamesData = await apiGetAllGames();
      setGames(gamesData);

      const mapsData = await apiGetAllMaps();
      setMaps(mapsData);

      const strategiesDataPromises = gamesData.map(async (game) => {
        try {
          const gameStrategies = await apiGetGameStrategies(game.gameName);
          return { gameId: game.gameId, gameStrategies };
        } catch (error) {
          console.error(`Error fetching strategies for game ${game.gameId}:`, error);
          return { gameId: game.gameId, gameStrategies: [] };
        }
      });
      const strategiesData = await Promise.all(strategiesDataPromises);

      // Sort each gameStrategies array by stratId
      strategiesData.forEach((game) => {
        game.gameStrategies.sort((a, b) => a.stratId - b.stratId);
      });

      setStrategies(strategiesData);

      console.log('Fetching data completed');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Check if user is admin, otherwise redirect or show access denied message
  if (!user || user.role !== 'admin') {
    // Redirect or show access denied message
    return <div className="text-white">Access Denied</div>;
  }

  function handleEditEntryClick(data) {
    setCreateMode(false);
    setEditModalOpen(true);
    setSelectedEntry(data);
  }

  function handleNewEntryClick(newEntryType) {
    setCreateMode(true);
    setIsNewEntryModalOpen(true);
    setNewEntryType(newEntryType);
  }

  async function handlePersist(data) {
    // New entry
    if (createMode) {
      console.log('handleNew:', data);
      let dataType = Object.keys(data)[0];

      switch (dataType) {
        case 'gameName':
          const newGame = await apiNewGame(data);
          setGames((prevGames) => [...prevGames, newGame]);
          break;
        case 'mapName':
          const newMap = await apiNewMap(data);
          console.log(newMap);
          // setMaps((prevMaps) => [...prevMaps, newMap]);
          setMaps((prevMaps) => {
            const updatedMaps = [...prevMaps, newMap];
            console.log('Updated Maps:', updatedMaps);
            return updatedMaps;
          });
          break;
        case 'stratName':
          const newCsStrat = await apiNewCsStrat(data);
          // The set here is different because the structure built in the fetch function (gameId, gameStrategies)
          setStrategies((prevStrats) => {
            const updatedStrats = prevStrats.map((game) => {
              if (game.gameId === newCsStrat.map.gameId) {
                const updatedGame = {
                  ...game,
                  gameStrategies: [...game.gameStrategies, newCsStrat],
                };
                return updatedGame;
              }
              return game;
            });
            return updatedStrats;
          });
          break;

        default:
          break;
      }
    } else {
      try {
        console.log('handleEdit:', data);
        // Checks the first key of the data to decide to wich endpoint send the request
        let dataType = Object.keys(data)[0];
        // Backend Update
        switch (dataType) {
          case 'gameId':
            console.log('Editing game ID:', data.gameId);
            // Backend
            const updatedGame = await apiEditGameById(data);
            // Frontend
            setGames((prevGames) => {
              return prevGames.map((game) =>
                game.gameId === updatedGame.gameId ? updatedGame : game
              );
            });
            break;
          case 'mapId':
            console.log('Editing map ID:', data.mapId);
            // Backend
            const updatedMap = await apiEditMapById(data);
            // Frontend
            setMaps((prevMaps) => {
              return prevMaps.map((map) => (map.mapId === updatedMap.mapId ? updatedMap : map));
            });
            break;
          case 'stratId':
            console.log('Editing strategy ID:', data.stratId);
            let gameId = data.map.gameId;
            // Backend
            const updatedStrat = await apiEditStratById(data, gameId);
            // Frontend
            setStrategies((prevStrategies) => {
              return prevStrategies.map((strategy) => {
                if (
                  strategy.gameStrategies &&
                  strategy.gameStrategies.length > 0 &&
                  strategy.gameStrategies.some((strat) => strat.stratId === updatedStrat.stratId)
                ) {
                  strategy.gameStrategies = strategy.gameStrategies.map((strat) =>
                    strat.stratId === updatedStrat.stratId ? updatedStrat : strat
                  );
                }
                return strategy;
              });
            });
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error editing data:', error);
        setError(error);
      }
    }
  }

  async function handleDelete(data) {
    try {
      console.log('handleDelete:', data);
      // Checks the first key of the data to decide to wich endpoint send the request
      let dataType = Object.keys(data)[0];
      switch (dataType) {
        case 'gameId':
          // backend
          await apiDeleteGameById(data.gameId);
          // frontend
          setGames((prevGames) => prevGames.filter((game) => game.gameId !== data.gameId));
          break;
        case 'mapId':
          // backend
          await apiDeleteMapById(data.mapId);
          // frontend
          setMaps((prevMaps) => prevMaps.filter((map) => map.mapId !== data.mapId));
          break;
        case 'stratId':
          console.log('Deleting strategy by ID:', data.stratId);
          let gameId = data.map.gameId;
          // backend
          await apiDeleteStratById(data.stratId, gameId);
          console.log('Strategy deleted successfully');
          // frontend
          setStrategies((prevStrategies) => {
            const updatedStrategies = prevStrategies.map((strategy) => {
              if (strategy.gameStrategies && strategy.gameStrategies.length > 0) {
                strategy.gameStrategies = strategy.gameStrategies.filter(
                  (strat) => strat.stratId !== data.stratId
                );
              }
              return strategy;
            });
            return updatedStrategies;
          });
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      setError(error);
    }
  }

  function handleDashEditDialogClose() {
    setEditModalOpen(false);
  }

  function handleDashAddtDialogClose() {
    setIsNewEntryModalOpen(false);
  }

  return (
    <div className="container mx-auto p-4">
      {/* Render games, maps, and strategies tables */}
      <DashTable
        title="Games"
        entries={games}
        onEdit={(data) => handleEditEntryClick(data)}
        onDelete={(data) => handleDelete(data)}
        onAdd={() => handleNewEntryClick('games')}
      />

      <DashTable
        title="Maps"
        entries={maps}
        onEdit={(data) => handleEditEntryClick(data)}
        onDelete={(data) => handleDelete(data)}
        onAdd={() => handleNewEntryClick('maps')}
      />

      <DashTable
        title="CS2 Strategies"
        entries={strategies}
        onEdit={(data) => handleEditEntryClick(data)}
        onDelete={(data) => handleDelete(data)}
        onAdd={() => handleNewEntryClick('strategies')}
      />

      {/* Modals */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={handleDashEditDialogClose}
        onPersist={handlePersist}
        selectedEntry={selectedEntry}
        createMode={createMode}
      />

      <AddModal
        isOpen={isNewEntryModalOpen}
        onClose={handleDashAddtDialogClose}
        onPersist={handlePersist}
        entryType={newEntryType}
      />
    </div>
  );
}
