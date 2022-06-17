import axios from 'axios';
import React from 'react';
import './style.css'

export default function ContatosCadastrar(props) {
  const [bairro,setBairro]= React.useState(null)
  const [responsavel,setResponsavel]= React.useState(null)
  const [endereco,setEndereco]= React.useState(null)
  const [isLoading, setLoading] = React.useState(false)

    async function getContatoForUpdate () {    
      await axios.get(`/contatos/${props.id}`).then((response)=>{
      setBairro(response.data.bairro)
      setResponsavel(response.data.responsavel)
      setEndereco(response.data.endereco)
      }).catch((err)=>{
        alert(err)
      })
    }
  
    React.useEffect(()=>{
      if(props.id){
        getContatoForUpdate()
      }
      },[])

    const cadastrar = async (event) => {
      event.preventDefault();
      setLoading(true)
      const contato = {
        bairro:bairro.toUpperCase(),
        responsavel:responsavel.toUpperCase(),
        endereco:endereco.toUpperCase()
       }
      if(props.id){
        await axios.put(`contatos/${props.id}`,contato)
        .then(()=>{
          alert("Contato editado com sucesso!!!");
          setLoading(false)
          document.location.reload(true);
        }).catch((err)=>{
          console.log(err)
          alert(err)
          setLoading(false)      
        })
        }else{
          await axios.post(`/contatos/cadastrar`,contato)
          .then((response)=>{
            alert("Contato cadastrado com sucesso!!!");
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
        {props.id?<h1>Editar Contato</h1>:<h1>Cadastrar Contato</h1>}
       <form className='formEquipe' onSubmit={cadastrar}>
           <label className='label'>Bairro:<input className='inputEquipe' value={bairro} onChange={(event) => setBairro(event.target.value)} required/></label>
           <label className='label'>Responsável:<input className='inputEquipe' value={responsavel} onChange={(event) => setResponsavel(event.target.value)} required/></label>
           <label className='label'>Endereço:<input className='inputEquipe' value={endereco} onChange={(event) => setEndereco(event.target.value)} required/></label>
          
           <div className='centralButton'><button className='buttonLogin' type="submit" >{ isLoading? <div className='spinner'/> : "Salvar"}</button></div>
           
       </form>
   </div>
  

  );
}