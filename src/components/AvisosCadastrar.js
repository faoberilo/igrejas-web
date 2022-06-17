import axios from 'axios';
import React from 'react';
import './style.css'
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


export default function AvisosCadastrar(props) {
  const navigate = useNavigate();
  const [titulo,setTitulo]= React.useState(null);
  const [data,setData] = React.useState(null);
  const [descricao,setDescricao]=React.useState(null);
  const [avisoImg, setAvisoImg] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);  
  
    const cadastrar = async (event) => {
      setLoading(true);       
      event.preventDefault();
      if (avisoImg){
        const formData = new FormData();
        formData.append("file", avisoImg, `aviso-${uuidv4()}.jpg` );
        await axios({
        method: "post",
        url: "avisos/imagem",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const aviso = {
          titulo:titulo,
          descricao:descricao,
          data:data[8]+data[9]+"/"+data[5]+data[6]+'/'+data[0]+data[1]+data[2]+data[3],
          avisoImg:response.data.url,
          nomeImg:response.data.nome,
        }
        
      axios.post(`/avisos/cadastrar`,aviso)
        .then(()=>{
          alert("Aviso cadastrado com sucesso!!!");
          setLoading(false);
          navigate("/avisos");
          document.location.reload(true);                             
      }).catch((err)=>{ setLoading(false);alert(err);console.log(err)});
  
      }).catch((err)=>{
        setLoading(false);
        navigate("/")
        alert(err)
      })
      }else{
        var aviso = {
          titulo:titulo,
          avisoImg:"Aviso sem imagem",
          nomeImg:"Aviso sem imgagem",
          descricao:descricao,
          data:data
          }
          await axios.post(`/avisos/cadastrar`,aviso)
          .then(()=>{
          alert("Aviso cadastrado com sucesso!!!");
          setLoading(false);
          navigate("/avisos");
          document.location.reload(true); 
          }).catch((err)=>{setLoading(false);alert(err);console.log(err)})
        }
  };  
   
  return (
       
    <div className='containerCadastro'>
        <h1>Cadastro de Aviso</h1>
         
          <form className='formCadastro' onSubmit={cadastrar}>
          <label className='label'>Título:<input className='inputCadastro' value={titulo} onChange={(event) => setTitulo(event.target.value)} required/></label>
          <label className='label'>Descrição:<input className='inputCadastro' value={descricao}  onChange={(event) => setDescricao(event.target.value)} required/></label>
          <label className='label'>Data:<input className='inputCadastro' value={data} type='date' onChange={(event) => setData(event.target.value)} required/></label>
          <label   class='buttonGerenciar' for='input-file'>Adicionar Imagem</label>
          <input id='input-file' type='file' accept="image/*" onChange={(event)=>{setAvisoImg(event.target.files[0])}} />
          <span id='file-name'></span>
          {avisoImg? <img className='galeria' src={URL.createObjectURL(avisoImg)} alt={avisoImg}/>:null}
          
          <div className='centralButton'><button className='buttonLogin' type="submit" >{ isLoading? <div className='spinner'/> : "Salvar"} </button></div>
       </form>

   </div>
   
  );
}