import axios from 'axios';
import React from 'react';
import './style.css'
import { useNavigate } from "react-router-dom";


export default function AvisosCadastrar(props) {
  const navigate = useNavigate();
  const [titulo,setTitulo]= React.useState(null)
  const [data,setData] = React.useState(null)
  const [descricao,setDescricao]=React.useState(null)

  const getAvisoById = async (id)=>{
    await axios.get(`/avisos/${id}`).then((response)=>{
      setTitulo(response.data.titulo)
      setDescricao(response.data.descricao)
      const data = response.data.data;
      setData(data[6]+data[7]+data[8]+data[9]+"-"+data[3]+data[4]+'-'+data[0]+data[1])      
    }).catch((err)=>{
      alert(err)
      navigate('/')
    })
  }

  React.useEffect(()=>{
    if(props.id){
      getAvisoById(props.id);
    }},[])


  
    const cadastrar = async (event) => {       
      event.preventDefault();     
        const aviso = {
          titulo:titulo,
          descricao:descricao,
          data:data[8]+data[9]+"/"+data[5]+data[6]+'/'+data[0]+data[1]+data[2]+data[3]
        }
      if(props.id){
      await axios.put(`/avisos/${props.id}`,aviso)
      .then(()=>{
        alert("Aviso editado com sucesso!!!");
        navigate("/avisos");
        document.location.reload(true);     
      }).catch((err)=>{
        alert(err)
        navigate('/')      
      })
      }else{
      await axios.post(`/avisos/cadastrar`,aviso)
      .then(()=>{
        alert("Aviso cadastrado com sucesso!!!");
        navigate("/avisos");
        document.location.reload(true);
      }).catch((err)=>{
        alert(err)
        navigate('/')      
      })
      }
  }
  
   
  return (
    <div className='containerCadastro'>
        {props.id?<h1>Editar Aviso</h1>:<h1>Cadastro de Aviso</h1>}
       <form className='formCadastro' onSubmit={cadastrar}>
          <label className='label'>Título:<input className='inputCadastro' value={titulo} onChange={(event) => setTitulo(event.target.value)} required/></label>
          <label className='label'>Descrição:<input className='inputCadastro' value={descricao}  onChange={(event) => setDescricao(event.target.value)} required/></label>
          <label className='label'>Data:<input className='inputCadastro' value={data} type='date' onChange={(event) => setData(event.target.value)} required/></label>
          <div className='centralButton'><button className='buttonLogin' type="submit" >Salvar</button></div>
       </form>

   </div>

  );
}