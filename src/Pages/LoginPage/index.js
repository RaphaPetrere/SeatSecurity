import React, {useState} from 'react';
import api from '../../services/api';
import './index.scss';
import logo from '../../assets/cadeadoBrancoFechado.png';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi'; 

function LoginForm() {
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');

  const history = useHistory(); //ele serve pra fazer a navegação através de uma função JS

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('login', { email, senha });
      if(response.data.codigo !== 200 && response.data.codigo !== undefined)
      {
        alert(response.data.error)
        return;
      }
      
      history.push(`/home?tipo=${response.data.tipo}`); //aqui ele redireciona pra tela principal
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data))
      alert(`Bem vindo ${response.data.nome}`);
    } catch (err) {
      alert('Falha no login, tente novamente!');
    }
  }
const { register, errors } = useForm();
  // const onSubmit = data => console.log(data);

  // console.log(watch("email"));

      return (
        <form onSubmit={handleLogin}>
          <label className="login-label-container">
            <label className="login-label">email</label>
            <input name="email" className="login-label--input" type="email" ref={register({ required: true })} value={email} onChange={e => setEmail(e.target.value)} />
            {errors.email && <span className="login-label-error">Campo Obrigatório</span>}

            <label className="login-label">senha</label>
            <input name="password" className="login-label--input" type="password" ref={register({ required: true })} value={senha} onChange={e => setSenha(e.target.value)}/>
            {errors.password && <span className="login-label-error">Campo Obrigatório</span>}
            <div className="login-btn-container">
                <input className="login-btn--login" type="submit" value="Efetuar Login" />
            </div>
          </label>
        </form>
      );
}

function LoginPage() {
  return (
    <div className="login-page">
        <header className="login-header">
            <div className="login-header-content">
                <a href="/" className="login-header-back">
                  <FiArrowLeft size={32} color="white" />
                </a>
                <div className="login-header-logo--container">
                    <img src={logo} className="login-logo" alt="logo" /> 
                    <span>/ Login</span>
                </div>
            </div>
        </header>
        <div className="login-page-content">
            <div className="login-input-container">
                <LoginForm />
            </div>
        </div>
    </div>
  );
}

export default LoginPage;
