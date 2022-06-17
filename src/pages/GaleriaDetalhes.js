import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
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

export default function GaleriaDetalhes() {
  const navigate = useNavigate();
  const [imagens, setImagens] = React.useState([]);
  const [idImagem,setIdImagem] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [file, setFile] = React.useState([]);
  const [isLoading,setLoading] = React.useState(false);

  const { nome } = useParams();

  const getImagens = async ()=>{
    await axios.get(`/imagens/listar`).then((response)=>{
      setImagens(response.data)
    }).catch((err)=>{
      alert(err)
    })
  }  
  React.useEffect(()=>{
    getImagens();
  },[])  

  async function deleteImagem(id) {
    setLoading(true);
    await axios.delete(`/imagens/google/${id}`)
    .then((response)=>{
      alert(response.data);
      document.location.reload(true);
      setLoading(false);
    }).catch((err)=>{
      alert(err)
      setLoading(false);
      navigate('/')
    })
  }

  async function upload (event) {
    setLoading(true);
    event.preventDefault();
    for (var i = 0; i < file.length; i++){
      const formData = new FormData();
      formData.append("file", file[i], `${nome}.jpg` );
       axios({
        method: "post",
        url: "imagens/google",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        document.location.reload(true);
        setLoading(false);
      }).catch((err)=>{
        navigate("/")
        alert(err)
        setLoading(false);
      })}  
  }
   
  return (
    <div className='container'>
      <h1>{nome}</h1>
      <div className='containerGaleria'>
      {imagens?.filter((imagens)=>imagens.folder.includes(nome)).map((imagem)=>(
              <div className='divGaleria' key={imagem.id}>                
                <img className='galeria' src={imagem.url} alt={imagem.nome}  />
                <span> Imagem {imagem.id}</span>
                <button class='buttonGerenciar' onClick={()=>{setModalVisible(true);setIdImagem(imagem.id)}}>Excluir</button>                
              </div>
            ))}
      </div>

       <form onSubmit={upload}>  
        <label   class='buttonGerenciar' for='input-file'>Adicionar Galeria</label>
        <input id='input-file' type='file' accept="image/*" multiple="multiple" onChange={(event)=>{setFile(event.target.files)}} />
        <span id='file-name'></span>
           <input class='inputLogin' type='text' value={`${file.length} arquivos selecionados`}/>
        <button class='buttonGerenciar' type='submit'>{ isLoading? <div className='spinner'/> : "Enviar"}</button>
            
      </form>

      <Modal isOpen={modalVisible} ariaHideApp={false} onRequestClose={()=>setModalVisible(false)} style={customStyles} >
        <div className='containerExcluir'>
        <h2>Deseja realmente excluir a imagem?</h2>
        <div className='buttons'>
        <button className='buttonGerenciar' onClick={()=>deleteImagem(idImagem)}>{ isLoading? <div className='spinner'/> : "Sim"}</button>
        <button className='buttonGerenciar' onClick={()=>setModalVisible(false)}>Não</button>
        </div>
        </div>
      </Modal>

   </div>

  );
}

