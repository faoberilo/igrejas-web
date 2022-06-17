import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Programacao() {
  const navigate = useNavigate();

  const [segunda,setSegunda]= React.useState(null)
  const [terca,setTerca]= React.useState(null)
  const [quarta,setQuarta]= React.useState(null)
  const [quinta,setQuinta]= React.useState(null)
  const [sexta,setSexta]= React.useState(null)
  const [sabado,setSabado]= React.useState(null)
  const [domingo,setDomingo]= React.useState(null)
  const [isLoading, setLoading] = React.useState(false)

  

  async function cadastrar (event){
    event.preventDefault();
    setLoading(true);
    const programacao = {
      id:1,
      segunda:segunda,
      terca:terca,
      quarta:quarta,
      quinta:quinta,
      sexta:sexta,
      sabado:sabado,
      domingo:domingo
    }
    await axios.post(`/programacao/cadastrar`,programacao).then((response)=>{
      navigate("/home");
      setLoading(false)
      document.location.reload(true);
      alert("Programação cadastrada com sucesso!!!");   
    }).catch((err)=>{
      setLoading(false)
      alert(err)      
    })
  }
   
  return (
    <div className='container'>
     <h1>Adicionar Programação da Semana</h1>
       <form className='formProgramacao' onSubmit={cadastrar}>
           <label className='label'>Programação de Segunda:</label>
           <input className='inputEquipe'  value={segunda} onChange={(event) => setSegunda(event.target.value)} required/>
           <label className='label'>Programação de Terça:</label>
           <input className='inputEquipe'  value={terca} onChange={(event) => setTerca(event.target.value)} required/>
           <label className='label'>Programação de Quarta:</label>
           <input className='inputEquipe'  value={quarta} onChange={(event) => setQuarta(event.target.value)} required/>
           <label className='label'>Programação de Quinta:</label>
           <input className='inputEquipe'  value={quinta} onChange={(event) => setQuinta(event.target.value)} required/>
           <label className='label'>Programação de Sexta:</label>
           <input className='inputEquipe'  value={sexta} onChange={(event) => setSexta(event.target.value)} required/>
           <label className='label'>Programação de Sábado:</label>
           <input className='inputEquipe'  value={sabado} onChange={(event) => setSabado(event.target.value)} required/>
           <label className='label'>Programação de Domingo:</label>
           <input className='inputEquipe'  value={domingo} onChange={(event) => setDomingo(event.target.value)} required/>
   
           <div className='centralButton'><button className='buttonLogin' type="submit" >{ isLoading? <div className='spinner'/> : "Salvar"}</button></div>
       </form>




   </div>

  );
}

