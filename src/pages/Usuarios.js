import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import UsuariosCadastrar from '../components/UsuariosCadastrar';
import { useNavigate } from "react-router-dom";

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

export default function Usuarios() {
    const navigate = useNavigate();
    const [usuarios,setUsuarios]= React.useState([]);
    const [usuario,setUsuario]= React.useState({});
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modal2IsOpen, set2IsOpen] = React.useState(false);
    const [modal3IsOpen, set3IsOpen] = React.useState(false);
    const [idUsuario,setIdUsuario] = React.useState(null);

    const getUsuarioById = async (id)=>{
      await axios.get(`/usuario/${id}`).then((response)=>{
       setUsuario(response.data)
      }).catch((err)=>{
        alert(err)
        navigate('/')
      })
    }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  function openModal2() {
    set2IsOpen(true);
  }

  function closeModal2() {
    set2IsOpen(false);
  }
  function openModal3() {
    set3IsOpen(true);
  }

  function closeModal3() {
    set3IsOpen(false);
  }


    const getUsuarios = async ()=>{
        await axios.get(`/usuario/listar`).then((response)=>{
          setUsuarios(response.data)
        }).catch((err)=>{
          alert(err)
          navigate('/')
        })
      }
    
      React.useEffect(()=>{
        getUsuarios();
      },[])

      async function deleteUsuario(id) {
        await axios.delete(`/usuario/${id}`)
        .then((response)=>{
          alert(response.data);      
          navigate("/usuarios");
          document.location.reload(true);     
        }).catch((err)=>{
          alert(err)
          navigate('/')
        })
      }
   
  return (
    <div className='container'>
        <h1>Usuarios</h1>
         {usuarios?.map((usuario)=>(
              <div key={usuario.id} className='cardUsuarios'>
              <div>
              <span className='pAvisos'><b>{usuario.id} - {usuario.nome}</b></span>
              <button className='buttonGerenciar' onClick={()=>{openModal3();getUsuarioById(usuario.id)}}>Detalhes</button>
              </div>
              <button className='buttonGerenciar' onClick={()=>{openModal();setIdUsuario(usuario.id)}}>Editar</button>
              <button className='buttonGerenciar' onClick={()=>{openModal2();setIdUsuario(usuario.id)}}>Excluir</button>
              </div>

            ))}
        <button className='buttonGerenciar' onClick={()=>{openModal();setIdUsuario(null)}}>Adicionar Usuario</button>

        {modalIsOpen&&
        <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        >
        <div className='divButton'><button className="buttonClose" onClick={closeModal}>✘</button></div>
        <UsuariosCadastrar id={idUsuario}/>
        </Modal>}
        {modal2IsOpen&&
        <Modal
        isOpen={modal2IsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal2}
        style={customStyles}
        >
        <div className='containerExcluir'>
        <h2>Deseja realmente excluir o Usuario?</h2>
        <div className='buttons'>
        <button className='buttonGerenciar' onClick={()=>deleteUsuario(idUsuario)}>Sim</button>
        <button className='buttonGerenciar' onClick={closeModal2}>Não</button>
        </div>
        </div>
        </Modal>}
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
        <span className='detalhes'><b>Nome: </b>{usuario.nome}</span>
        <span className='detalhes'><b>Email: </b>{usuario.email}</span>
        <span className='detalhes'><b>Data de Nascimento:</b> {usuario.nascimento}</span>
        <span className='detalhes'><b>Data de Batismo: </b>{usuario.batismo}</span>
        <span className='detalhes'><b>Profissao:</b> {usuario.profissao}</span>
        <span className='detalhes'><b>CPF:</b> {usuario.cpf}</span>
        <span className='detalhes'><b>Endereço:</b> {usuario.endereco}</span>
        <span className='detalhes'><b>Conjuge:</b> {usuario.conjuge}</span>
        <span className='detalhes'><b>Filhos:</b> {usuario.filhos}</span>
        <span className='detalhes'><b>Telefone:</b> {usuario.telefone}</span>
        <span className='detalhes'><b>Dia do dízimo:</b> {usuario.diaDizimo}</span>
        {usuario.diaLembrete===0?null:<span className='detalhes'><b>Dia do lembrete: </b>{usuario.diaLembrete}</span>}           
          
        </div>
        </Modal>}
   </div>
  );
}