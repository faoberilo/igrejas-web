import axios from 'axios';
import React from 'react';
import './style.css'
import { useNavigate } from "react-router-dom";


export default function ProjetosCadastrar(props) {
  const navigate = useNavigate();
  const [nome,setNome]= React.useState(null)
  const [objetivos,setObjetivos]=React.useState(null)
  const [participantes,setParticipantes]=React.useState(null)

  const getProjetoById = async (id)=>{
    await axios.get(`/projetos/${id}`).then((response)=>{
      setNome(response.data.nome)
      setObjetivos(response.data.objetivos)
      setParticipantes(response.data.participantes)    
    }).catch((err)=>{
      alert(err)
      navigate('/')
    })
  }

  React.useEffect(()=>{
    if(props.id){
      getProjetoById(props.id);
    }},[])


  
    const cadastrar = async (event) => {       
      event.preventDefault();     
      const projeto = {
        nome:nome,
        objetivos:objetivos,
        participantes:participantes
      }
      if(props.id){
      await axios.put(`/projetos/${props.id}`,projeto)
      .then(()=>{
        alert("Projeto editado com sucesso!!!");
        navigate("/projetos");
        document.location.reload(true);     
      }).catch((err)=>{
        alert(err)
        navigate('/')      
      })
      }else{
      await axios.post(`/projetos/cadastrar`,projeto)
      .then(()=>{
        alert("Projeto cadastrado com sucesso!!!");
        navigate("/projetos");
        document.location.reload(true);
      }).catch((err)=>{
        alert(err)
        navigate('/')      
      })
      }
  }   
  return (
    <div className='containerCadastro'>
        {props.id?<h1>Editar Projeto</h1>:<h1>Cadastro de Projeto</h1>}
       <form className='formCadastro' onSubmit={cadastrar}>
           <label className='label'>Nome do projeto:<input className='inputCadastro' value={nome} onChange={(event) => setNome(event.target.value)} required/></label>
           <label className='label'>Objetivos do projeto:<input className='inputCadastro' value={objetivos} onChange={(event) => setObjetivos(event.target.value)} required/></label>
           <label className='label'>Participantes:<input className='inputCadastro' value={participantes} onChange={(event) => setParticipantes(event.target.value)} required/></label>        
           <div className='centralButton'><button className='buttonLogin' type="submit" >Salvar</button></div>
       </form>
   </div>

  );
}