// React
import { useContext, useState } from 'react';
// Backend
import signOutEndpoint from '../services/apiService';
// Context
import { AuthContext } from '../contexts/authContext';
// Component
import LoginDialog from '../components/LoginDialog';
// react-router-dom
import { Link, useNavigate } from 'react-router-dom';
// Material-ui
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import PowerIcon from '@mui/icons-material/PowerSettingsNew';
import Button from '@mui/material/Button';

export default function UserMenu() {
  const navigate = useNavigate();
  const { user, onSignOut } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  // If no user is logged in
  function handleLoginButtonClick() {
    setOpen(true);
    navigate('/user/login');
  }
  function handleLoginDialogClose() {
    setOpen(false);
    setAnchorEl(null);
    navigate('/');
  }

  // If user is logged in
  function handleUserMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function HandleUserMenuClose() {
    setAnchorEl(null);
  }

  function signOut() {
    signOutEndpoint();
    onSignOut();
    navigate('/');
  }

  return (
    <>
      {user ? (
        <div className="">
          <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleUserMenuOpen}>
            <Avatar className="items-center" sx={{ width: 34, height: 34 }}>
              <PersonIcon />
            </Avatar>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={HandleUserMenuClose}
          >
            <div className="flex flex-col justify-center items-center px-3">
              <Avatar sx={{ width: 25, height: 25, marginTop: '10px', marginBottom: '5px' }}>
                <PersonIcon />
              </Avatar>
              {/* Access via context */}
              <small>{user.username}</small>
            </div>
            <MenuItem onClick={signOut}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <div className="">
          <Button
            variant="contained"
            className="flex flex-row justify-between shadow-lg"
            startIcon={<PowerIcon />}
            size="large"
            style={{ backgroundColor: 'ThreeDDarkShadow' }}
            onClick={handleLoginButtonClick}
          >
            Sign In
          </Button>
          <LoginDialog open={open} handleClose={handleLoginDialogClose} />
        </div>
      )}
    </>
  );
}
