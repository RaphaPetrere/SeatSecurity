import React, {useState} from 'react';
import api from '../../services/api';
import './index.scss';
import logo from '../../assets/cadeadoBrancoFechado.png';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi'; 

function SignupForm() {
  const [ email, setEmail ] = useState('');
  const [ cpf, setCpf ] = useState('');
  const [ senha, setSenha ] = useState('');
  const [ nome, setNome ] = useState('');
  const [ rsenha, setRSenha ] = useState('');
  const history = useHistory();

  function validarSenha(senha){

    if(senha.length === 0 || senha.match(/\W|_/)){
        console.log('senha invalida1');
        return false;
    } 

    var numeros = senha.match(/\d/g) ? senha.match(/\d/g).length : 0;
    var letras = senha.match(/[a-zA-Z]/g) ? senha.match(/[a-zA-Z]/g).length : 0;
    var totalCaracteresValidos = numeros + letras;


    if(totalCaracteresValidos >= 6 && totalCaracteresValidos <= 10 && numeros >= 1 && !senha.match(/\W|_/)){
       console.log('senha valida');
       return true;
    }else{
       console.log('senha invalida2');
       return false;
    }
  }

  async function handleRegister(e) {
    e.preventDefault();

    console.log(senha, rsenha);
    let cpfFilter = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    let cpfResult = cpfFilter.test(cpf);
    console.log("Resultado: ", cpfResult);
    let senhaValidada = validarSenha(senha);
    if(senhaValidada)
    {
      try {
        const response = await api.post('users', { email, cpf, senha, nome, rsenha });
        if(response.data.codigo !== 200)
        {
          alert(response.data.error);
          return;
        }
        
        history.push('/login');
        console.log(response.data.message);
      } catch (err) {
        alert("Erro no cadastro do usuário, tente novamente!");
      }
    }
    else
    {
      alert("Preencha a senha no estilo requisitado!");
    }
  }
const { register,  errors } = useForm();

  // console.log(watch("email"));

      return (
        <form onSubmit={handleRegister}>
          <label className="signup-label-container">
  
            <label className="signup-label">Nome</label>
            <input name="nome" className="signup-label--input" type="text" ref={register({ required: true })} value={nome} onChange={e => setNome(e.target.value)}/>
            {errors.nome && <span className="signup-label-error">Campo Obrigatório</span>}

            <label className="signup-label">CPF (preencha com . e - )</label>
            <input name="cpf"inputMode="numeric" className="signup-label--input" placeholder="   .   .   -  " type="text" ref={register({ required: true })} value={cpf} onChange={e => setCpf(e.target.value)}/>
            {errors.cpf && <span className="signup-label-error">Campo Obrigatório</span>}

            <label className="signup-label">E-mail</label>
            <input name="email" className="signup-label--input" type="email" ref={register({ required: true })} value={email} onChange={e => setEmail(e.target.value)}/>
            {errors.email && <span className="signup-label-error">Campo Obrigatório</span>}

            <label className="signup-label">Senha</label>
            <input name="password" className="signup-label--input" type="password" ref={register({ required: true })} value={senha} onChange={e => setSenha(e.target.value)}/>
            {/* {errors.password && <span className="signup-label-error">Campo Obrigatório</span>} */}
            {senha.length < 6 || senha.length > 10 ?
              <>
                <span style={{fontSize: '12px', color:'red'}}>*Senha deve conter de 6 à 10 caracteres.</span>
                <span style={{fontSize: '12px', color:'red'}}>*Senha deve conter números e letras.</span>
              </>
            :
              <div></div>
            }


            <label className="signup-label">Confirmar senha</label>
            <input name="confirm-password" className="signup-label--input" type="password" ref={register({ required: true })} value={rsenha} onChange={e => setRSenha(e.target.value)}/>
            {errors.password && <span className="signup-label-error">Campo Obrigatório</span>}
            <div className="signup-btn-container">
                <input className="signup-btn--signup" type="submit" value="Cadastrar" />
            </div>
          </label>
        </form>
      );
}

function SignupPage() {
  return (
    <div className="signup-page">
        <header className="signup-header">
            <span className="signup-header-content">
                <a href="/" className="signup-header-back">
                  <FiArrowLeft size={32} color="white" />
                </a>
                <div className="signup-header-logo--container">
                    <img src={logo} className="signup-logo" alt="logo" /> 
                    <span>/ Cadastrar</span>
                </div>
            </span>
        </header>
        <div className="signup-page-content">
            <div className="signup-input-container">
                <SignupForm />
            </div>
        </div>
    </div>
  );
}

export default SignupPage;
