import React, {useState} from 'react';
import './index.scss';
import logo from '../../assets/cadeadoBrancoFechado.png';
import TheaterLogo from '../../assets/Theater.png';
import MuseumLogo from '../../assets/museum.png';
import AirportLogo from '../../assets/airplane.png';
import TrainIcon from '../../assets/train.png';
import { useForm } from "react-hook-form";
import { FiArrowLeft } from 'react-icons/fi'; 

 // tem que fazer verificação nos botões, se nao houve digitado nada na origem, n pode prosseguir


// function TravelForm() {
  // const [ origin, setOrigin ] = useState('');

  // const history = useHistory(); //ele serve pra fazer a navegação através de uma função JS

  // async function handleTravel(e) {
  //   e.preventDefault();

  //   try {
  //     const response = await api.post('travel', { origin});
  //     if(response.data.codigo !== 200 && response.data.codigo !== undefined)
  //     {
  //       alert(response.data.error)
  //       return;
  //     }
      
  //     history.push('/'); //aqui ele redireciona pra tela principal
  //     console.log(response.data);
  //     localStorage.setItem('user', JSON.stringify(response.data))
  //     alert(`Bem vindo ${response.data.nome}`);
  //   } catch (err) {
  //     alert('Falha no envio, tente novamente!');
  //   }
  // }
// const { register, errors } = useForm();
//       return (
//         <form>
//           <label className="travel-label-container">
//             <label className="travel-label">Digite a origem:</label>
//             <input name="origin" className="travel-label--input" type="text" ref={register({ required: true })} value={origin} onChange={e => setOrigin(e.target.value)} />
//             {errors.origin && <span className="travel-label-error">Campo Obrigatório</span>}
//           </label>
//         </form>
//       );
// }

function TravelPage() {
  const [ origin, setOrigin ] = useState('');
  const { register, errors } = useForm();
  localStorage.removeItem('dadosViagem');
  return (
    <form>
      <div className="travel-page">
          <header className="travel-header">
              <div className="travel-header-content">
                  <a href="/home" className="travel-header-back">
                      <FiArrowLeft size={32} color="white" />
                  </a>
                  <div className="travel-header-logo--container">
                      <img src={logo} className="travel-logo" alt="logo" /> 
                      <span>/ Realizar Viagem</span>
                  </div>
              </div>
          </header>
          <div className="travel-page-content">
              <div className="travel-input-container">
                <label className="travel-label-container">
                  <label className="travel-label">Digite a origem:</label>
                  <input name="origin" className="travel-label--input" type="text" ref={register({ required: true })} value={origin} onChange={e => setOrigin(e.target.value)} />
                  {errors.origin && <span className="travel-label-error">Campo Obrigatório</span>}
                </label>
              </div>
              <div className="travel-destination-container">
                  <span className="travel-destination-text">Escolha o destino:</span>
              </div>
              <div className="travel-btn-container">
                  <div className="travel-btn-content">
                      {origin.length === 0 ? 
                      <span className="travel-btn--destination">Teatro</span>                      
                      :
                      <a href={`/travel/first-step?tipo=Teatro&origem=${origin}`} className="travel-btn--destination">Teatro</a>
                      }
                      <img src={TheaterLogo} className="travel--icon" alt="teatro" /> 
                  </div>
                  <div className="travel-btn-content">
                      {origin.length === 0 ? 
                      <span className="travel-btn--destination">Aeroporto</span>
                      :
                      <a href={`/travel/first-step?tipo=Aeroporto&origem=${origin}`} className="travel-btn--destination">Aeroporto</a>
                      }
                      <img src={AirportLogo} className="travel--icon" alt="aeroporto" /> 
                  </div>
                  <div className="travel-btn-content">
                      {origin.length === 0 ? 
                      <span className="travel-btn--destination">Museu</span>
                      :
                      <a href={`/travel/first-step?tipo=Museu&origem=${origin}`} className="travel-btn--destination">Museu</a>                      
                      }
                      <img src={MuseumLogo} className="travel--icon" alt="museu" /> 
                  </div>
                  <div className="travel-btn-content">
                      {origin.length === 0 ? 
                      <span className="travel-btn--destination">Terminal</span>
                      :
                      <a href={`/travel/first-step?tipo=Terminal&origem=${origin}`} className="travel-btn--destination">Terminal</a>                      
                      }
                      <img src={TrainIcon} className="travel--icon" alt="terminal" /> 
                  </div>
              </div>
          </div>
          <footer className="travel-footer">
              <div className="travel-footer-content">
                  <div className="travel-footer-container">
                      <span className="travel-footer--text">SeatSecurity</span>
                      <span className="travel-footer--copyright">Em caso de dúvidas ou problemas:</span>
                      <span className="travel-footer--copyright">seatsecurity@gmail.com</span>
                  </div>
              </div>
          </footer>
      </div>
    </form>
  );
}

export default TravelPage;
