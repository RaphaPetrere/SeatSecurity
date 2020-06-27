import React from 'react';
import './index.scss';
import logo from '../../assets/cadeadoRoxoFechado.png';
import {BrowserView, MobileView} from "react-device-detect";

function HomePage() {
  return (
    <>
    <BrowserView>
    <div className="desk-home-page">
      <div className="desk-home-page-content">
        <div className="desk-home-logo-container">
          <img src={logo} className="home-logo" alt="logo" />
          <span>Para uma melhor experiência, acesse pelo celular.</span>
        </div>
      </div>
    </div>
    </BrowserView>
    <MobileView>
    <div className="home-page">
        <div className="home-page-content">
            <div className="home-logo-container">
                <img src={logo} className="home-logo" alt="logo" />
            </div>
            <div className="home-btn-container">
                <a href="/login" className="home-btn--login" onClick={localStorage.removeItem('user')}>Login</a>
                <a href="/signup" className="home-btn--signup">Cadastrar</a>
                <a href="/forgot-password" className="home-forgot-password">Esqueci minha senha</a>
            </div>
        </div>
    </div>
    </MobileView>
    </>
  );
}

export default HomePage;
