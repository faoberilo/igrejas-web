import axios from 'axios';
import React from 'react';
import Modal from 'react-modal';
import ContatosCadastrar from '../components/ContatosCadastrar';

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

export default function Contatos() {
  const [contatos,setContatos]= React.useState([])
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modal2Visible, setModal2Visible] = React.useState(false);
  const [idContato,setIdContato] = React.useState(0);

  const getContatos = async ()=>{
    await axios.get(`contatos/listar`).then((response)=>{
      setContatos(response.data)
    }).catch((err)=>{
      alert(err)      
    })
  }

  React.useEffect(() => {
   getContatos();
  }, []);
  
  async function deleteContato(id) {   
    await axios.delete(`/contatos/${id}`)
    .then((response)=>{
      getContatos();
      setModal2Visible(false);
      alert(response.data);
    }).catch((err)=>{
      alert(err)
    })
  }
   
  return (
    <div className='container'>
        {contatos?.map((contato)=>(
            <div key={contato.id} className='cardCultos'>
              <div className='divCultos'>
              <span ><b>Bairro:</b> {contato.bairro}</span>
              <span ><b>Responsável:</b> {contato.responsavel}</span>
              <span ><b>Endereço:</b> {contato.endereco}</span>
              </div>
              <div style={{flexDirection:'row'}}>
              <button className='buttonGerenciar' onClick={()=>{setIdContato(contato.id);setModal2Visible(true)}}>Excluir</button>
              <button className='buttonGerenciar' onClick={()=>{setIdContato(contato.id);setModalVisible(true)}} >Editar</button>
              </div>
            </div>
          ))}
      <button className='buttonGerenciar' onClick={()=>{setModalVisible(true);setIdContato(null)}}>Adicionar Contato</button>

      <Modal isOpen={modalVisible} ariaHideApp={false} onRequestClose={()=>setModalVisible(false)} style={customStyles} >
        <div className='divButton'><button className="buttonClose" onClick={()=>setModalVisible(false)}>✘</button></div>
        <ContatosCadastrar id={idContato}/>
      </Modal>

      <Modal isOpen={modal2Visible} ariaHideApp={false} onRequestClose={()=>setModal2Visible(false)} style={customStyles} >
        <div className='containerExcluir'>
        <h2>Deseja realmente excluir o Contato?</h2>
        <div className='buttons'>
        <button className='buttonGerenciar' onClick={()=>deleteContato(idContato)}>Sim</button>
        <button className='buttonGerenciar' onClick={()=>setModal2Visible(false)}>Não</button>
        </div>
        </div>
      </Modal>





   </div>

  );
}

