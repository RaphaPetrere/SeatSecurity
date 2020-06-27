import React from 'react';
import './index.scss';
import ProfilePicture from '../../assets/lulu.png';
import TravelIcon from '../../assets/train.png';
import CalendarIcon from '../../assets/clock.png';
import NotebookIcon from '../../assets/notebook.png';
import { Link } from 'react-router-dom'

function MainPage() {
let user = JSON.parse(localStorage.getItem('user'));
let params = new URLSearchParams(document.location.search.substring(1));
let tipo = params.get("tipo");
  return (
    <div className="main-page">
        <header className="main-header">
            <div className="main-header-content">
                <Link to="/account" className="main-header-logo--container">
                    <img src={ProfilePicture} className="main-profile-picture" alt="perfil" /> 
                </Link>
                {user ? 
                <span className="main-header-welcome" style={{fontSize:16, marginLeft:'60px'}}>Olá {user.nome}!</span>
                :
                <span className="main-header-welcome" style={{fontSize:16, marginLeft:'60px'}}>Bem vind@!</span>
                }
            </div>
        </header>
        <div className="main-page-content">
            {!user ? 
                <>
                {tipo === "usuario" ? 
                <div className="main-btn-container">
                    <div className="main-btn-content">
                        <a href="/travel" className="main-btn--travel">Realizar uma viagem</a>
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
                : 
                <div className="main-btn-container">
                    <div className="main-btn-content">
                        <a href="/report" className="main-btn--last-trips">Solicitar Relatório</a>
                        <img src={NotebookIcon} className="main-notebook--icon" alt="solicitar relatório" />  
                    </div>
                </div>
                }
                </>
            :
                <>
                {user.tipo === "usuario" ? 
                <div className="main-btn-container">
                    <div className="main-btn-content">
                        <a href="/travel" className="main-btn--travel">Realizar uma viagem</a>
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
                : 
                <div className="main-btn-container">
                    <div className="main-btn-content">
                        <a href="/report" className="main-btn--last-trips">Solicitar Relatório</a>
                        <img src={NotebookIcon} className="main-notebook--icon" alt="solicitar relatório" />  
                    </div>
                </div>
                }
                </>
            }
        </div>
        <footer className="main-footer">
            <div className="main-footer-content">
                <div className="main-footer-container">
                    <span className="main-footer--text">SeatSecurity</span>
                    <span className="main-footer--copyright">Em caso de dúvidas ou problemas:</span>
                    <span className="main-footer--copyright">seatsecurity@gmail.com</span>
                </div>
            </div>
        </footer>
    </div>
  );
}

export default MainPage;
