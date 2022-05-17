import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CultosCadastrar from '../components/CultosCadastrar';
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

export default function Cultos() {
    const navigate = useNavigate();
    const [cultos,setCultos]= React.useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modal2IsOpen, set2IsOpen] = React.useState(false);
    const [idCulto,setIdCulto] = React.useState(null);

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


    const getCultos = async ()=>{
        await axios.get(`/cultos/listar`).then((response)=>{
          setCultos(response.data)
        }).catch((err)=>{
          alert(err)
          navigate('/')
        })
      }
    
      React.useEffect(()=>{
        getCultos();
      },[])

      async function deleteCulto(id) {
        await axios.delete(`/cultos/${id}`)
        .then((response)=>{
          alert(response.data);      
          navigate("/cultos");
          document.location.reload(true);     
        }).catch((err)=>{
          alert(err)
          navigate('/')
        })
      }
   
  return (
    <div className='container'>
        <h1>Cultos</h1>
         {cultos?.map((culto)=>(
              <div key={culto.id} className='cardCultos'>
              <div className='divCultos'>
              <span><b>Local:</b> {culto.local} </span>
              <span><b>Horário:</b> {culto.horario} </span>
              <span><b>Dias:</b> {culto.segunda?"Segunda, ":null}
              {culto.terca?"Terça, ":null}
              {culto.quarta?"Quarta, ":null}
              {culto.quinta?"Quinta, ":null}
              {culto.sexta?"Sexta, ":null}
              {culto.sabado?"Sábado, ":null}
              {culto.domingo?"Domingo, ":null}
              </span>
              </div>
              <button className='buttonGerenciar' onClick={()=>{openModal();setIdCulto(culto.id)}}>Editar</button>
              <button className='buttonGerenciar' onClick={()=>{openModal2();setIdCulto(culto.id)}}>Excluir</button> 
              </div>
            ))}
        <button className='buttonGerenciar' onClick={()=>{openModal();setIdCulto(null)}}>Adicionar culto</button>

        {modalIsOpen&&
        <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        >
        <div className='divButton'><button className="buttonClose" onClick={closeModal}>✘</button></div>
        <CultosCadastrar id={idCulto}/>
        </Modal>}
        {modal2IsOpen&&
        <Modal
        isOpen={modal2IsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal2}
        style={customStyles}
        >
        <div className='containerExcluir'>
        <h2>Deseja realmente excluir o culto?</h2>
        <div className='buttons'>
        <button className='buttonGerenciar' onClick={()=>deleteCulto(idCulto)}>Sim</button>
        <button className='buttonGerenciar' onClick={closeModal2}>Não</button>
        </div>
        </div>
        </Modal>}
   </div>
  );
}