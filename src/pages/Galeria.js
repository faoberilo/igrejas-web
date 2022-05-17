import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';



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

export default function Galeria() {
  const navigate = useNavigate();
  const [imagens, setImagens] = React.useState([]);
  const [idImagem,setIdImagem] = React.useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [file, setFile] = React.useState([]);


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
      navigate("/galeria");
      document.location.reload(true);     
    }).catch((err)=>{
      alert(err)
      navigate('/')
    })
  }

  async function upload (event) {
    event.preventDefault();
    for (var i = 0; i < file.length; i++){
      const formData = new FormData();
      formData.append("file", file[i], `imagem-${uuidv4()}.jpg` );
       axios({
        method: "post",
        url: "imagens/google",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        navigate("/galeria");
        document.location.reload(true);
      }).catch((err)=>{
        navigate("/")
        alert(err)
      })}  
  }
   
  return (
    <div className='container'>
      <h1>Galeria</h1>
      <div className='containerGaleria'>
      {imagens?.map((imagem)=>(
              <div className='divGaleria' key={imagem.id}>                
                <img className='galeria' src={imagem.url} alt={imagem.nome}  />
                <span> Imagem {imagem.id}</span>
                <button class='buttonGerenciar' onClick={()=>{openModal();setIdImagem(imagem.id)}}>Excluir</button>                
              </div>
            ))}
      </div>

       <form onSubmit={upload}>  
        <label   class='buttonGerenciar' for='input-file'>Adicionar Galeria</label>
        <input id='input-file' type='file' accept="image/*" multiple="multiple" onChange={(event)=>{setFile(event.target.files)}} />
        <span id='file-name'></span>
           <input class='inputLogin' type='text' value={`${file.length} arquivos selecionados`}/>
        <button class='buttonGerenciar' type='submit'>Enviar</button>
            
      </form>

      {modalIsOpen&&
        <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        >
        <div className='containerExcluir'>
        <h2>Deseja realmente excluir o projeto?</h2>
        <div className='buttons'>
        <button className='buttonGerenciar' onClick={()=>deleteImagem(idImagem)}>Sim</button>
        <button className='buttonGerenciar' onClick={closeModal}>Não</button>
        </div>
        </div>
        </Modal>}

   </div>

  );
}

