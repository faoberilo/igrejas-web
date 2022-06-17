import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Mensagem() {
  const navigate = useNavigate();

  const [videoId,setVideoId]= React.useState(null)
  const [isLoading, setLoading] = React.useState(false)


  async function cadastrar (event){
    setLoading(true);
    event.preventDefault();
    const msg = {
      id:1,
      audio:"errado",
      videoId:videoId
    }
    await axios.post(`/videos/mensagem`,msg).then((response)=>{
      navigate("/home");
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
       <h1>Adicionar Mensagem</h1>
       <form className='formCadastro' onSubmit={cadastrar}>
           <label className='label'>Código do video:</label>
           <input className='inputCadastro' value={videoId} onChange={(event) => setVideoId(event.target.value)} required/>
   
           <div className='centralButton'><button className='buttonLogin' type="submit" >{ isLoading? <div className='spinner'/> : "Salvar"}</button></div>
       </form>



   </div>

  );
}

