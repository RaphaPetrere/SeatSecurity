import React, {useState, useEffect} from 'react';
import api from '../../../services/api';
import './index.scss';
import logo from '../../../assets/cadeadoBrancoFechado.png';
// import { useForm } from "react-hook-form";
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

//   let params = new URLSearchParams(document.location.search.substring(1));
//   let origem = params.get("origem");
// const { register, errors } = useForm();
//       return (
//         <form>
//           <label className="first-step-label-container">
//             <label className="first-step-label">Digite a origem:</label>
//             <input name="origin" className="first-step-label--input" type="text" ref={register({ required: true })} value={origem} onChange={e => setOrigin(e.target.value)} />
//             {errors.origin && <span className="first-step-label-error">Campo Obrigatório</span>}
//           </label>
//         </form>
//       );
// }

function TravelPage() {
  const [ locais, setLocais ] = useState([]);

  // let user = JSON.parse(localStorage.getItem('user'));
  // let userId = user.userId;
  // console.log("UserId", userId)

  let dadosViagem = JSON.parse(localStorage.getItem('dadosViagem'));
  console.log("First: ", dadosViagem);
  
  let params = new URLSearchParams(document.location.search.substring(1));
  let tipo = params.get("tipo");
  let origem = params.get("origem");  

  // console.log(tipo);
  if(dadosViagem === null)
  {
    dadosViagem = {
    origem,
    destino : null,
    data : null,
    hora : null,
    preco : null,
    qtdPessoas : null,
    localId : null,
    tipo,
    }
    console.log("Que viagem é essa: ", dadosViagem);
    localStorage.setItem('dadosViagem', JSON.stringify(dadosViagem))
  }
  else
  {
    origem = dadosViagem.origem;
    tipo = dadosViagem.tipo;
  }
  // if(origem !== "")
  // {
  //   let dadosViagem = {
  //   origem,
  //   destino : null,
  //   data : null,
  //   hora : null,
  //   preco : null,
  //   qtdPessoas : null,
  //   localId : null,
  //   }
  //   localStorage.setItem('dadosViagem', JSON.stringify(dadosViagem))
  // }
  // else
  // {
  //   let dadosViagem1 = JSON.parse(localStorage.getItem('dadosViagem'));
  // }
  
  useEffect(() => {
    api.post('locais', {
      tipo
    }).then(response => {
      setLocais(response.data);
      console.log(response.data);
    })
  }, [tipo]);

  function atualizaDados(local) {
    dadosViagem.preco = local.preco;
    localStorage.setItem('dadosViagem', JSON.stringify(dadosViagem))
  };

  return (
    <div className="first-step-page">
        <header className="first-step-header">
            <div className="first-step-header-content">
                <a href="/travel" className="first-step-header-back">
                  <FiArrowLeft size={32} color="white" />
                </a>
                <div className="first-step-header-logo--container">
                    <img src={logo} className="first-step-logo" alt="logo" /> 
                    <span>/ Agendar Viagem</span>
                </div>
            </div>
        </header>
        <div className="first-step-page-content">
            <div className="first-step-input-container">
              <label className="first-step-label-container">
                <label className="first-step-label">Digite a origem:</label>
                <input name="origin" className="first-step-label--input" type="text" value={origem} />
              </label>
            </div>
            <div className="first-step-destination-container">
                <span className="first-step-destination-text">Escolha o destino:</span>
            </div>
            <div className="first-step-btn-container">
                {locais.length ? locais.map(local => (
                    <a href={`/travel/second-step?destino=${local.nome}&origem=${origem}&localId=${local.localId}`} onClick={() => atualizaDados(local)} className="first-step-btn--destination">
                      {local.nome}
                    </a> 
                )):
                  <div>
                    <strong>Nenhum local existente</strong>
                  </div>
                  }  
            </div>
        </div>
        {/* <footer className="first-step-footer">
            <div className="first-step-footer-content">
                <div className="first-step-footer-container">
                    <span className="first-step-footer--text">SeatSecurity</span>
                    <span className="first-step-footer--copyright">Em caso de dúvidas ou problemas:</span>
                    <span className="first-step-footer--copyright">seatsecurity@gmail.com</span>
                </div>
            </div>
        </footer> */}
    </div>
  );
}

export default TravelPage;
