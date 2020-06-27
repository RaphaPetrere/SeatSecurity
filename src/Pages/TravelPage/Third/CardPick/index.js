import React, {useState, useEffect} from 'react';
import api from '../../../../services/api';
import './index.scss';
import Logo from '../../../../assets/cadeadoBrancoFechado.png';
import CardImage from '../../../../assets/creditCard2.png';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi'; 

function CardPick() {
  const [cartoes, setCartoes] = useState([]);
  let user = JSON.parse(localStorage.getItem('user'));
  let userId = user.userId;

  useEffect(() => {
    api.get('cartoes', {
      headers : {
        Authorization : userId,
      }
    }).then(response => {
      setCartoes(response.data);
    })
  }, [userId]);

  let dadosViagem = JSON.parse(localStorage.getItem('dadosViagem'));
  const history = useHistory();

  async function handleSelectCartao() {
    if(dadosViagem !== null)
    try {
      const response = await api.post('viagens', { dadosViagem, userId });
      if(response.data.codigo !== 200 && response.data.codigo !== undefined)
      {
        alert(response.data.error)
        return;
      }
      
      history.push('/home'); //aqui ele redireciona pra tela principal
      console.log(response.data);
      alert(`Viagem para ${dadosViagem.destino} realizada com sucesso!`);
    } catch (err) {
      alert('Falha no registro, tente novamente!');
    }
  }

  return (
    <div className="card-pick-page">
        <header className="card-pick-header">
            <div className="card-pick-header-content">
                <a href="/travel/third-step" className="card-pick-header-back">
                  <FiArrowLeft size={32} color="white" />
                </a>
                <div className="card-pick-header-logo--container">
                    <img src={Logo} className="card-pick-logo" alt="logo" /> 
                    <span>/ Cartões</span>
                </div>
            </div>
        </header>
        <div className="card-pick-page-content">
            <div className="card-pick-input-header" style={{backgroundColor : "white"}}>
            </div>
            <span>Selecione um dos cartões abaixo: </span>
            <div className="card-pick-all--cards">
              {cartoes.length !== 0 ? cartoes.map(cartao => (
                                    <div className="card-pick-card" key={cartao.numCartao}>
                                    <img src={CardImage} className="card-pick-card-image" alt="card" /> 
                                    <strong style={{color:"white"}}>****{(cartao.numCartao).toString().slice(12)}</strong>
                                    <button className="card-pick-select--button" onClick={() => handleSelectCartao()}><FiCheck className="card-pick-select" size={32} color="white" /></button>
                                    </div>
                )):<div><strong>Registre um cartão para efetuar a viagem!</strong></div>}                
                {/* pra cada cartao, ele vai retornar esse JSX */}
            </div>
        </div>
    </div>
  );
}

export default CardPick;
