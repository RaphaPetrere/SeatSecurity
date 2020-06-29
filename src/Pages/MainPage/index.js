import React from 'react';
import './index.scss';
import ProfilePicture from '../../assets/lulu.png';
import TravelIcon from '../../assets/train.png';
import CalendarIcon from '../../assets/clock.png';
import NotebookIcon from '../../assets/notebook.png';
import LogoutImage from '../../assets/redExitDoor.png';
import { Link } from 'react-router-dom'

function MainPage() {
let user = JSON.parse(localStorage.getItem('user'));
  return user ? (
    <div className="main-page">
        <header className="main-header">
            <div className="main-header-content">
                <Link to="/account" className="main-header-logo--container">
                    <img src={ProfilePicture} className="main-profile-picture" alt="perfil" /> 
                </Link>
                <span className="main-header-welcome" style={{fontSize:16, marginLeft:'60px'}}>Olá {user.nome}!</span>
            </div>
        </header>
        {user.tipo === 'usuario' ? 
            <div className="main-page-content">
                <div className="main-btn-container">
                    <div className="main-btn-content">
                        <a href="/travel" className="main-btn--travel">Agendar uma viagem</a>
                        <img src={TravelIcon} className="main-travel--icon" alt="realizar viagem" /> 
                    </div>
                    <div className="main-btn-content">
                        <a href="/last-trips" className="main-btn--last-trips">Ver ultimas viagens</a>
                        <img src={NotebookIcon} className="main-notebook--icon" alt="ultimas viagens" /> 
                    </div>
                    <div className="main-btn-content">
                        <a href="/booked-trips" className="main-btn--booked-trips">Ver viagens agendadas</a>
                        <img src={CalendarIcon} className="main-clock--icon" alt="viagens agendadas" /> 
                    </div>
                </div>
            </div>
        :
            <div className="main-page-content">
                <div className="main-btn-container">
                    <div className="main-btn-content">
                        <a href="/report" className="main-btn--last-trips">Solicitar Relatório</a>
                        <img src={NotebookIcon} className="main-notebook--icon" alt="solicitar relatório" />  
                    </div>
                </div>
            </div>
        }
        <footer className="main-footer">
            <div className="main-footer-content">
                <div className="main-footer-container">
                    <span className="main-footer--text">SeatSecurity</span>
                    <span className="main-footer--copyright">Em caso de dúvidas ou problemas:</span>
                    <span className="main-footer--copyright">contatoseats@gmail.com</span>
                </div>
            </div>
        </footer>
    </div>
  ) : (
    <div className="main-page">
        <header className="main-header">
            <div className="main-header-content">
                <div className="main-header-logo--container">
                    <img src={ProfilePicture} className="main-profile-picture" alt="perfil" /> 
                    <span className="main-header-welcome" style={{fontSize:16, marginLeft:'60px'}}>Bem vind@!</span>
                </div>
            </div>
        </header>
        <div className="main-page-content">
            <div className="main-btn-container">
                <span>Se cadastre para poder utilizar a aplicação!</span>
                <div className="main-btn-logout-content">
                    <img src={LogoutImage} className="main-btn-logout-content-button--image" alt="logout" />
                    <Link to="/" className="main-btn-logout-content-button" >Encerrar Sessão</Link>
                </div>
            </div>
        </div>
        <footer className="main-footer">
            <div className="main-footer-content">
                <div className="main-footer-container">
                    <span className="main-footer--text">SeatSecurity</span>
                    <span className="main-footer--copyright">Em caso de dúvidas ou problemas:</span>
                    <span className="main-footer--copyright">contatoseats@gmail.com</span>
                </div>
            </div>
        </footer>
    </div>
  );
}

export default MainPage;
