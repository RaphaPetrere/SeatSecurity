import React from 'react';
// import logo from '././logo.svg';
import './index.scss';
import logo from '../../assets/cadeadoBrancoFechado.png';

function LoadingPage() {
  return (
    <div className="loading-page">
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <div className="loading-logo-container">
        <img src={logo} className="loading-logo" alt="logo" />
        </div>
        <span className="loading-text">
          Loading
        </span>
    </div>
  );
}

export default LoadingPage;
