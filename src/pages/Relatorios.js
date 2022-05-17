import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import RelatoriosCadastrar from '../components/RelatoriosCadastrar';
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

export default function Relatorios() {
    const navigate = useNavigate();
    const [relatorios,setRelatorios]= React.useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modal2IsOpen, set2IsOpen] = React.useState(false);
    const [idRelatorio,setIdRelatorio] = React.useState(null);

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


    const getRelatorios = async ()=>{
        await axios.get(`/relatorios/listar`).then((response)=>{
          setRelatorios(response.data)
        }).catch((err)=>{
          alert(err)
          navigate('/')
        })
      }
    
      React.useEffect(()=>{
        getRelatorios();
      },[])

      async function deleteRelatorio(id) {
        await axios.delete(`/relatorios/${id}`)
        .then((response)=>{
          alert(response.data);      
          navigate("/relatorios");
          document.location.reload(true);     
        }).catch((err)=>{
          alert(err)
          navigate('/')
        })
      }
   
  return (
    <div className='container'>
        <h1>Relatorios</h1>
         {relatorios?.map((relatorio)=>(
              <div key={relatorio.id} className='cardCultos'>
              <div>
              <span><b>{relatorio.mes} - {relatorio.ano}</b></span>
              <button className='buttonGerenciar'><a href={relatorio.url}>Download</a></button>
              </div>
              <button className='buttonGerenciar' onClick={()=>{openModal();setIdRelatorio(relatorio.id)}}>Editar</button>
              <button className='buttonGerenciar' onClick={()=>{openModal2();setIdRelatorio(relatorio.id)}}>Excluir</button>
              </div>

            ))}
        <button className='buttonGerenciar' onClick={()=>{openModal();setIdRelatorio(null)}}>Adicionar Relatorio</button>

        {modalIsOpen&&
        <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        >
        <div className='divButton'><button className="buttonClose" onClick={closeModal}>✘</button></div>
        <RelatoriosCadastrar id={idRelatorio}/>
        </Modal>}
        {modal2IsOpen&&
        <Modal
        isOpen={modal2IsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal2}
        style={customStyles}
        >
        <div className='containerExcluir'>
        <h2>Deseja realmente excluir o Relatorio?</h2>
        <div className='buttons'>
        <button className='buttonGerenciar' onClick={()=>deleteRelatorio(idRelatorio)}>Sim</button>
        <button className='buttonGerenciar' onClick={closeModal2}>Não</button>
        </div>
        </div>
        </Modal>}
   </div>
  );
}