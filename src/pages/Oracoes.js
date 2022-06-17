import axios from 'axios';
import React from 'react';
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

export default function Oracoes() {
  const [oracoes,setOracoes]= React.useState([])
  const [modalVisible, setModalVisible] = React.useState(false);
  const [idOracao,setIdOracao] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false)


 
  const getOracoes = async ()=>{
    await axios.get(`/oracoes/listar`)
    .then((response)=>{
    setOracoes(response.data)
    }).catch((err)=>{
      console.log(err)
      alert(err)      
    })
  }
  React.useEffect(()=>{
    getOracoes();
},[])
async function deleteOracao(id) {
    setLoading(true)
    await axios.delete(`/oracoes/${id}`)
    .then((response)=>{
      alert(response.data)
      getOracoes();
      setModalVisible(false);
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
      alert(err)
      setLoading(false)
    })
  }   
  return (
    <div className='container'>
        <h1>Orações</h1>
        {oracoes?.map((oracao)=>(
            <div key={oracao.id} className='cardCultos'>
                <span><b>Nome:</b> {oracao.nome} <b>Oração:</b> {oracao.descricao} </span>
                <button className='buttonGerenciar' onClick={()=>{setModalVisible(true);setIdOracao(oracao.id)}}>Excluir</button>
            </div>
        ))}        
        <Modal isOpen={modalVisible} ariaHideApp={false} onRequestClose={()=>setModalVisible(false)} style={customStyles} >
          <div className='containerExcluir'>
          <h2>Deseja realmente excluir a oração?</h2>
          <div className='buttons'>
          <button className='buttonGerenciar' onClick={()=>deleteOracao(idOracao)}>{ isLoading? <div className='spinner'/> : "Sim"}</button>
          <button className='buttonGerenciar' onClick={()=>setModalVisible(false)}>Não</button>
          </div>
          </div>
        </Modal>
   </div>

  );
}
