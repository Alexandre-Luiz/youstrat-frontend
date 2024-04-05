// LoginWrapper.jsx
import { useState } from 'react';
import { signInEndpoint } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import LoginDialog from './LoginDialog';
import HomePage from '../pages/HomePage';

export default function LoginWrapper() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [loginError, setLoginError] = useState('');
  // Manage other necessary state or fetch data here

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  const handleFormSubmit = async (username, password) => {
    try {
      const user = await signInEndpoint(username, password);
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <>
      <HomePage />
      <LoginDialog
        open={open}
        handleClose={handleClose}
        handleFormSubmit={handleFormSubmit}
        loginError={loginError}
      />
    </>
  );
}
