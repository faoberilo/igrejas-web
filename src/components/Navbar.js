import React from "react";
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '30%',
    bottom: '-50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background:'rgb(80,80,80)',
    padding:'1%',
    flexDirection: 'column',
    width: 'fit-content'
}}



const Navbar = () => {
  const navigate = useNavigate();
  const [modal3IsOpen, set3IsOpen] = React.useState(false);
  const [perfil,setPerfil]= React.useState({});
  
  const getPerfil = async ()=>{
    await axios.get(`/usuario/`)
    .then((response)=>{
    setPerfil(response.data)
    }).catch((err)=>{
      console.log(err)
      alert(err)
      navigate('/')      
    })
  }
  

  function openModal3() {
    set3IsOpen(true);
  }

  function closeModal3() {
    set3IsOpen(false);
  }
  const logout = event =>{
    event.preventDefault();
    localStorage.removeItem('TOKEN');
    navigate('/') 
  }
  return (
    <div className="containerNavbar">
        <Link to="/home" className="divNav"><img  src={logo} alt="Logo da empresa" className='logo'/></Link>
        <span className="titleNavbar">Igrejas-web</span>
        <div className="divNav" style={{justifyContent: 'flex-end'}}>
        {localStorage.getItem("TOKEN") &&
        <>
            <button className="buttonGerenciar" onClick={()=>{getPerfil();openModal3();}}>Perfil</button>
            <button className="buttonGerenciar" onClick={logout}>Logout</button>
        </>
         }
        </div>
        {modal3IsOpen&&
        <Modal
        isOpen={modal3IsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal3}
        style={customStyles}
        >
        <div className='divButton'><button className="buttonClose" onClick={closeModal3}>✘</button></div>
        <div className='containerCadastro'>
          <h2>Detalhes do Usuário</h2>
        <span className='detalhes'><b>Nome: </b>{perfil.nome}</span>
        <span className='detalhes'><b>Email: </b>{perfil.email}</span>
        <span className='detalhes'><b>Data de Nascimento:</b> {perfil.nascimento}</span>
        <span className='detalhes'><b>Data de Batismo: </b>{perfil.batismo}</span>
        <span className='detalhes'><b>Profissao:</b> {perfil.profissao}</span>
        <span className='detalhes'><b>CPF:</b> {perfil.cpf}</span>
        <span className='detalhes'><b>Endereço:</b> {perfil.endereco}</span>
        <span className='detalhes'><b>Conjuge:</b> {perfil.conjuge}</span>
        <span className='detalhes'><b>Filhos:</b> {perfil.filhos}</span>
        <span className='detalhes'><b>Telefone:</b> {perfil.telefone}</span>
        <span className='detalhes'><b>Dia do dízimo:</b> {perfil.diaDizimo}</span>
        {perfil.diaLembrete===0?null:<span className='detalhes'><b>Dia do lembrete: </b>{perfil.diaLembrete}</span>}           
          
        </div>
        </Modal>}      
    </div>
  );
};

export default Navbar;
