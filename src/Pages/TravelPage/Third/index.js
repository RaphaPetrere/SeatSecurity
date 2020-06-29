import React, {useState} from 'react';
// import api from '../../../services/api';
import './index.scss';
import logo from '../../../assets/cadeadoBrancoFechado.png';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi'; 

 // tem que fazer verificação nos botões, se nao houve digitado nada na origem, n pode prosseguir


// function TravelForm() {
//   const [ origin, setOrigin ] = useState('');
//   const [ destination, setDestination ] = useState('');
//   const [ date, setDate ] = useState('');
//   const [ qtdPessoas, setPeople ] = useState('');

//   const history = useHistory(); //ele serve pra fazer a navegação através de uma função JS

//   async function handleTravel(e) {
//     e.preventDefault();

//     try {
//       const response = await api.post('travel', { origin, destination});
//       if(response.data.codigo !== 200 && response.data.codigo !== undefined)
//       {
//         alert(response.data.error)
//         return;
//       }
      
//       history.push('/'); //aqui ele redireciona pra tela principal
//       console.log(response.data);
//       localStorage.setItem('user', JSON.stringify(response.data))
//       alert(`Bem vindo ${response.data.nome}`);
//     } catch (err) {
//       alert('Falha no envio, tente novamente!');
//     }
//   }
// const { register, errors } = useForm();
// let dadosViagem = JSON.parse(localStorage.getItem('dadosViagem'));
//       return (
//         <form onSubmit={handleTravel}>
//           <label className="third-step-label-container">
//             <label className="third-step-label">Digite a origem:</label>
//             <input name="origin" className="third-step-label--input" type="text" ref={register({ required: true })} value={dadosViagem.origem} onChange={e => setOrigin(e.target.value)} />
//             {errors.origin && <span className="third-step-label-error">Campo Obrigatório</span>}

//             <label className="third-step-label">Escolha o destino:</label>
//             <input name="destination" className="third-step-label--input" type="text" ref={register({ required: true })} value={dadosViagem.destino} onChange={e => setDestination(e.target.value)} />
//             {errors.destination && <span className="third-step-label-error">Campo Obrigatório</span>}

//             <label className="third-step-label">Escolha data e horário:</label>
//             <input name="date" className="third-step-label--input" type="text" ref={register({ required: true })} value={dadosViagem.data} onChange={e => setDate(e.target.value)} />
//             {errors.date && <span className="third-step-label-error">Campo Obrigatório</span>}

//             <label className="third-step-label">Quantas pessoas vão?</label>
//             <input name="qtdPessoas" className="third-step-label--input" type="text" ref={register({ required: true })} value={qtdPessoas} onChange={e => setPeople(e.target.value)} />
//             {errors.qtdPessoas && <span className="third-step-label-error">Campo Obrigatório</span>}
//           </label>
//         </form>
//       );
// }

function TravelPage() {

  const [ hora, setHora ] = useState('');
  const [ qtdPessoas, setPeople ] = useState('');
  let dadosViagem = JSON.parse(localStorage.getItem('dadosViagem'));

  const history = useHistory(); //ele serve pra fazer a navegação através de uma função JS

  async function handleTravel(e) {
    e.preventDefault();

    dadosViagem.preco = dadosViagem.preco + (qtdPessoas * 10);
    dadosViagem.qtdPessoas = qtdPessoas;
    dadosViagem.hora = hora;
    localStorage.setItem('dadosViagem', JSON.stringify(dadosViagem));
    console.log("Dados: ", dadosViagem)

    // console.log("UserId", userId)
    // console.log(qtdPessoas.length);
    // console.log(hora.length);
    if(qtdPessoas === "" || hora.length !== 5)
    {
      alert("Preencha os campos de forma correta!");
    }
    else
    {
      history.push('/travel/third-step/card-pick');
    }
    // try {
    //   const response = await api.post('viagens', { dadosViagem, userId });
    //   if(response.data.codigo !== 200 && response.data.codigo !== undefined)
    //   {
    //     alert(response.data.error)
    //     return;
    //   }
      
    //   history.push('/home'); //aqui ele redireciona pra tela principal
    //   console.log(response.data);
    //   alert(`Viagem para ${dadosViagem.destino} realizada com sucesso!`);
    // } catch (err) {
    //   alert('Falha no registro, tente novamente!');
    // }
  }

  const { register, errors } = useForm();
  return (
    <div className="third-step-page">
        <header className="third-step-header">
            <div className="third-step-header-content">
                <a href="/travel/second-step" className="third-step-header-back">
                  <FiArrowLeft size={32} color="white" />
                </a>
                <div className="third-step-header-logo--container">
                    <img src={logo} className="third-step-logo" alt="logo" /> 
                    <span>/ Agendar Viagem</span>
                </div>
            </div>
        </header>
        <div className="third-step-page-content">
            <div className="third-step-confirmation-container">
              <span className="third-step-confirmation-text">
                  Confirme seus dados antes de efetuar a reserva.
              </span>
            </div>
            <div className="third-step-input-container">
              <form onSubmit={handleTravel}>
                <label className="third-step-label-container">
                  <label className="third-step-label">Digite a origem:</label>
                  <input name="origin" className="third-step-label--input" type="text" ref={register({ required: true })} value={dadosViagem.origem} />
                  {errors.origin && <span className="third-step-label-error">Campo Obrigatório</span>}

                  <label className="third-step-label">Escolha o destino:</label>
                  <input name="destination" className="third-step-label--input" type="text" ref={register({ required: true })} value={dadosViagem.destino} />
                  {errors.destination && <span className="third-step-label-error">Campo Obrigatório</span>}

                  <label className="third-step-label">Escolha data e horário de saída:</label>
                  <div>
                  <input name="date" className="third-step-label--input" type="text" ref={register({ required: true })} value={dadosViagem.data} />
                  {errors.date && <span className="third-step-label-error">Campo Obrigatório</span>}

                  <input name="hora" className="third-step-label--input" type="time" min="00:00" max="23:59" ref={register({ required: true })} value={hora} onChange={e => setHora(e.target.value)} />
                  {errors.hora && <span className="third-step-label-error">Campo Obrigatório</span>}
                  </div>

                  <label className="third-step-label">Quantas pessoas irão?</label>
                  <input name="qtdPessoas" className="third-step-label--input" type="number" min="5" ref={register({ required: true })} value={qtdPessoas} onChange={e => setPeople(e.target.value)} />
                  {errors.qtdPessoas && <span className="third-step-label-error">Campo Obrigatório</span>}
                  {qtdPessoas < 5 ? 
                    <span style={{fontSize:"12px", color:"red"}}>*Quantidade minima 5</span>                  
                  : 
                    <div></div>
                  }
                </label>
                <div className="third-step-destination-container">
                    <span className="third-step-destination-text">Preço estimado:</span>
                    {qtdPessoas !== "" ? 
                      <span className="third-step-destination-price">R$ {dadosViagem.preco + (qtdPessoas * 10)},00</span>
                    : 
                      <span className="third-step-destination-price">R$ 0,00</span>
                    }
                </div>
                <div className="third-step-btn-container">
                    <div className="third-step-btn-content">
                        <button type="submit" className="third-step-btn--destination">
                            Selecionar Cartão
                        </button> 
                    </div>
                </div>
              </form>
            </div>
        </div>
        {/* <footer className="third-step-footer">
            <div className="third-step-footer-content">
                <div className="third-step-footer-container">
                    <span className="third-step-footer--text">SeatSecurity</span>
                    <span className="third-step-footer--copyright">Em caso de dúvidas ou problemas:</span>
                    <span className="third-step-footer--copyright">seatsecurity@gmail.com</span>
                </div>
            </div>
        </footer> */}
    </div>
  );
}

export default TravelPage;
