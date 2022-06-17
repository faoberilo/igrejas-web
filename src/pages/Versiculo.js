import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";
import './style.css'

export default function Versiculo({navigation}) {
  const navigate = useNavigate();
  const [text,setText]= React.useState(null)
  const [autor,setAutor]= React.useState(null)
  const [capitulo,setCapitulo]= React.useState(null)
  const [numero,setNumero]= React.useState(null)
  const [isLoading, setLoading] = React.useState(false)


  const cadastrar = async (event) => {
    setLoading(true)
    event.preventDefault();
    const leitura = {
      id:1,
      text:text,
      autor:autor,
      capitulo:capitulo,
      numero:numero
     } 
    await axios.post(`/leitura/cadastrar`,leitura)
    .then((response)=>{
      navigate("/home");
      document.location.reload(true);
      setLoading(false);
      alert("Versículo cadastrado com sucesso!!!");
    }).catch((err)=>{
      setLoading(false);
      alert(err)      
    })  
    }
   
  return (
    <div className='container'>
       <h1>Adicionar Versículo</h1>
       <form className='formCadastro' onSubmit={cadastrar}>
           <label className='label'>Texto do Versículo:</label>
           <input className='inputCadastro' value={text} onChange={(event) => setText(event.target.value)} required/>
           <label className='label'>Autor:</label>
           <input className='inputCadastro' value={autor} onChange={(event) => setAutor(event.target.value)} required/>
           <label className='label'>Capitulo:</label>
           <input className='inputCadastro' value={capitulo} onChange={(event) => setCapitulo(event.target.value)} required/>
           <label className='label'>Número do versículo:</label>       
           <input className='inputCadastro' value={numero} onChange={(event) => setNumero(event.target.value)} required/>
           <div className='centralButton'><button className='buttonLogin' type="submit" >{ isLoading? <div className='spinner'/> : "Salvar"}</button></div>
       </form>
   </div>

  );
}

