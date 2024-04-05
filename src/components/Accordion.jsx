// Accordion.jsx
import React, { useEffect, useState } from 'react';

const Accordion = ({ accordionItems, onSelect }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [strategyTypes, setStrategyTypes] = useState([]);

  // Get array of unique types from the strategies array
  useEffect(() => {
    const types = accordionItems.reduce((result, item) => {
      if (!result.includes(item.type)) {
        result.push(item.type);
      }
      return result;
    }, []);
    // Sort the types alphabetically
    const sortedTypes = types.sort((a, b) => a.localeCompare(b));
    setStrategyTypes(sortedTypes);
  }, [accordionItems]);

  function handleItemClick(item) {
    setActiveItem(activeItem === item ? null : item);
    setActiveSubItem(null);
  }

  function handleSubItemClick(subItem) {
    setActiveSubItem(subItem);
    onSelect(subItem);
  }

  // Update the title whenever the gameSelected state changes
  useEffect(() => {
    if (activeSubItem) {
      document.title = ` ${activeSubItem.map.mapName} - ${activeSubItem.stratName}`;
    } else {
      document.title = 'Youstrat';
    }
  }, [activeSubItem]);

  return (
    <div className="w-1/5 mr-2 ">
      {strategyTypes.map((type) => (
        <div className="mb-2" key={type}>
          <div
            onClick={() => handleItemClick(type)}
            className={`cursor-pointer text-lg px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white text-center hover:scale-105 hover:ease-in-out duration-300 ${
              activeItem === type ? 'bg-gray-800 text-white font-semibold' : 'bg-gray-300'
            }`}
          >
            {type}
          </div>

          {activeItem === type && (
            <div className="ml-2">
              {accordionItems
                .filter((item) => item.type === type)
                .map((subItem) => (
                  <div
                    key={subItem.stratId}
                    onClick={() => handleSubItemClick(subItem)}
                    className={`cursor-pointer px-2 py-2 rounded-md mt-1 text-sm hover:scale-105 hover:ease-in-out duration-300 hover:font-semibold ${
                      activeSubItem === subItem ? 'bg-gray-800 text-white' : 'bg-gray-300'
                    }`}
                  >
                    {subItem.stratName}
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
