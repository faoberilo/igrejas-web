import axios from 'axios';
import React from 'react';
import EquipeCadastrar from '../components/EquipeCadastrar';
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

export default function Equipe() {
  const [equipe,setEquipe]= React.useState([])
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modal2Visible, setModal2Visible] = React.useState(false);
  const [idMembro,setIdMembro] = React.useState(0);

  const getEquipe = async ()=>{
    await axios.get(`equipe/listar`).then((response)=>{
      setEquipe(response.data)
    }).catch((err)=>{
      alert(err)      
    })
  }

  React.useEffect(() => {
   getEquipe();
  }, []);
  
  async function deleteMembro(id) {   
    await axios.delete(`/equipe/${id}`)
    .then((response)=>{
      getEquipe();
      setModal2Visible(false);
      alert(response.data);
    }).catch((err)=>{
      alert(err)
    })
  }
   
  return (
    <div className='container'>
        {equipe?.map((membro)=>(
            <div key={membro.id} className='cardCultos'>
              <div className='divCultos'>
              <span ><b>Nome:</b> {membro.nome}</span>
              <span ><b>Cargo:</b> {membro.cargo}</span>
              </div>
              <div style={{flexDirection:'row'}}>
              <button className='buttonGerenciar' onClick={()=>{setIdMembro(membro.id);setModal2Visible(true)}}>Excluir</button>
              <button className='buttonGerenciar' onClick={()=>{setIdMembro(membro.id);setModalVisible(true)}} >Editar</button>
              </div>
            </div>
          ))}
      <button className='buttonGerenciar' onClick={()=>{setModalVisible(true);setIdMembro(null)}}>Adicionar Membro</button>

      <Modal isOpen={modalVisible} ariaHideApp={false} onRequestClose={()=>setModalVisible(false)} style={customStyles} >
        <div className='divButton'><button className="buttonClose" onClick={()=>setModalVisible(false)}>✘</button></div>
        <EquipeCadastrar id={idMembro}/>
      </Modal>

      <Modal isOpen={modal2Visible} ariaHideApp={false} onRequestClose={()=>setModal2Visible(false)} style={customStyles} >
        <div className='containerExcluir'>
        <h2>Deseja realmente excluir o membro?</h2>
        <div className='buttons'>
        <button className='buttonGerenciar' onClick={()=>deleteMembro(idMembro)}>Sim</button>
        <button className='buttonGerenciar' onClick={()=>setModal2Visible(false)}>Não</button>
        </div>
        </div>
      </Modal>





   </div>

  );
}

