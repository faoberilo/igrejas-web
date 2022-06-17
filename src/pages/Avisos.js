import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import AvisosCadastrar from '../components/AvisosCadastrar';
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

export default function Avisos() {
    const navigate = useNavigate();
    const [avisos,setAvisos]= React.useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modal2IsOpen, set2IsOpen] = React.useState(false);
    const [idAviso,setIdAviso] = React.useState(null);

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


    const getAvisos = async ()=>{
        await axios.get(`/avisos/listar`).then((response)=>{
          setAvisos(response.data)
        }).catch((err)=>{
          alert(err)
          navigate('/')
        })
      }
    
      React.useEffect(()=>{
        getAvisos();
      },[])

      async function deleteAviso(id) {
        
        await axios.delete(`/avisos/${id}`)
        .then((response)=>{
          alert(response.data);      
          navigate("/avisos");
          document.location.reload(true);     
        }).catch((err)=>{
          alert(err)
          navigate('/')
        })
      }
   
  return (
    <div className='container'>
        <h1>Avisos</h1>
         {avisos?.map((aviso)=>(
              <div key={aviso.id} className='card'>
              <div className='divCard'>
              <p className='pAvisos'> {aviso.data} - {aviso.titulo} - {aviso.descricao}</p>
              <button className='buttonGerenciar' onClick={()=>{openModal();setIdAviso(aviso.id)}}>Editar</button>
              <button className='buttonGerenciar' onClick={()=>{openModal2();setIdAviso(aviso.id)}}>Excluir</button>                  
              </div>
              </div>
            ))}
        <button className='buttonGerenciar' onClick={()=>{openModal()}}>Adicionar Aviso</button>

        {modalIsOpen&&
        <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        >
        <div className='divButton'><button className="buttonClose" onClick={closeModal}>✘</button></div>
        <AvisosCadastrar/>
        </Modal>}
        {modal2IsOpen&&
        <Modal
        isOpen={modal2IsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal2}
        style={customStyles}
        >
        <div className='containerExcluir'>
        <h2>Deseja realmente excluir o aviso?</h2>
        <div className='buttons'>
        <button className='buttonGerenciar' onClick={()=>deleteAviso(idAviso)}>Sim</button>
        <button className='buttonGerenciar' onClick={closeModal2}>Não</button>
        </div>
        </div>
        </Modal>}
   </div>
  );
}