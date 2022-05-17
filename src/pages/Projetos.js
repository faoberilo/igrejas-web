import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ProjetosCadastrar from '../components/ProjetosCadastrar';
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '30%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background:'rgb(80,80,80)',
    padding:'1%',
    flexDirection: 'column',
    width: 'fit-content'
}}

export default function Projetos() {
    const navigate = useNavigate();
    const [projetos,setProjetos]= React.useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modal2IsOpen, set2IsOpen] = React.useState(false);
    const [idProjeto,setIdProjeto] = React.useState(null);

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


    const getProjetos = async ()=>{
        await axios.get(`/projetos/listar`).then((response)=>{
          setProjetos(response.data)
        }).catch((err)=>{
          alert(err)
          navigate('/')
        })
      }
    
      React.useEffect(()=>{
        getProjetos();
      },[])

      async function deleteProjeto(id) {
        await axios.delete(`/projetos/${id}`)
        .then((response)=>{
          alert(response.data);      
          navigate("/projetos");
          document.location.reload(true);     
        }).catch((err)=>{
          alert(err)
          navigate('/')
        })
      }
   
  return (
    <div className='container'>
        <h1>Projetos</h1>
         {projetos?.map((projeto)=>(
              <div key={projeto.id} className='cardCultos'>
              <div className='divCultos'>
              <span><b>Nome:</b> {projeto.nome}</span>
              <span><b>Objetivos:</b> {projeto.objetivos}</span>
              <span><b>Participantes:</b> {projeto.participantes}</span>                  
              </div>
              <button className='buttonGerenciar' onClick={()=>{openModal();setIdProjeto(projeto.id)}}>Editar</button>
              <button className='buttonGerenciar' onClick={()=>{openModal2();setIdProjeto(projeto.id)}}>Excluir</button>
              </div>

            ))}
        <button className='buttonGerenciar' onClick={()=>{openModal();setIdProjeto(null)}}>Adicionar projeto</button>

        {modalIsOpen&&
        <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        >
        <div className='divButton'><button className="buttonClose" onClick={closeModal}>✘</button></div>
        <ProjetosCadastrar id={idProjeto}/>
        </Modal>}
        {modal2IsOpen&&
        <Modal
        isOpen={modal2IsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal2}
        style={customStyles}
        >
        <div className='containerExcluir'>
        <h2>Deseja realmente excluir o projeto?</h2>
        <div className='buttons'>
        <button className='buttonGerenciar' onClick={()=>deleteProjeto(idProjeto)}>Sim</button>
        <button className='buttonGerenciar' onClick={closeModal2}>Não</button>
        </div>
        </div>
        </Modal>}
   </div>
  );
}