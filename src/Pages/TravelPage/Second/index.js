import React, {Component} from 'react';
import Calendar from 'react-calendar';
// import api from '../../../services/api';
import './index.scss';
import logo from '../../../assets/cadeadoBrancoFechado.png';
// import { useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';
import { FiArrowLeft } from 'react-icons/fi'; 

//https://www.npmjs.com/package/react-calendar doc do calendario lembrar de verificar data antes de hoje

 // tem que fazer verificação nos botões, se nao houve digitado nada na origem, n pode prosseguir
 class CalendarComponent extends Component {
  state = {
    date: new Date((new Date()).valueOf() + 1000*3600*24),
  }
 
  onChange = date => this.setState({ date })
  onClick = date => {

    let dadosViagem = JSON.parse(localStorage.getItem('dadosViagem'));

    // let params = new URLSearchParams(document.location.search.substring(1));
    // let origem = params.get("origem"); 
    // let destino = params.get("destino");
    // let localId = params.get("localId");
    // const history = useHistory();

    let dataPre = date.toString().slice(4,15);
    console.log(dataPre);
    let mes = dataPre.slice(0,3);
    switch(mes){
      case "Jan" :
          mes = "01"
          break;
      case "Fev" :
          mes = "02"
          break;
      case "Mar" :
          mes = "03"
          break;
      case "Abr" :
          mes = "04"
          break;
      case "Mai" :
          mes = "05"
          break;
      case "Jun" :
          mes = "06"
          break;
      case "Jul" :
          mes = "07"
          break;
      case "Ago" :
          mes = "08"
          break;
      case "Set" :
          mes = "09"
          break;
      case "Out" :
          mes = "10"
          break;
      case "Nov" :
          mes = "11"
          break;
      case "Dez" :
          mes = "12"
          break;
      default :
          mes = "12";
          break;
    }
    console.log(mes);
    let dia = dataPre.slice(4,6);
    console.log(dia);
    let ano = dataPre.slice(7,11);
    console.log(ano);
    let dataAtual = ano.concat("-"+mes.concat("-"+dia));
    console.log(dataAtual);

    dadosViagem.data = dataAtual;
    // dadosViagem = {
    //   origem,
    //   destino,
    //   data : dataAtual,
    //   preco : null,
    //   qtdPessoas : null,
    //   localId,
    // }
    localStorage.setItem('dadosViagem', JSON.stringify(dadosViagem))
    window.location.href=`https://seatsecurity-frontend.herokuapp.com/travel/third-step?origem=${dadosViagem.origem}&destino=${dadosViagem.destino}&data=${dadosViagem.data}`
    // window.location.href=`http://localhost:3000/travel/third-step?origem=${dadosViagem.origem}&destino=${dadosViagem.destino}&data=${dadosViagem.data}`
  }
 
  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          calendarType={'US'}
          minDate={new Date((new Date()).valueOf() + 1000*3600*24)}
          //pega amanhã como dia minimo
          onClickDay={this.onClick}
        />
      </div>
    );
  }
}



// function TravelForm() {
  // const [ origin, setOrigin ] = useState('');
  // const [ destination, setDestination ] = useState('');

  // const history = useHistory(); //ele serve pra fazer a navegação através de uma função JS

  // async function handleTravel(e) {
  //   e.preventDefault();

  //   try {
  //     const response = await api.post('travel', { origin, destination});
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
//         <form onSubmit={handleTravel}>
//           <label className="second-step-label-container">
//             <label className="second-step-label">Digite a origem:</label>
//             <input name="origin" className="second-step-label--input" type="text" ref={register({ required: true })} value={origin} onChange={e => setOrigin(e.target.value)} />
//             {errors.origin && <span className="second-step-label-error">Campo Obrigatório</span>}
//             <label className="second-step-label">Escolha o destino:</label>
//             <input name="destination" className="second-step-label--input" type="text" ref={register({ required: true })} value={destination} onChange={e => setDestination(e.target.value)} />
//             {errors.destination && <span className="second-step-label-error">Campo Obrigatório</span>}
//           </label>
//         </form>
//       );
// }

function TravelPage() {

  let dadosViagem = JSON.parse(localStorage.getItem('dadosViagem'));
  console.log("Second: ", dadosViagem);

  let params = new URLSearchParams(document.location.search.substring(1));
  let origem = params.get("origem"); 
  let destino = params.get("destino");
  let localId = params.get("localId");

  console.log("Origem: ", origem)
  if(origem === null)
  {
    origem = dadosViagem.origem;
    destino = dadosViagem.destino;
     console.log("Originario: ", origem);
     console.log("Destinatario: ", destino);
  }
  else
  {
    dadosViagem.destino = destino;
    dadosViagem.localId = localId;
    // console.log("Destino: ", dadosViagem.destino);
    // console.log('dadosViagem: ', dadosViagem.localId);
    localStorage.setItem('dadosViagem', JSON.stringify(dadosViagem));
  }

  return (
    <div className="second-step-page">
        <header className="second-step-header">
            <div className="second-step-header-content">
                <a href="/travel/first-step" className="second-step-header-back">
                  <FiArrowLeft size={32} color="white" />
                </a>
                <div className="second-step-header-logo--container">
                    <img src={logo} className="second-step-logo" alt="logo" /> 
                    <span>/ Agendar Viagem</span>
                </div>
            </div>
        </header>
        <div className="second-step-page-content">
            <div className="second-step-input-container">
              <label className="second-step-label-container">

                <label className="second-step-label">Digite a origem:</label>
                <input name="origin" className="second-step-label--input" type="text" value={origem} />

                <label className="second-step-label">Escolha o destino:</label>
                <input name="destination" className="second-step-label--input" type="text" value={destino} />
              </label>
            </div>
            <div className="second-step-destination-container">
                <span className="second-step-destination-text">Escolha data e horário:</span>
            </div>
            <div className="second-step-btn-container">
                <CalendarComponent/>
            </div>
        </div>
        {/* <footer className="second-step-footer">
            <div className="second-step-footer-content">
                <div className="second-step-footer-container">
                    <span className="second-step-footer--text">SeatSecurity</span>
                    <span className="second-step-footer--copyright">Em caso de dúvidas ou problemas:</span>
                    <span className="second-step-footer--copyright">seatsecurity@gmail.com</span>
                </div>
            </div>
        </footer> */}
    </div>
  );
}

export default TravelPage;
