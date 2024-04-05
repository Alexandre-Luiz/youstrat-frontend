import axios from 'axios';

// ---------------- Games endpoints --------------------

export async function apiGetAllGames() {
  // const { data } = await axios.get(`http://localhost:3001/game`);
  const { data } = await axios.get(`https://youstrat-ef5483145ceb.herokuapp.com/game`);
  return data;
}
export async function apiGetAllMaps() {
  // const { data } = await axios.get(`http://localhost:3001/map`);
  const { data } = await axios.get(`https://youstrat-ef5483145ceb.herokuapp.com/map`);
  return data;
}

export async function apiGetMapsByGame(game) {
  // const { data } = await axios.get(`http://localhost:3001/map?game=${game}`);
  const { data } = await axios.get(`https://youstrat-ef5483145ceb.herokuapp.com/map?game=${game}`);
  return data;
}

export async function apiGetGameStrategies(game) {
  // const { data } = await axios.get(`http://localhost:3001/strategies/${game}`);
  const { data } = await axios.get(
    `https://youstrat-ef5483145ceb.herokuapp.com/strategies/${game}`
  );
  return data;
}

// ---------------- Delete endpoints --------------------
export async function apiDeleteGameById(gameId) {
  // await axios.delete(`http://localhost:3001/game/${gameId}`, {
  await axios.delete(`https://youstrat-ef5483145ceb.herokuapp.com/game/${gameId}`, {
    withCredentials: true,
  });
}
export async function apiDeleteMapById(mapId) {
  // await axios.delete(`http://localhost:3001/map/${mapId}`, {
  await axios.delete(`https://youstrat-ef5483145ceb.herokuapp.com/map/${mapId}`, {
    withCredentials: true,
  });
}
export async function apiDeleteStratById(StratId, gameId) {
  // await axios.delete(`http://localhost:3001/strategies/${StratId}?gameId=${gameId}`, {
  await axios.delete(
    `https://youstrat-ef5483145ceb.herokuapp.com/strategies/${StratId}?gameId=${gameId}`,
    {
      withCredentials: true,
    }
  );
}

// ---------------- Edit endpoints --------------------
export async function apiEditGameById(game) {
  // const { data } = await axios.put(`http://localhost:3001/game`, game, {
  //   withCredentials: true,
  // });
  const { data } = await axios.put(`https://youstrat-ef5483145ceb.herokuapp.com/game`, game, {
    withCredentials: true,
  });
  return data;
}

export async function apiEditMapById(map) {
  // const { data } = await axios.put(`http://localhost:3001/map`, map, {
  //   withCredentials: true,
  // });
  const { data } = await axios.put(`https://youstrat-ef5483145ceb.herokuapp.com/map`, map, {
    withCredentials: true,
  });
  return data;
}

export async function apiEditStratById(strat) {
  // const { data } = await axios.put(`http://localhost:3001/strategies`, strat, {
  //   withCredentials: true,
  // });
  const { data } = await axios.put(
    `https://youstrat-ef5483145ceb.herokuapp.com/strategies`,
    strat,
    {
      withCredentials: true,
    }
  );
  return data;
}

//---------------- New endpoints --------------------

export async function apiNewGame(newGameData) {
  // const { data } = await axios.post(`http://localhost:3001/game`, newGameData, {
  //   withCredentials: true,
  // });
  const { data } = await axios.post(
    `https://youstrat-ef5483145ceb.herokuapp.com/game`,
    newGameData,
    {
      withCredentials: true,
    }
  );
  return data;
}
export async function apiNewMap(newMapData) {
  // const { data } = await axios.post(`http://localhost:3001/map`, newMapData, {
  //   withCredentials: true,
  // });
  const { data } = await axios.post(`https://youstrat-ef5483145ceb.herokuapp.com/map`, newMapData, {
    withCredentials: true,
  });
  return data;
}
export async function apiNewCsStrat(newCsStratData) {
  const { data } = await axios.post(
    `https://youstrat-ef5483145ceb.herokuapp.com/strategies/cs2`,
    newCsStratData,
    {
      withCredentials: true,
    }
  );
  // const { data } = await axios.post(`http://localhost:3001/strategies/cs2`, newCsStratData, {
  //   withCredentials: true,
  // });
  return data;
}

// ---------------- User endpoints --------------------
export async function signInEndpoint(username, password, userTimezone) {
  const { data } = await axios.post(
    // `http://localhost:3001/user/login`,
    `https://youstrat-ef5483145ceb.herokuapp.com/user/login`,
    { username, password, userTimezone },
    {
      withCredentials: true,
    }
  );
  return data;
}

export async function signupEndpoint(username, password) {
  const { data } = await axios.post(
    // `http://localhost:3001/user/signup`,
    `https://youstrat-ef5483145ceb.herokuapp.com/user/signup`,
    { username, password },
    { withCredentials: true }
  );
  return data;
}

export default async function signOutEndpoint() {
  // return axios.post(`http://localhost:3001/user/signout`, {}, { withCredentials: true });
  return axios.post(
    `https://youstrat-ef5483145ceb.herokuapp.com/user/signout`,
    {},
    { withCredentials: true }
  );
}

// Checks if the there is an activated user session
export async function getUserEndpoint() {
  // const { data } = await axios.get(`http://localhost:3001/user/session`, { withCredentials: true });
  const { data } = await axios.get(`https://youstrat-ef5483145ceb.herokuapp.com/user/session`, {
    withCredentials: true,
  });
  return data;
}
