import React from 'react';

const DashTable = ({ title, entries, onEdit, onDelete, onAdd }) => {
  const renderButtons = (entry) => (
    <td className="w-20 p-3 text-center">
      <button
        className="bg-blue-500 text-white mb-2 px-4 py-1"
        onClick={() => {
          onEdit(entry);
        }}
      >
        Edit
      </button>
      <button className="bg-red-500 text-white px-2 py-1" onClick={() => onDelete(entry)}>
        Delete
      </button>
    </td>
  );

  const renderGameTable = (game) => (
    <tr key={game.gameId} className="border-b text-center">
      <td className="border px-4 py-2">{game.gameId}</td>
      <td className="border px-4 py-2">{game.gameName}</td>
      {entries.some((entry) => entry.mapId) && (
        <>
          <td className="border px-4 py-2"></td>
          <td className="border px-4 py-2"></td>
        </>
      )}
      <td className="border w-20 p-3 text-center">{renderButtons(game)}</td>
    </tr>
  );

  const renderMapTable = (map) => (
    <tr key={map.mapId} className="border-b text-center h-auto">
      <td className="border ">{map.mapId}</td>
      <td className="border ">{map.mapName}</td>
      {map.game && (
        <>
          <td className="border ">{map.game.gameId}</td>
          <td className="border ">{map.game.gameName}</td>
        </>
      )}
      <td className="border w-20 p-3 text-center">{renderButtons(map)}</td>
    </tr>
  );

  const renderStrategyTable = (strategy) =>
    strategy.gameStrategies.map((strat) => (
      <tr key={strat.stratId} className="border-b text-center">
        <td className="border px-4 py-2">{strat.stratId}</td>
        <td className="border px-4 py-2">{strat.map ? strat.map.mapName : ''}</td>
        <td className="border px-4 py-2">{strat.type}</td>
        <td className="border px-4 py-2">{strat.stratName}</td>
        {/* <td className="border px-4 py-2">{strat.description}</td> */}
        <td className="border px-4 py-2" style={{ whiteSpace: 'pre-line' }}>
          {strat.description}
        </td>
        <td className="border px-4 py-2">{strat.videoUrl}</td>
        <td className="border px-4 py-2">{strat.map ? strat.map.mapId : ''}</td>
        <td className="border px-4 py-2">{strat.map ? strat.map.gameId : ''}</td>
        <td className="border w-20 p-3 text-center">{renderButtons(strat)}</td>
      </tr>
    ));

  return (
    <div className="my-4">
      <div className="my-4 flex flex-row space-x-4">
        <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
        <button className="bg-green-500 text-white mb-2 px-4 py-1" onClick={() => onAdd()}>
          Add
        </button>
      </div>

      <table className="w-full border">
        <thead className="text-white">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            {entries.some((entry) => entry.mapId) && (
              <>
                <th className="border px-4 py-2">Game ID</th>
                <th className="border px-4 py-2">Game Name</th>
              </>
            )}
            {entries.some((entry) => entry.gameStrategies) && (
              <>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Strat Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Video URL</th>
                <th className="border px-4 py-2">Map ID</th>
                <th className="border px-4 py-2">Game ID</th>
              </>
            )}
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {entries.map((entry) => {
            if (entry.mapId) {
              return renderMapTable(entry);
            } else if (entry.gameStrategies) {
              return renderStrategyTable(entry);
            } else if (entry.gameId) {
              return renderGameTable(entry);
            }

            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashTable;
