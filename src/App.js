import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserEndpoint } from './services/apiService';
import { AuthContext } from './contexts/authContext';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import LoginDialog from './components/LoginDialog';
import LoginWrapper from './components/LoginWrapper';

export default function App() {
  const [user, setUser] = useState(null);

  // const navigate = useNavigate();
  useEffect(() => {
    (async function getUser() {
      try {
        const userData = await getUserEndpoint();
        setUser(userData);
      } catch (error) {
        setUser(null);
      }
    })();
  }, []);

  function onSignIn(updatedUser) {
    setUser(updatedUser);
  }

  function onSignOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, onSignIn, onSignOut }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path=":gameName" element={<HomePage />}>
              <Route path=":mapName" element={<HomePage />} />
            </Route>
          </Route>
          {user ? <Route path="/user/:userId" element={<HomePage />} /> : null}
          <Route path="/user/login" element={<LoginWrapper />} />
          {/* <Route
            path="/user/login"
            element={<LoginDialog open={openLoginDialog} handleClose={closeLoginDialog} />}
          /> */}
          {/* <Route path="/user/login" element={<HomePage />} /> */}
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
