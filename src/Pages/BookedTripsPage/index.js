import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import './index.scss';  
import Logo from '../../assets/cadeadoBrancoFechado.png';
import { FiArrowLeft } from 'react-icons/fi'; 

function BookedTripsPage() {
    const [viagens, setViagens] = useState([]);
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user.userId;
    console.log("UserId", userId)

    useEffect(() => {
      api.get('viagens', {
        headers : {
          Authorization : userId,
        }
      }).then(response => {
        setViagens(response.data);
        console.log(response.data);
      })
    }, [userId]);

    function setaViagem(viagem){
      console.log("Viagem: ", viagem);
      localStorage.setItem('viagem', JSON.stringify(viagem))
    }

    return (
      <div className="booked-trips-page">
          <header className="booked-trips-header">
              <div className="booked-trips-header-content">
                  <a href="/home" className="booked-trips-header-back">
                    <FiArrowLeft size={32} color="white" />
                  </a>
                  <div className="booked-trips-header-logo--container">
                      <img src={Logo} className="booked-trips-logo" alt="logo" /> 
                      <span>/ Viagens agendadas</span>
                  </div>
              </div>
          </header>
          <div className="booked-trips-page-content">
            <div className="booked-trips-page-content-title">
                <span>Veja aqui suas futuras viagens:</span>
            </div>
            {viagens.length ? viagens.map(viagem => (
                        <div className="booked-trips--trip" key={viagem.viagemId}>
                            <div className="booked-trips-date-container">
                                <span className="booked-trips--date">{viagem.data}</span>
                                <span className="booked-trips--hours">{viagem.hora}</span>
                            </div>
                            <span className="booked-trips--street">{viagem.destino}</span>
                            <div className="booked-trips-see-details">
                              <a href={`/booked-trips/see-details?viagemId=${viagem.viagemId}`} className="booked-trips-see-details--button" onClick={() => setaViagem(viagem)}>Ver detalhes</a>
                            </div>
                        </div>
                )):<div>
                    <strong>Nenhuma Viagem encontrada</strong>
                  </div>} 
                {/* <div className="booked-trips-date-container">
                    <span className="booked-trips--date">08/06/2020</span>
                    <span className="booked-trips--hours">12:00</span>
                </div>
                <span className="booked-trips--street">Rua KARD, 13</span>
                <div className="booked-trips-see-details">
                    <a href="/booked-trips/see-details" className="booked-trips-see-details--button">Ver detalhes</a>
                </div> */}
            {/* <div className="booked-trips--trip">
                <div className="booked-trips-date-container">
                    <span className="booked-trips--date">08/06/2020</span>
                    <span className="booked-trips--hours">12:00</span>
                </div>
                <span className="booked-trips--street">Rua KARD, 13</span>
                <div className="booked-trips-see-details">
                    <button className="booked-trips-see-details--button">Ver detalhes</button>
                </div>
            </div> */}
          </div>
      </div>
    );
  }
  
  export default BookedTripsPage;
  