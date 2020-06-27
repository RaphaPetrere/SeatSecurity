import React, {useState} from 'react';
import api from '../../services/api';
import './index.scss';
import logo from '../../assets/cadeadoBrancoFechado.png';
import { useForm } from "react-hook-form";
import { FiArrowLeft } from 'react-icons/fi'; 

function ForgotPasswordForm() {
  const [ email, setEmail ] = useState('');

  async function handleEsqueciSenha(e) {
    e.preventDefault();
    console.log(email);

    try {
      const response = await api.post('esqueciSenha', { email });
      if(response.data.codigo !== 200 && response.data.codigo !== undefined)
      {
        alert(response.data.error)
        return;
      }
      
      console.log(response.data);
      // localStorage.setItem('user', JSON.stringify(response.data))
      alert(`Senha enviada ao email informado!`);
    } catch (err) {
      alert('Falha no envio, tente novamente!');
    }
  }

const { register, errors } = useForm();

  // console.log(watch("email"));

      return (
        <form onSubmit={handleEsqueciSenha}>
          <label className="forgot-password-label-container">
            <label className="forgot-password-label">email</label>
            <input name="email" className="forgot-password-label--input" type="email" ref={register({ required: true })} value={email} onChange={e => setEmail(e.target.value)}/>
            {errors.email && <span className="forgot-password-label-error">Campo Obrigatório</span>}
            <div className="forgot-password-btn-container">
                <input className="forgot-password-btn" type="submit" value="Requisitar Senha" />
            </div>
          </label>
        </form>
      );
}

function ForgotPasswordPage() {
  return (
    <div className="forgot-password-page">
        <div className="forgot-password-header">
            <span className="forgot-password-header-content">
                <a href="/" className="forgot-password-header-back">
                  <FiArrowLeft size={32} color="white" />
                </a>
                <div className="forgot-password-header-logo--container">
                    <img src={logo} className="forgot-password-logo" alt="logo" /> 
                    <span>/ Esqueci minha senha</span>
                </div>
            </span>
        </div>
        <div className="forgot-password-page-content">
            <div className="forgot-password-input-container">
                <ForgotPasswordForm />
            </div>
        </div>
    </div>
  );
}

export default ForgotPasswordPage;
