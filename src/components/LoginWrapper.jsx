// // LoginWrapper.jsx
// import { useState } from 'react';
// import { signInEndpoint } from '../services/apiService';
// import { useNavigate } from 'react-router-dom';
// import LoginDialog from './LoginDialog';

// export default function LoginWrapper() {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(true);
//   const [loginError, setLoginError] = useState('');
//   // Manage other necessary state or fetch data here

//   console.log('login wrapper called');

//   function handleClose() {
//     console.log('dialog close wrapper');
//     setOpen(false);
//     navigate(-1);
//   }

//   const handleFormSubmit = async (username, password) => {
//     try {
//       const user = await signInEndpoint(username, password);
//     } catch (error) {
//       setLoginError(error.message);
//     }
//   };

//   // const homePageId = document.getElementById('homepage');

//   return (
//     <>
//       {/* <HomePage /> */}
//       {/* {createPortal(
//         <LoginDialog
//           open={open}
//           handleClose={handleClose}
//           handleFormSubmit={handleFormSubmit}
//           loginError={loginError}
//         />,
//         document.body
//       )} */}

//       <LoginDialog
//         open={open}
//         handleClose={handleClose}
//         handleFormSubmit={handleFormSubmit}
//         loginError={loginError}
//       />
//     </>
//   );
// }
