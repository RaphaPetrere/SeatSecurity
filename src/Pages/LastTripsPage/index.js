import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import './index.scss';  
import Logo from '../../assets/cadeadoBrancoFechado.png';
import PeopleImage from '../../assets/user.png';
import CalendarImage from '../../assets/iconfinder_calendar.png';
import LocationImage from '../../assets/location.png';
import { FiArrowLeft } from 'react-icons/fi'; 

function LastTripsPage() {
    const [viagens, setViagens] = useState([]);
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user.userId;
    console.log("UserId", userId)

    useEffect(() => {
      api.post('ultimasViagens', {
        userId
      }).then(response => {
        setViagens(response.data);
        console.log(response.data);
      })
    }, [userId]);
    return (
      <div className="last-trips-page">
        <header className="last-trips-header">
            <div className="last-trips-header-content">
                <a href="/home" className="last-trips-header-back">
                  <FiArrowLeft size={32} color="white" />
                </a>
                <div className="last-trips-header-logo--container">
                    <img src={Logo} className="last-trips-logo" alt="logo" /> 
                    <span>/ Ultimas viagens</span>
                </div>
            </div>
        </header>
        {viagens.length ? 
          <>
          <table className="last-trips-table">
            <thead>
              <tr className="last-trips-table-header">
                  <td className="last-trips-table-line">
                    <img src={CalendarImage} className="last-trips-table-date" alt="date" /> 
                      
                  </td>
                  <td className="last-trips-table-line">
                    <img src={LocationImage} className="last-trips-table-location" alt="location" /> 
                  </td>
                  <td className="last-trips-table-line">
                    <img src={PeopleImage} className="last-trips-table-passengers--number" alt="passengers quantity" /> 
                    
                  </td>
                  <td className="last-trips-table-line">
                      <span className="last-trips-table-price">R$*</span>
                  </td>
              </tr>
            </thead>
            <tbody>
              {viagens.map(viagem => (
                                  <tr key={viagem.viagemId}>
                                    <td className="last-trips-table-line-2">
                                      <span style={{fontSize:14}}>{viagem.data}</span>
                                    </td>
                                    <td className="last-trips-table-line-2">
                                      <span style={{fontSize:14}}>{viagem.destino}</span>
                                    </td>
                                    <td className="last-trips-table-line-2">
                                      <span style={{fontSize:14}}>{viagem.qtdPessoas}</span>
                                    </td>
                                    <td className="last-trips-table-line-2">
                                      <span style={{fontSize:14}}>{viagem.preco}</span>
                                    </td>
                                  </tr>
                ))}    
              {/* Aqui que vem o map */}
            </tbody>
          </table>
          <span style={{fontSize:"12px"}}>*Valor estimado</span>
          </>
        : 
          <strong style={{marginTop : "20%"}}>{viagens.error}</strong>
        }
      </div>
    );
  }
  
  export default LastTripsPage;
  