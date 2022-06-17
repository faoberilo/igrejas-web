import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function VideoExplicativo() {
  const navigate = useNavigate();

  const [videoId,setVideoId]= React.useState(null)
  const [isLoading, setLoading] = React.useState(false)

  async function cadastrar (event){
    setLoading(true);
    event.preventDefault();
    const video = {
      id:1,
      videoId:videoId
    }
    await axios.post(`/videos/explicativo`,video).then((response)=>{
      navigate("/home");
      document.location.reload(true);
      setLoading(false)
      alert("Vídeo cadastrado com sucesso!!!");
    }).catch((err)=>{
      alert(err)
      setLoading(false)      
    })
  }
   
  return (
    <div className='container'>
       <h1>Adicionar Vídeo</h1>
       <form className='formCadastro' onSubmit={cadastrar}>
           <label className='label'>Código do video:</label>
           <input className='inputCadastro' value={videoId} onChange={(event) => setVideoId(event.target.value)} required/>
   
           <div className='centralButton'><button className='buttonLogin' type="submit" >{ isLoading? <div className='spinner'/> : "Salvar"}</button></div>
       </form>



   </div>

  );
}

