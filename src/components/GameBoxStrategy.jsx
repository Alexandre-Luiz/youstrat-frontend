import React, { useEffect, useState } from 'react';
import Accordion from './Accordion';
import Tabs from './Tabs';
import VideoPlayer from './VideoPlayer';
import Loading from './Loading';

const GameBoxStrategy = ({ maps, gameStrats }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define a "default" strategy for each tab while user does not select one
  useEffect(() => {
    if (activeTab) {
      const strategiesOfActiveTab = gameStrats.filter(
        (strat) => strat.map.mapId === activeTab.mapId
      );
      if (strategiesOfActiveTab.length > 0) {
        setActiveItem(strategiesOfActiveTab[0]);
      } else {
        setActiveItem(null);
      }
    }
  }, [activeTab, gameStrats]);

  function handleTabSelect(mapTab) {
    setActiveTab(mapTab);
    // Reset player and description when user change tabs
    setActiveItem(null);
  }

  function handleAccordionSelect(accordionItem) {
    setActiveItem(accordionItem);
  }

  useEffect(() => {
    if (activeItem && activeItem.videoUrl) {
      setLoading(true); // Start loading animation when a new item is selected
    }
  }, [activeItem]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [activeItem]);

  return (
    <div className="w-10/12 h-full flex justify-center items-center">
      <div className="flex flex-col justify-between h-full w-10/12 py-5 " id="">
        <div className="flex justify-center">
          <Tabs onSelect={handleTabSelect} maps={maps} />
        </div>

        <div
          className="flex items-center h-full p-2 overflow-y-auto rounded-md bg-gray-400 border"
          id="accordion"
        >
          <Accordion
            accordionItems={gameStrats.filter((strat) => strat.map.mapId === activeTab?.mapId)}
            onSelect={handleAccordionSelect}
          />
          <div className="flex flex-col w-full h-full items-center ">
            {activeItem && activeItem.videoUrl && (
              <div className="flex justify-center w-full h-5/6">
                {loading ? <Loading /> : <VideoPlayer videoUrl={activeItem.videoUrl} />}
              </div>
            )}
            {activeItem && activeItem.videoUrl && (
              <div className="flex justify-center w-full text-lg mt-10 py-5 px-2 border-solid border-1 shadow-xl bg-gray-800 rounded-md text-white text-center">
                {activeItem.description}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoxStrategy;
// aaaa
