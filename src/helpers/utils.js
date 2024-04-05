// Sort the array of map objects so it render the tabs on alphabetically order
export function sortMapsArray(mapsArray) {
  return mapsArray.sort((a, b) => {
    const mapNameA = a.mapName.toUpperCase();
    const mapNameB = b.mapName.toUpperCase();

    if (mapNameA < mapNameB) {
      return -1;
    }
    if (mapNameA > mapNameB) {
      return 1;
    }

    return 0;
  });
}
