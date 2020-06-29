import React from 'react';
import api from '../../../services/api';
import './index.scss';  
import Logo from '../../../assets/cadeadoBrancoFechado.png';
import PeopleImage from '../../../assets/user.png';
import CalendarImage from '../../../assets/iconfinder_calendar.png';
import LocationImage from '../../../assets/location.png';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; 

//https://www.npmjs.com/package/qrcode.react doc do qrcode, valor tem que ser dinamico

// var QRCode = require('qrcode.react');

function SeeDetails() {
  const history = useHistory();
  let params = new URLSearchParams(document.location.search.substring(1));
  let viagemId = params.get("viagemId"); 
    console.log("viagemId", viagemId)
    let viagem = JSON.parse(localStorage.getItem('viagem'));


    async function handleCancelTrip() {
      try {
          await api.delete(`viagens/${viagem.viagemId}`);
  
          alert("Viagem cancelada com sucesso!");
          history.push('/booked-trips');
      } catch(err) {
          alert("Erro ao cancelar viagem, tente novamente!");
      }
    }

    async function handleSendMail() {
      console.log(viagem.viagemId);
      let viagemId = viagem.viagemId.toString();
      try {
          await api.post('passagem', {viagemId});
  
          alert("Email enviado com sucesso");
      } catch(err) {
          alert("Erro ao enviar email, tente novamente!");
      }
    }

    return (
      <div className="details-page">
          <header className="details-header">
              <div className="details-header-content">
                  <a href="/booked-trips" className="details-header-back">
                    <FiArrowLeft size={32} color="white" />
                  </a>
                  <div className="details-header-logo--container">
                      <img src={Logo} className="details-logo" alt="logo" /> 
                      <span>/ Detalhes da viagem</span>
                  </div>
              </div>
          </header>
          <table className="details-table">
            <thead>
              <tr className="details-table-header">
                  <td className="details-table-line">
                    <img src={CalendarImage} className="details-table-date" alt="date" /> 
                      
                  </td>
                  <td className="details-table-line">
                    <img src={LocationImage} className="details-table-location" alt="location" /> 
                  </td>
                  <td className="details-table-line">
                    <img src={PeopleImage} className="details-table-passengers--number" alt="passengers quantity" /> 
                    
                  </td>
                  <td className="details-table-line">
                      <span className="details-table-price">R$*</span>
                  </td>
              </tr>
            </thead>
              
            <tbody>
              <tr className="details-table-content">
                <td className="details-table-line-2">
                  <span style={{fontSize:14}}>{viagem.data}</span>
                </td>
                <td className="details-table-line-2">
                  <span style={{fontSize:14}}>{viagem.destino}</span>
                </td>
                <td className="details-table-line-2">
                  <span style={{fontSize:14}}>{viagem.qtdPessoas}</span>
                </td>
                <td className="details-table-line-2">
                  <span style={{fontSize:14}}>{viagem.preco}</span>
                </td>
              </tr>
            </tbody>

            </table>
            <span style={{fontSize:"12px"}}>*Valor estimado</span>
            {/* <div className="details-QR-container">
                <div className="details-QR-container">
                    <QRCode value="http://facebook.github.io/react/" />
                </div>
                <div className="details-QR-text">
                    <span>Seu Código QR que serve como passagem.</span>
                </div>
            </div> */}
            <div className="details-button-container">
                <div className="details-btn">
                    <button onClick={handleCancelTrip}>Cancelar viagem</button>
                </div>
                <div className="details-btn">
                    <button onClick={handleSendMail}>Enviar por email</button>
                </div>
            </div>
      </div>
    );
  }
  
  export default SeeDetails;
  