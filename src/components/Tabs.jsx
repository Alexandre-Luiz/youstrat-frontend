// Tabs.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Tabs = ({ onSelect, maps }) => {
  const { gameName, mapName } = useParams();
  const [activeTab, setActiveTab] = useState(null);

  // This useEffect is only to load the accordion before the user click a tab defining a initial load stage
  useEffect(() => {
    if (maps.length > 0 && mapName) {
      const paramsMap = maps.filter((map) => map.mapName === mapName);
      setActiveTab(paramsMap[0]);
      onSelect(paramsMap[0]);
    } else {
      // This renders the first load when there is not map params
      setActiveTab(maps[0]);
      onSelect(maps[0]);
    }
  }, [maps, mapName]);

  function handleTabClick(tab) {
    setActiveTab(tab);
    onSelect(tab);
  }

  // Update the title whenever the gameSelected state changes
  useEffect(() => {
    if (activeTab) {
      document.title = `Youstrat - ${activeTab.mapName} lineups`;
    } else {
      document.title = 'Youstrat';
    }
  }, [activeTab]);

  return (
    <div className="flex space-x-2 flex-wrap-reverse justify-center">
      {maps.map((map) => (
        <Link to={`/${gameName}/${map.mapName}`}>
          <div
            key={map.mapId}
            onClick={() => handleTabClick(map)}
            className={`cursor-pointer px-4 py-2 rounded-md mb-2 text-lg font-semibold ${
              mapName === map.mapName ? 'bg-gray-800 text-white' : 'bg-gray-300'
            }`}
          >
            {map.mapName}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
