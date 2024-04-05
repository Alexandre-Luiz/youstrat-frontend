import React, { useContext } from 'react';
import UserMenu from './UserMenu';
import { AuthContext } from '../contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({
  children = 'Use the children prop to define a value for the header component',
}) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleDashClick() {
    navigate('/dashboard');
  }

  // function handleLogoClick() {
  //   navigate('/');
  // }

  return (
    <header className="w-full shadow-md shadow-slate-900">
      <div className="bg-[#818387;] flex flex-col justify-between py-4 px-4 w-full flex-wrap items-center sm:flex-row">
        <Link to={'/'}>
          <div
            className="flex flex-row align-middle items-center cursor-pointer ml-20"
            // onClick={handleLogoClick}
          >
            <img
              className="mr-2"
              src={process.env.PUBLIC_URL + '/images/logo.png'}
              style={{ width: 40, height: 'auto', maxHeight: 40 }}
              alt="book-logo"
            />
            <h1 className="text-left font-semibold text-4xl text-white flex items-center">
              {children}
            </h1>
          </div>
        </Link>
        {user && (
          <div className="flex items-center mr-20">
            {user.role === 'admin' ? (
              <button
                onClick={handleDashClick}
                className="bg-slate-800 py-2 px-4 rounded-md text-white "
              >
                Dashboard
              </button>
            ) : (
              ''
            )}
          </div>
        )}
        <div className=" mr-20">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
