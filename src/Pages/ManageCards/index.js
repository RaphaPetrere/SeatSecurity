import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import './index.scss';
import Logo from '../../assets/cadeadoBrancoFechado.png';
import CardImage from '../../assets/creditCard2.png';
import Minus from '../../assets/minus.png';
import { useForm, ErrorMessage } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; 

function CardForm() {
    const [ numCartao, setNumcartao ] = useState('');
    const [ nomeCartao, setNomecartao ] = useState('');
    const [ cvv, setCvv ] = useState('');
    const [ validadeInicial, setValidade ] = useState('');

    const history = useHistory();
    
    async function handleCreateCartao(e) {
      e.preventDefault();
      console.log(numCartao, "NOME: ", nomeCartao);
  
      let user = JSON.parse(localStorage.getItem('user'));
      let userId = user.userId;
      console.log("UserID: ", userId);

      const date = new Date();
      let ano = date.getFullYear();
      let mes = date.getMonth();

      ano = ano.toString();
      mes = mes.toString();

      const zero = "0";

      mes = mes.length === 1 ? zero.concat(mes) : mes;
      ano = ano.slice(2,4)

      let validadeAtual = mes.concat('/'.concat(ano));

      let validade = validadeInicial.replace(/\W|_/,'/');
      console.log(typeof(validade));
      console.log(typeof(parseInt(cvv)));

      if(numCartao.length !== 16)
      {
        alert("O número do cartão deve conter 16 caracteres");
        return;
      }

      if(validade <= validadeAtual)
      {
        alert("Entrar com uma válidade valida");
        return;
      }

      try {
        const response = await api.post('cartoes', { userId, nomeCartao, numCartao, cvv, validade });
        if(response.data.codigo !== 200 && response.data.codigo !== undefined)
        {
          alert(response.data.error)
          return;
        }
        
        console.log(response.data);
        alert(response.data.message);
        history.push('/account');
      } catch (err) {
        alert('Falha no cadastro, tente novamente!');
      }
    }
    const { register, errors } = useForm({
        validateCriteriaMode: "all"
      });

//   console.log(watch("cardNumber"));

      return (
        <form onSubmit={handleCreateCartao}>
          <label className="manage-cards-label-container">
            <label className="manage-cards-label">Numero do cartão</label>
            <input 
                name="cardsNumber" 
                className="manage-cards-label--input" 
                type="number" 
                ref={register({ 
                  required: true,
                  maxLength: {
                    value: 16,
                    message: "Tamanho máximo de 16 digitos"
                  },
                  minLength: {
                    value: 16,
                    message: "Tamanho mínimo de 16 digitos"
                  }
                })}
                value={numCartao} 
                onChange={e => setNumcartao(e.target.value)}
            />
            {errors.cardsNumber && <span className="manage-cards-label-error">Campo Obrigatório</span>}

            <label className="manage-cards-label">Nome impresso no cartão</label>
            <input name="cardsName" className="manage-cards-label--input" type="text" ref={register({ required: true })} value={nomeCartao} onChange={e => setNomecartao(e.target.value)}/>
            {errors.cardsName && <span className="manage-cards-label-error">Campo Obrigatório</span>}

            <label className="manage-cards-label">cvv</label>
            <input name="cardsCVV" className="manage-cards-label--input" type="number" 
            value={cvv} 
            onChange={e => setCvv(e.target.value)}
            ref={register({ 
            required: "Campo obrigatório",
            maxLength: {
              value: 3,
              message: "Tamanho máximo de 3 digitos"
            },
            minLength: {
              value: 3,
              message: "Tamanho mínimo de 3 digitos"
            }
            })} />
            <ErrorMessage errors={errors} name="cardsCVV">
                {({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                    <p className="manage-cards-label-error" key={type}>{message}</p>
                ))
                }
            </ErrorMessage>

            <label className="manage-cards-label">Data de válidade</label>
            <label style={{fontSize:"12px"}}>colocar mes_ano (exemplo: 01_21)</label>
            <input name="validade" className="manage-cards-label--input" type="text" 
            value={validadeInicial} 
            onChange={e => setValidade(e.target.value)}
            ref={register({ 
            required: "Campo obrigatório",
            maxLength: {
              value: 5,
              message: "Tamanho máximo de 5 digitos"
            },
              minLength: {
              value: 5,
              message: "Tamanho mínimo de 5 digitos"
            }
            })} />
            <ErrorMessage errors={errors} name="validade">
                {({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                    <p className="manage-cards-label-error" key={type}>{message}</p>
                ))
                }
            </ErrorMessage>
            <button className="manage-cards-btn-container">
              <img src={CardImage} className="manage-cards-card-image" alt="card" /> 
              <span type="submit">Cadastrar Cartão</span>
            </button>
          </label>
        </form>
      );
}

function ManageCards() {
  const [cartoes, setCartoes] = useState([]);
  let user = JSON.parse(localStorage.getItem('user'));
  let userId = user.userId;

  useEffect(() => {
    api.put('cartoes', {
      userId
    }).then(response => {
      setCartoes(response.data);
    })
  }, [userId]);

  async function handleDeleteCartao(numCartao) {
    try {
        await api.delete(`cartoes/${numCartao}`, {
          userId
      });

        setCartoes(cartoes.filter(cartao => cartao.numCartao !== numCartao));
        alert(`Cartão de numero ${numCartao} removido com sucesso!`);
    } catch(err) {
        alert("Erro ao deletar cartão, tente novamente!");
    }
  }

  return (
    <div className="manage-cards-page">
        <header className="manage-cards-header">
            <div className="manage-cards-header-content">
                <a href="/account" className="manage-cards-header-back">
                  <FiArrowLeft size={32} color="white" />
                </a>
                <div className="manage-cards-header-logo--container">
                    <img src={Logo} className="manage-cards-logo" alt="logo" /> 
                    <span>/ Cartões</span>
                </div>
            </div>
        </header>
        <div className="manage-cards-page-content">
            <div className="manage-cards-input-header" style={{backgroundColor : "white"}}>
            </div>
            <div className="manage-cards-input-container">
                <CardForm />
            </div>
            {/* <div className="manage-cards-input-header">
                <img src={CardImage} className="manage-cards-card-image" alt="card" /> 
                <span>Cadastrar Cartão</span>
            </div> */}
            <div className="manage-cards-all--cards">
                {/* <div className="manage-cards-card">
                    <img src={CardImage} className="manage-cards-card-image" alt="card" /> 
                    <span className="manage-cards-card-name">Cartão</span>
                    <button className="manage-cards-delete--button"><img src={Minus} className="manage-cards-delete" alt="delete" /></button>
                </div>
                <div className="manage-cards-card">
                    <img src={CardImage} className="manage-cards-card-image" alt="card" /> 
                    <span className="manage-cards-card-name">Cartão</span>
                    <button className="manage-cards-delete--button"><img src={Minus} className="manage-cards-delete" alt="delete" /></button>
                </div> */}
              {cartoes.length !== 0 ? cartoes.map(cartao => (
                                    <div className="manage-cards-card" key={cartao.numCartao}>
                                    <img src={CardImage} className="manage-cards-card-image" alt="card" /> 
                                    <strong>{cartao.numCartao}</strong>
                                    <button className="manage-cards-delete--button" ><img src={Minus} className="manage-cards-delete" alt="delete" onClick={() => handleDeleteCartao(cartao.numCartao)}/></button>
                                    {/* onClick={() => handleDeleteCartao(cartao.numCartao)} */}
                                    </div>
                )):<div></div>}                
                {/* pra cada cartao, ele vai retornar esse JSX */}
            </div>
        </div>
    </div>
  );
}

export default ManageCards;
