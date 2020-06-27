import React, {useState} from 'react';
import api from '../../services/api';
import './index.scss';
import logo from '../../assets/cadeadoBrancoFechado.png';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi'; 

function FeedbackForm() {
  const [ subject, setSubject ] = useState('');
  const [ text, setText ] = useState('');

  const history = useHistory(); //ele serve pra fazer a navegação através de uma função JS

  async function handleFeedback(e) {
    e.preventDefault();
    console.log(subject, text);

    try {
      const response = await api.post('feedback', { subject, text });
      if(response.data.codigo !== 200 && response.data.codigo !== undefined)
      {
        alert(response.data.error)
        return;
      }
      
      history.push('/account'); //aqui ele redireciona pra tela principal
      console.log(response.data);
      // localStorage.setItem('user', JSON.stringify(response.data))
      alert(`Agradecemos o feedback!`);
    } catch (err) {
      alert('Falha no envio, tente novamente!');
    }
  }
const { register, errors } = useForm();
  // const onSubmit = data => console.log(data);

  // console.log(watch("email"));

      return (
        <form onSubmit={handleFeedback}>
          <label className="feedback-label-container">
            <label className="feedback-label">Qual o assunto?</label>
            <input name="subject" className="feedback-label--input" type="text" ref={register({ required: true })} value={subject} onChange={e => setSubject(e.target.value)} />
            {errors.subject && <span className="feedback-label-error">Campo Obrigatório</span>}

            <label className="feedback-label">O que deseja falar?</label>
            <textarea name="text" className="feedback-label--textarea" type="text" ref={register({ required: true })} value={text} onChange={e => setText(e.target.value)}/>
            {errors.text && <span className="feedback-label-error">Campo Obrigatório</span>}
            <div className="feedback-btn-container">
                <input className="feedback-btn--send" type="submit" value="Enviar Feedback" />
            </div>
          </label>
        </form>
      );
}

function FeedbackPage() {
  return (
    <div className="feedback-page">
        <header className="feedback-header">
            <div className="feedback-header-content">
                <a href="/account" className="feedback-header-back">
                  <FiArrowLeft size={32} color="white" />
                </a>
                <div className="feedback-header-logo--container">
                    <img src={logo} className="feedback-logo" alt="logo" /> 
                    <span>/ Feedback</span>
                </div>
            </div>
        </header>
        <div className="feedback-page-content">
            <div className="feedback-message-container">
                <span className="feedback-message">Nos ajude a corrigir bugs e melhorar nosso sistema, deixe seu feedback!</span>
            </div>
            <div className="feedback-input-container">
                <FeedbackForm />
            </div>
        </div>
        <footer className="feedback-footer">
            <div className="feedback-footer-content">
                <div className="feedback-footer-container">
                    <span className="feedback-footer--text">SeatSecurity</span>
                    <span className="feedback-footer--copyright">Em caso de dúvidas ou problemas:</span>
                    <span className="feedback-footer--copyright">seatsecurity@gmail.com</span>
                </div>
            </div>
        </footer>
    </div>
  );
}

export default FeedbackPage;
