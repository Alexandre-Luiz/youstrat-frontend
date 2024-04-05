// Footer.js
import React from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <footer className="bg-[#818387;] text-white p-4 h-20 flex items-center text-center">
      <div className="container mx-auto ">
        <button>
          <a
            href="https://www.youtube.com/@YouStrat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center my-2"
          >
            <YouTubeIcon style={{ fontSize: 36, color: 'red' }} /> Subscribe
          </a>
        </button>

        <p className="text-sm mb-3">
          {new Date().getFullYear()} <strong>YouStrat</strong> ©. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
