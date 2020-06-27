import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom'
import ProfilePicture from '../../assets/lulu.png';
import Logo from '../../assets/cadeadoBrancoFechado.png';
import LogoutImage from '../../assets/redExitDoor.png';
import EditProfileImage from '../../assets/engineGear.png';
import FeedbackImage from '../../assets/sketch.png';
import CreditCardImage from '../../assets/creditCard.png';
import { FiArrowLeft } from 'react-icons/fi';

function AccountPage() {
  return (
    <div className="account-page">
        <header className="account-header">
            <div className="account-header-content">
                <Link to="/home" className="account-header-back">
                    <FiArrowLeft size={32} color="white" />
                </Link>
                <div className="account-header-container">
                    <img src={Logo} className="account-logo" alt="logo" /> 
                    <span className="account-header-welcome">/ Atalhos do usuário</span>
                </div>
            </div>
        </header>
        <div className="account-page-content">
            <div className="account-logo-container">
                <img src={ProfilePicture} className="account-profile-picture" alt="perfil" />
            </div>
            <div className="account-btn-container">
                <div className="account-btn-content">
                    <img src={EditProfileImage} className="account-btn-edit-profile--image" alt="edit profile" />
                    <Link to="/edit-profile" className="account-btn-edit-profile">Editar Usuário</Link>
                </div>
                <div className="account-btn-content">
                    <img src={CreditCardImage} className="account-btn-manage-cards--image" alt="manage credit cards" />
                    <Link to="/manage-cards" className="account-btn-manage-cards">Gerenciar Cartões</Link>
                </div>
                <div className="account-btn-content">
                    <img src={FeedbackImage} className="account-btn-feedback--image" alt="give feedback" />
                    <Link to="/feedback" className="account-btn-feedback">Deixar Feedback</Link>
                </div>
                <div className="account-btn-content">
                    <img src={LogoutImage} className="account-btn-logout--image" alt="logout" />
                    <Link to="/" className="account-btn-logout" >Encerrar Sessão</Link>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AccountPage;
