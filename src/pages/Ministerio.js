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

export default function Ministerio() {
  const [texto,setTexto]=React.useState(null);
  const [textoOriginal,setTextoOriginal]=React.useState(null);
  const [imagens,setImagens]=React.useState([]);
  const [idImagem,setIdImagem] = React.useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false)



  const getMinisterio = async ()=>{
    await axios.get(`/ministerio`)
    .then((response)=>{
    setTextoOriginal(response.data.texto)
    }).catch((err)=>{
      console.log(err)
      alert(err)      
    })
  }
  const getImagens = async ()=>{
    await axios.get(`/imagens/listar`).then((response)=>{
       setImagens(response.data)
        }).catch((err)=>{
          alert(err)
        })
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  async function deleteImagem(id) {
    await axios.delete(`/imagens/google/${id}`)
    .then((response)=>{
      alert(response.data);      
      document.location.reload(true);     
    }).catch((err)=>{
      alert(err)
    })
  }
  React.useEffect(()=>{
    getMinisterio();
    getImagens();
  },[])

  async function cadastrar (){
    setLoading(true);
    const text = {
      id:1,
      texto:texto
    }
    await axios.post(`/ministerio/cadastrar`,text).then((response)=>{
      document.location.reload(true);
      alert("Biografia cadastrada com sucesso!!!");        
      setLoading(false)
    }).catch((err)=>{
      alert(err)
      setLoading(false)      
    })
  }

  return (
    <div className='container'>
     <h1> Gerenciar Ministério</h1>
     <div className='biografia'>
     <p>{textoOriginal}</p>
     </div>
       <form className='formCadastro' onSubmit={cadastrar}>
           <label className='label'>Biografia:</label>
           <input className='inputCadastro'  value={texto} onChange={(event) => setTexto(event.target.value)} required/>
           <div className='centralButton'><button className='buttonLogin' type="submit" >{ isLoading? <div className='spinner'/> : "Salvar"}</button></div>
       </form>
       <div className='containerGaleria'>
          {imagens?.filter((imagem)=>imagem.folder.includes('ministerio')).map((imagem)=>(
          <div className='divGaleria' key={imagem.id}>                
            <img className='galeria' src={imagem.url} alt={imagem.nome}  />
            <span> Imagem {imagem.id}</span>
            <button class='buttonGerenciar' onClick={()=>{openModal(); setIdImagem(imagem.id)}}>Excluir</button>                
          </div>))}
        </div>
        
        <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        >
        <div className='containerExcluir'>
        <h2>Deseja realmente excluir a imagem?</h2>
        <div className='buttons'>
        <button className='buttonGerenciar' onClick={()=>deleteImagem(idImagem)}>Sim</button>
        <button className='buttonGerenciar' onClick={closeModal}>Não</button>
        </div>
        </div>
        </Modal>



   </div>

  );
}

