import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import './index.scss';  
import Logo from '../../assets/cadeadoBrancoFechado.png';
import PeopleImage from '../../assets/user.png';
import CalendarImage from '../../assets/iconfinder_calendar.png';
import LocationImage from '../../assets/location.png';
import { FiArrowLeft } from 'react-icons/fi'; 

function RelatorioPage() {
    const [viagens, setViagens] = useState([]);
    let params = new URLSearchParams(document.location.search.substring(1));
    let mes = params.get("mes");
    let ano = params.get("ano");

    useEffect(() => {
      api.post('relatorio', {
        ano, mes
      }).then(response => {
        setViagens(response.data);
        console.log(response.data);
      })
    }, [ano, mes]);
    
    function contaTeatro(viagem){
        return viagem.tipo === "Teatro"
    }
    function contaAeroporto(viagem){
        return viagem.tipo === "Aeroporto"
    }
    function contaMuseu(viagem){
        return viagem.tipo === "Museu"
    }
    function contaTerminal(viagem){
        return viagem.tipo === "Terminal"
    }

    let viagensTeatro = viagens.filter(contaTeatro).length;
    let viagensAerporto = viagens.filter(contaAeroporto).length;
    let viagensMuseu = viagens.filter(contaMuseu).length;
    let viagensTerminal = viagens.filter(contaTerminal).length;

    return (
      <div className="relatorio-page">
        <header className="relatorio-header">
            <div className="relatorio-header-content">
                <a href="/home" className="relatorio-header-back">
                <FiArrowLeft size={32} color="white" />
                </a>
                <div className="relatorio-header-logo--container">
                    <img src={Logo} className="relatorio-logo" alt="logo" /> 
                    <span>/ Relatório de viagens</span>
                </div>
            </div>
        </header>
        <table className="relatorio-table">
            <thead>
                <tr className="relatorio-table-header">
                    <td className="relatorio-table-line">
                    <img src={CalendarImage} className="relatorio-table-date" alt="date" /> 
                        
                    </td>
                    <td className="relatorio-table-line">
                    <img src={LocationImage} className="relatorio-table-location" alt="location" /> 
                    </td>
                    <td className="relatorio-table-line">
                    <img src={PeopleImage} className="relatorio-table-passengers--number" alt="passengers quantity" /> 
                    
                    </td>
                    <td className="relatorio-table-line">
                        <span className="relatorio-table-price">R$</span>
                    </td>
                </tr>
            </thead>
            <tbody>
                {viagens.length ? viagens.map(viagem => (
                                    <tr key={viagem.viagemId}>
                                        <td className="relatorio-table-line-2">
                                            <span style={{fontSize:14}}>{viagem.data}</span>
                                        </td>
                                        <td className="relatorio-table-line-2">
                                            <span style={{fontSize:14}}>{viagem.nomeDestino}</span>
                                        </td>
                                        <td className="relatorio-table-line-2">
                                            <span style={{fontSize:14}}>{viagem.qtdPessoas}</span>
                                        </td>
                                        <td className="relatorio-table-line-2">
                                            <span style={{fontSize:14}}>{viagem.preco}</span>
                                        </td>
                                    </tr>
                )):
                    <tr>
                        <td className="relatorio-table-line-2">
                            <strong>Nenhuma Viagem encontrada</strong>
                        </td>
                        <td className="relatorio-table-line-2">
                        </td>
                        <td className="relatorio-table-line-2">
                        </td>
                        <td className="relatorio-table-line-2">
                        </td>
                    </tr>
                    }    
            </tbody>
        </table>
        <div className="relatorio-total-header"></div>
            <span className="relatorio-total-item">Total de viagens ao Teatro: {viagensTeatro}</span>
            <span className="relatorio-total-item">Total de viagens ao Aerporto: {viagensAerporto}</span>
            <span className="relatorio-total-item">Total de viagens ao Museu: {viagensMuseu}</span>
            <span className="relatorio-total-item">Total de viagens ao Terminal: {viagensTerminal}</span>
      </div>
    );
  }
  
  export default RelatorioPage;
