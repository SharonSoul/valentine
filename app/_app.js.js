// pages/_app.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store'; // Adjust the path based on your project structure
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div id="__next"> {/* Ensure this div with the id #__next is present */}
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;