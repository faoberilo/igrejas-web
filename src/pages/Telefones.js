import axios from 'axios';
import React from 'react';
import TelefonesCadastrar from '../components/TelefonesCadastrar';
import Modal from 'react-modal';

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

export default function Telefones() {
  const [telefones,setTelefones]= React.useState([])
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modal2Visible, setModal2Visible] = React.useState(false);
  const [idTelefone,setIdTelefone] = React.useState(0);

  const getTelefones = async ()=>{
    await axios.get(`telefones/listar`).then((response)=>{
      setTelefones(response.data)
    }).catch((err)=>{
      alert(err)      
    })
  }

  React.useEffect(() => {
   getTelefones();
  }, []);
  
  async function deleteTelefone(id) {   
    await axios.delete(`/telefones/${id}`)
    .then((response)=>{
      getTelefones();
      setModal2Visible(false);
      alert(response.data);
    }).catch((err)=>{
      alert(err)
    })
  }
   
  return (
    <div className='container'>
        {telefones?.map((telefone)=>(
            <div key={telefone.id} className='cardCultos'>
              <div className='divCultos'>
              <span ><b>Nome:</b> {telefone.nome}</span>
              <span ><b>Número:</b> {telefone.telefone}</span>
              </div>
              <div style={{flexDirection:'row'}}>
              <button className='buttonGerenciar' onClick={()=>{setIdTelefone(telefone.id);setModal2Visible(true)}}>Excluir</button>
              <button className='buttonGerenciar' onClick={()=>{setIdTelefone(telefone.id);setModalVisible(true)}} >Editar</button>
              </div>
            </div>
          ))}
      <button className='buttonGerenciar' onClick={()=>{setModalVisible(true);setIdTelefone(null)}}>Adicionar Telefone</button>

      <Modal isOpen={modalVisible} ariaHideApp={false} onRequestClose={()=>setModalVisible(false)} style={customStyles} >
        <div className='divButton'><button className="buttonClose" onClick={()=>setModalVisible(false)}>✘</button></div>
        <TelefonesCadastrar id={idTelefone}/>
      </Modal>

      <Modal isOpen={modal2Visible} ariaHideApp={false} onRequestClose={()=>setModal2Visible(false)} style={customStyles} >
        <div className='containerExcluir'>
        <h2>Deseja realmente excluir o Telefone?</h2>
        <div className='buttons'>
        <button className='buttonGerenciar' onClick={()=>deleteTelefone(idTelefone)}>Sim</button>
        <button className='buttonGerenciar' onClick={()=>setModal2Visible(false)}>Não</button>
        </div>
        </div>
      </Modal>





   </div>

  );
}

