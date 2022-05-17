import axios from 'axios';
import React from 'react';
import './style.css'
import { useNavigate } from "react-router-dom";


export default function CultosCadastrar(props) {
  const navigate = useNavigate();
  const [local,setLocal]= React.useState(null)
  const [horario,setHorario]= React.useState(null)
  const [segunda,setSegunda]= React.useState(false)
  const [terca,setTerca]= React.useState(false)
  const [quarta,setQuarta]= React.useState(false)
  const [quinta,setQuinta]= React.useState(false)
  const [sexta,setSexta]= React.useState(false)
  const [sabado,setSabado]= React.useState(false)
  const [domingo,setDomingo]= React.useState(false)

  const getCultoById = async (id)=>{
    await axios.get(`/cultos/${id}`).then((response)=>{
      setLocal(response.data.local)
      setHorario(response.data.horario)
      setSegunda(response.data.segunda)
      setTerca(response.data.terca)
      setQuarta(response.data.quarta)
      setQuinta(response.data.quinta)
      setSexta(response.data.sexta)
      setSabado(response.data.sabado)
      setDomingo(response.data.domingo)     
    }).catch((err)=>{
      alert(err)
      navigate('/')
    })
  }

  React.useEffect(()=>{
    if(props.id){
      getCultoById(props.id);
    }},[])


  
    const cadastrar = async (event) => {       
      event.preventDefault();     
      const culto = {
        local:local,
        horario:horario,
        segunda:segunda,
        terca:terca,
        quarta:quarta,
        quinta:quinta,
        sexta:sexta,
        sabado:sabado,
        domingo:domingo
       }
      if(props.id){
      await axios.put(`/cultos/${props.id}`,culto)
      .then(()=>{
        alert("Culto editado com sucesso!!!");
        navigate("/cultos");
        document.location.reload(true);     
      }).catch((err)=>{
        alert(err)
        navigate('/')      
      })
      }else{
      await axios.post(`/cultos/cadastrar`,culto)
      .then(()=>{
        alert("Culto cadastrado com sucesso!!!");
        navigate("/cultos");
        document.location.reload(true);
      }).catch((err)=>{
        alert(err)
        navigate('/')      
      })
      }
  }
  
   
  return (
    <div className='containerCadastro'>
        {props.id?<h1>Editar Culto</h1>:<h1>Cadastro de Culto</h1>}
       <form className='formCadastro' onSubmit={cadastrar}>
           <label className='label'>Local:<input className='inputCadastro' value={local} onChange={(event) => setLocal(event.target.value)} required/></label>
           <label className='label'>Horário:<input className='inputCadastro' type='time' value={horario} placeholder='Horario' onChange={(event) => setHorario(event.target.value)} required/></label>
           <div>
           <div className='divCheck'><input type='checkbox' value={segunda} checked={segunda} onClick={() => setSegunda(!segunda)}></input><label className='label'>Segunda-Feira</label></div>
           <div className='divCheck'><input type='checkbox' value={terca}   checked={terca} onClick={() => setTerca(!terca)}></input ><label className='label'>Terça-Feira</label></div>
           <div className='divCheck'><input type='checkbox' value={quarta} checked={quarta} onClick={() => setQuarta(!quarta)}></input><label className='label'>Quarta-Feira</label></div>
           <div className='divCheck'><input type='checkbox' value={quinta} checked={quinta} onClick={() => setQuinta(!quinta)}></input><label className='label'>Quinta-Feira</label></div>
           <div className='divCheck'><input type='checkbox' value={sexta} checked={sexta} onClick={() => setSexta(!sexta)}></input><label className='label'>Sexta-Feira</label></div>
           <div className='divCheck'><input type='checkbox' value={sabado} checked={sabado} onClick={() => setSabado(!sabado)}></input><label className='label'>Sábado</label></div>
           <div className='divCheck'><input type='checkbox' value={domingo} checked={domingo} onClick={() => setDomingo(!domingo)}></input><label className='label'>Domingo</label></div>
           </div>
           <div className='centralButton'><button className='buttonLogin' type="submit" >Salvar</button></div>
       </form>

   </div>

  );
}