import axios from 'axios';
import React from 'react';
import './style.css'
import { useNavigate } from "react-router-dom";


export default function RelatoriosCadastrar(props) {
  const navigate = useNavigate();
  const [mes,setMes]= React.useState(null)
  const [ano,setAno]=React.useState(null)
  const [url,setUrl]=React.useState(null)
 

  const getRelatorioById = async (id)=>{
    await axios.get(`/relatorios/${id}`).then((response)=>{
      setMes(response.data.mes)
      setAno(response.data.ano)
      setUrl(response.data.url)    
    }).catch((err)=>{
      alert(err)
      navigate('/')
    })
  }

  React.useEffect(()=>{
    if(props.id){
      getRelatorioById(props.id);
    }},[])


  
    const cadastrar = async (event) => {       
      event.preventDefault();     
      const relatorio = {
        mes:mes,
        ano:parseInt(ano),
        url:url
        }
      if(props.id){
      await axios.put(`/relatorios/${props.id}`,relatorio)
      .then(()=>{
        alert("Relatorio editado com sucesso!!!");
        navigate("/relatorios");
        document.location.reload(true);     
      }).catch((err)=>{
        alert(err)
        navigate('/')      
      })
      }else{
      await axios.post(`/relatorios/cadastrar`,relatorio)
      .then(()=>{
        alert("Relatorio cadastrado com sucesso!!!");
        navigate("/relatorios");
        document.location.reload(true);
      }).catch((err)=>{
        alert(err)
        navigate('/')      
      })
      }
  }   
  return (
    <div className='containerCadastro'>
        {props.id?<h1>Editar Relatorio</h1>:<h1>Cadastro de Relatorio</h1>}
       <form className='formCadastro' onSubmit={cadastrar}>
          <label className='label'>Mês do relatório:<input className='inputCadastro' value={mes} onChange={(event) => setMes(event.target.value)} required/></label>
          <label className='label'>Ano do relatório:<input className='inputCadastro' value={ano} onChange={(event) => setAno(event.target.value)} required/></label>
          <label className='label'>Link do relatório:<input className='inputCadastro' value={url} onChange={(event) => setUrl(event.target.value)} required/></label>         
          <div className='centralButton'><button className='buttonLogin' type="submit" >Salvar</button></div>
       </form>
   </div>

  );
}