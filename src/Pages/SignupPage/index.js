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

  async function handleRegister(e) {
    e.preventDefault();

    console.log(senha, rsenha);
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
const { register,  errors } = useForm();

  // console.log(watch("email"));

      return (
        <form onSubmit={handleRegister}>
          <label className="signup-label-container">
  
            <label className="signup-label">nome</label>
            <input name="nome" className="signup-label--input" type="nome" ref={register({ required: true })} value={nome} onChange={e => setNome(e.target.value)}/>
            {errors.nome && <span className="signup-label-error">Campo Obrigatório</span>}

            <label className="signup-label">cpf</label>
            <input name="cpf" className="signup-label--input" type="cpf" ref={register({ required: true })} value={cpf} onChange={e => setCpf(e.target.value)}/>
            {errors.cpf && <span className="signup-label-error">Campo Obrigatório</span>}

            <label className="signup-label">email</label>
            <input name="email" className="signup-label--input" type="email" ref={register({ required: true })} value={email} onChange={e => setEmail(e.target.value)}/>
            {errors.email && <span className="signup-label-error">Campo Obrigatório</span>}

            <label className="signup-label">senha</label>
            <input name="password" className="signup-label--input" type="password" ref={register({ required: true })} value={senha} onChange={e => setSenha(e.target.value)}/>
            {errors.password && <span className="signup-label-error">Campo Obrigatório</span>}

            <label className="signup-label">confirmar senha</label>
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
