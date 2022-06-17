import axios from 'axios';
import React from 'react';
import './style.css'

export default function TelefonesCadastrar(props) {
  const [nome,setNome]= React.useState(null)
  const [telefone,setTelefone]= React.useState(null)
  const [isLoading, setLoading] = React.useState(false)


    async function getTelefoneForUpdate () {    
      await axios.get(`/telefones/${props.id}`).then((response)=>{
      setNome(response.data.nome)
      setTelefone(response.data.telefone)
      }).catch((err)=>{
        alert(err)
      })
    }
  
    React.useEffect(()=>{
      if(props.id){
        getTelefoneForUpdate()
      }
      },[])

    const cadastrar = async (event) => {
      setLoading(true)
      event.preventDefault();
      const contato = {
        nome:nome.toUpperCase(),
        telefone:telefone.toUpperCase()
       }
      if(props.id){
        await axios.put(`telefones/${props.id}`, contato)
        .then(()=>{
          alert("Telefone editado com sucesso!!!");
          document.location.reload(true);
          setLoading(false)
        }).catch((err)=>{
          console.log(err)
          alert(err)
          setLoading(false)      
        })
        }else{
          await axios.post(`/telefones/cadastrar`,contato)
          .then((response)=>{
            alert("Telefone cadastrado com sucesso!!!");
            document.location.reload(true);
            setLoading(false)
          }).catch((err)=>{
            console.log(err)
            alert(err)
            setLoading(false)   
          })
          }
       
      }
  return (
    <div className='containerCadastro'>
        {props.id?<h1>Editar Telefone</h1>:<h1>Cadastrar Telefone</h1>}
       <form className='formEquipe' onSubmit={cadastrar}>
           <label className='label'>Nome:<input className='inputEquipe' value={nome} onChange={(event) => setNome(event.target.value)} required/></label>
           <label className='label'>Telefone:<input className='inputEquipe' value={telefone} onChange={(event) => setTelefone(event.target.value)} required/></label>
           <div className='centralButton'><button className='buttonLogin' type="submit" >{ isLoading? <div className='spinner'/> : "Salvar"}</button></div>
       </form>
       

       

       
   </div>
  

  );
}