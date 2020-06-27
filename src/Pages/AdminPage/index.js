import React from 'react';
import './index.scss';
import NotebookIcon from '../../assets/notebook.png';
import LogoutImage from '../../assets/redExitDoor.png';
import { Link } from 'react-router-dom'

function AdminPage() {
  return (
    <div className="admin-page">
        <header className="admin-header">
            <div className="admin-header-content">
                <span className="admin-header-welcome">Bem Vindo!</span>
            </div>
        </header>
        <div className="admin-page-content">
            <div className="admin-btn-container">
                <div className="admin-btn-content">
                    <a href="/report" className="admin-btn--report">Solicitar Relatório</a>
                    <img src={NotebookIcon} className="admin-report--icon" alt="solicitar relatório" /> 
                </div>
                <div className="admin-btn-content">
                    <img src={LogoutImage} className="admin-logout--image" alt="logout" />
                    <Link to="/" className="admin-btn--logout" onClick={localStorage.removeItem('userId')}>Encerrar Sessão</Link>
                </div>
            </div>
        </div>
        <footer className="admin-footer">
            <div className="admin-footer-content">
                <div className="admin-footer-container">
                    <span className="admin-footer--text">SeatSecurity</span>
                    <span className="admin-footer--copyright">Todos os direitos reservados.</span>
                </div>
            </div>
        </footer>
    </div>
  );
}

export default AdminPage;
