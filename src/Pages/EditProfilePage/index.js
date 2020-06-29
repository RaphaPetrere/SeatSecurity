import React, {useState} from 'react';
import api from '../../services/api';
import './index.scss';
import Logo from '../../assets/cadeadoBrancoFechado.png';
import ProfilePicture from '../../assets/lulu.png';
import { useForm } from "react-hook-form";
import { FiArrowLeft } from 'react-icons/fi'; 

function EditProfileForm() {
const [ nome, setNome ] = useState('');
const [ email, setEmail ] = useState('');
const [ senha, setSenha ] = useState('');
let user = JSON.parse(localStorage.getItem('user'));

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

async function handleUpdateUser(e) {
  e.preventDefault();

  // let user = JSON.parse(localStorage.getItem('user'));
  try {
    console.log(user.userId);
    let userId = user.userId;
    let senhaValidada = validarSenha(senha);
    if(!senhaValidada)
    {
      alert("Erro ao atualizar!");
      return;
    }
    
    const response = await api.put('users', { userId, nome, email, senha });
    if(response.data.codigo !== 200 && response.data.codigo !== undefined)
    {
      alert(response.data.error)
      return;
    }
    
    alert(response.data.message);
  } catch (err) {
    alert('Falha na atualização, tente novamente!');
  }
}

const { register, errors } = useForm();

  // console.log(watch("email"));

      return (
        <form onSubmit={handleUpdateUser}>
          <label className="edit-label-container">
            <label className="edit-label">nome</label>
            <input name="nome" className="edit-label--input" placeholder={user.nome} type="nome" ref={register({ required: true })} value={nome} onChange={e => setNome(e.target.value)}/>
            {errors.nome && <span className="edit-label-error">Campo Obrigatório</span>}

            <label className="edit-label">email</label>
            <input name="email" className="edit-label--input" placeholder={user.email} type="email" ref={register({ required: true })} value={email} onChange={e => setEmail(e.target.value)}/>
            {errors.email && <span className="edit-label-error">Campo Obrigatório</span>}

            <label className="edit-label">senha</label>
            <input name="password" className="edit-label--input" type="password" ref={register({ required: true })} value={senha} onChange={e => setSenha(e.target.value)}/>
            {errors.password && <span className="edit-label-error">Campo Obrigatório</span>}
            <div className="edit-btn-container">
                <input className="edit-btn--save" type="submit" value="Salvar Alterações" />
            </div>
          </label>
        </form>
      );
}

function EditProfilePage() {
  return (
    <div className="edit-page">
        <header className="edit-header">
            <div className="edit-header-content">
                <a href="/account" className="edit-header-back">
                  <FiArrowLeft size={32} color="white" />
                </a>
                <div className="edit-header-logo--container">
                    <img src={Logo} className="edit-logo" alt="logo" /> 
                    <span>/ Editar Usuário</span>
                </div>
            </div>
        </header>
        <div className="edit-page-content">
            <div className="edit-image-container">
                <img src={ProfilePicture} className="edit-profile-picture" alt="edit" /> 
            </div>
            <div className="edit-input-container">
                <EditProfileForm />
            </div>
        </div>
    </div>
  );
}

export default EditProfilePage;
