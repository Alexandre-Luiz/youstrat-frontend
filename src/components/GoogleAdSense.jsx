import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import * as dotenv from 'dotenv';
// dotenv.config();

const AdsComponent = (props) => {
  const { dataAdSlot } = props;
  const [adBlockerDetected, setAdBlockerDetected] = useState(false);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  useEffect(() => {
    const adContainer = document.getElementById('google-ad-container');
    // Set a timeout because sometimes it takes a bit for the adblock to check if the page is an exception or not
    setTimeout(() => {
      // Check if the ad container is blocked (height 0) by an ad blocker
      if (adContainer.offsetHeight === 0) {
        setAdBlockerDetected(true);
      } else {
        setAdBlockerDetected(false);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    // Show Toastify message if an ad blocker is detected
    if (adBlockerDetected) {
      toast.error('Please, consider disabling your ad block to support the developer', {
        position: 'top-right',
        autoClose: false, // Set to false to require user interaction
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [adBlockerDetected]);

  return (
    <>
      <ToastContainer />
      <div id="google-ad-container">
        <ins
          class="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={process.env.DATA_AD_CLIENT}
          data-ad-slot={dataAdSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </>
  );
};

export default AdsComponent;
