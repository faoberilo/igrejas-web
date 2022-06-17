import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function GaleriaCadastrar() {
  const navigate = useNavigate();
  const [titulo,setTitulo]= React.useState(null)
  const [tituloVideo,setTituloVideo]= React.useState(null)
  const [data,setData] = React.useState(null)
  const [videoId,setVideoId]= React.useState(null)
  const [isLoading,setLoading]=React.useState(false)
  const [file, setFile] = React.useState([]);

  async function upload (event) {
    setLoading(true);
    event.preventDefault();
    const pasta = {
      nome:titulo,
      data:data[8]+data[9]+"/"+data[5]+data[6]+'/'+data[0]+data[1]+data[2]+data[3]
    }
    await axios.post(`/imagens/pasta`,pasta)
    for (var i = 0; i < file.length; i++){
      const formData = new FormData();
      formData.append("file", file[i], `${titulo}.jpg` );
       axios({
        method: "post",
        url: "imagens/google",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        navigate('/galeria')
        document.location.reload(true);
        setLoading(false);
      }).catch((err)=>{
        alert(err)
        setLoading(false);
      })}  
  }
  async function cadastrar (event){
    setLoading(true);
    event.preventDefault();
    const video = {
      titulo:tituloVideo,
      videoId:videoId
    }
    await axios.post(`/videos/cadastrar`,video).then((response)=>{
      navigate("/galeria");
      setLoading(false)
      document.location.reload(true);
      alert("Vídeo cadastrado com sucesso!!!");   
     
    }).catch((err)=>{
      setLoading(false)
      alert(err)      
    })
  }

  return (
    <div className='container'>
      <h1>Nova Galeria</h1>
      <div className='formCadastro'>
        <label className='label'>Título:<input className='inputCadastro' value={titulo} onChange={(event) => setTitulo(event.target.value)} required/></label>      
        <label className='label'>Data:<input className='inputCadastro' value={data} type='date' onChange={(event) => setData(event.target.value)} required/></label>
      </div>
      <form onSubmit={upload}>  
        <label   class='buttonGerenciar' for='input-file'>Adicionar Galeria</label>
        <input id='input-file' type='file' accept="image/*" multiple="multiple" onChange={(event)=>{setFile(event.target.files)}} />
        <span id='file-name'></span>
           <input class='inputLogin' type='text' value={`${file.length} arquivos selecionados`}/>
        <button class='buttonGerenciar' type='submit'>{ isLoading? <div className='spinner'/> : "Enviar"}</button>
      </form>
      <h1>Novo Vídeo</h1>
       <form className='formCadastro' onSubmit={cadastrar}>
           <label className='label'>Título do video:</label>
           <input className='inputCadastro' value={tituloVideo} onChange={(event) => setTituloVideo(event.target.value)} required/>
           <label className='label'>Código do video:</label>
           <input className='inputCadastro' value={videoId} onChange={(event) => setVideoId(event.target.value)} required/>            

           <div className='centralButton'><button className='buttonLogin' type="submit" >{ isLoading? <div className='spinner'/> : "Salvar"}</button></div>
       </form>

  
      

    
      

   </div>

  );
}

