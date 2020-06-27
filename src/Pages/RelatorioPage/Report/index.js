import React, {useState} from 'react';
import api from '../../../services/api';
import './index.scss';
import logo from '../../../assets/cadeadoBrancoFechado.png';
import { useForm, ErrorMessage } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi'; 

function ReportForm() {
  const [ ano, setAno ] = useState('');
  const [ mes, setMes ] = useState('');

  const history = useHistory(); //ele serve pra fazer a navegação através de uma função JS

  async function handleReport(e) {
    e.preventDefault();
    console.log("Mes: ", mes, "Ano: ", ano);
    console.log("TamanhoMes: ", mes.length, "Ano: ", ano.length);

    try {
      const response = await api.post('relatorio', { mes, ano });
      if(response.data.codigo !== 200 && response.data.codigo !== undefined)
      {
        alert(response.data.error)
        return;
      }
      
      history.push(`/relatorio?mes=${mes}&ano=${ano}`); //aqui ele redireciona pra tela principal
      console.log(response.data);
      // localStorage.setItem('user', JSON.stringify(response.data))
      // alert(`Relatório do Mês ${mes} realizado`);
    } catch (err) {
      alert('Falha em gerar o relatório, tente novamente!');
    }
  }
const { register, errors } = useForm();
  // const onSubmit = data => console.log(data);

  // console.log(watch("email"));

      return (
        <form onSubmit={handleReport}>
          <label className="report-label-container">
            <label className="report-label">Informe o ano:</label>
            <input name="ano" className="report-label--input" type="text" 
            ref={register({ 
                required: "Campo obrigatório",
                maxLength: {
                    value: 3,
                    message: "Digite um ano válido!"
                },
                minLength: {
                    value: 3,
                    message: "Digite um ano válido!"
                }
                })} value={ano} onChange={e => setAno(e.target.value)} />
            <ErrorMessage errors={errors} name="ano">
                {({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                    <p className="manage-report-label-error" key={type}>{message}</p>
                ))
                }
            </ErrorMessage>
            <label className="report-label">Informe o mês:</label>
            <input name="mes" className="report-label--input" type="number" 
            ref={register({ 
                required: "Campo obrigatório",
                maxLength: {
                    value: 2,
                    message: "Digite um mês válido!"
                },
                pattern: {
                    value: [1-9]|1[0-2],
                    message: "Digite um mês válido!"
                }
                })}
            value={mes} onChange={e => setMes(e.target.value)}/>
            <ErrorMessage errors={errors} name="mes">
                {({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                    <p className="manage-report-label-error" key={type}>{message}</p>
                ))
                }
            </ErrorMessage>
            <div className="report-btn-container">
                <input className="report-btn--relatorio" type="submit" value="Gerar Relatório" />
            </div>
          </label>
        </form>
      );
}

function ReportPage() {
  return (
    <div className="report-page">
        <header className="report-header">
            <div className="report-header-content">
                <a href="/home" className="report-header-back">
                  <FiArrowLeft size={32} color="white" />
                </a>
                <div className="report-header-logo--container">
                    <img src={logo} className="report-logo" alt="logo" /> 
                    <span>/ Relatório</span>
                </div>
            </div>
        </header>
        <div className="report-page-content">
            <div className="report-input-container">
                <ReportForm />
            </div>
        </div>
    </div>
  );
}

export default ReportPage;
