import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import moment from 'moment-timezone';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../contexts/authContext';
import { signInEndpoint } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ open, handleClose }) {
  const { onSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  // States
  const [formErrors, setFormErrors] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Clearing the error object when the login dialog is closed
  useEffect(() => {
    setFormErrors({});
    setLoginError('');
  }, [handleClose]);

  function clearFields() {
    setUsername('');
    setPassword('');
  }

  function validate() {
    const currentErrors = {};
    if (!username) {
      currentErrors['userMissing'] = 'Username is required';
    }
    if (!password) {
      currentErrors['passwordMissing'] = 'Password is required';
    }
    setFormErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  }

  async function handleFormSubmit(evt) {
    evt.preventDefault();
    try {
      // The timezone is needed to lockout when exceeding the login attempt limit
      const userTimezone = moment.tz.guess(true);
      const user = await signInEndpoint(username, password, userTimezone);
      if (validate()) {
        if (user) {
          onSignIn(user);
          handleClose();
          navigate(`/user/${user.userId}`);
        }
      }
      clearFields();
      setFormErrors({});
    } catch (error) {
      setLoginError(error.response.data.message);
    }
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>Login</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            onChange={(evt) => {
              setUsername(evt.target.value);
            }}
            value={username}
            error={!!formErrors.userMissing}
            helperText={formErrors.userMissing}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
            value={password}
            error={!!formErrors.passwordMissing}
            helperText={formErrors.passwordMissing}
          />
        </DialogContent>
        <div>{loginError && <p className="text-red-500 text-center">{loginError}</p>}</div>
        <DialogActions>
          <Button type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              if (validate() && loginError === null) {
                handleClose();
              }
            }}
          >
            Login
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
