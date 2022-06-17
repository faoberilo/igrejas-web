import axios from 'axios';
import React from 'react';
import './style.css'

export default function EquipeCadastrar(props) {
  const [nome,setNome]= React.useState(null)
  const [cargo,setCargo]= React.useState(null)
  const [isLoading, setLoading] = React.useState(false)


    async function getMembroForUpdate () {    
      await axios.get(`/equipe/${props.id}`).then((response)=>{
      setNome(response.data.nome)
      setCargo(response.data.cargo)
      }).catch((err)=>{
        alert(err)
      })
    }
  
    React.useEffect(()=>{
      if(props.id){
        getMembroForUpdate()
      }
      },[])

    const cadastrar = async (event) => {
      setLoading(true)
      event.preventDefault();
      const membro = {
        nome:nome.toUpperCase(),
        cargo:cargo.toUpperCase()
       }
      if(props.id){
        await axios.put(`equipe/${props.id}`,membro)
        .then(()=>{
          console.log(membro)
          setLoading(false)
          alert("Membro editado com sucesso!!!");
          document.location.reload(true);
        }).catch((err)=>{
          setLoading(false)
          console.log(err)
          alert(err)      
        })
        }else{
          await axios.post(`/equipe/cadastrar`,membro)
          .then((response)=>{
            alert("Membro cadastrado com sucesso!!!");
            setLoading(false)
            document.location.reload(true);
          }).catch((err)=>{
            console.log(err)
            alert(err)
            setLoading(false)      
          })
          }
       
      }
  return (
    <div className='containerCadastro'>
        {props.id?<h1>Editar Membro</h1>:<h1>Cadastrar Membro</h1>}
       <form className='formEquipe' onSubmit={cadastrar}>
           <label className='label'>Nome:<input className='inputEquipe' value={nome} onChange={(event) => setNome(event.target.value)} required/></label>
           <label className='label'>Cargo:<input className='inputEquipe' value={cargo} onChange={(event) => setCargo(event.target.value)} required/></label>
           <div className='centralButton'><button className='buttonLogin' type="submit" >{ isLoading? <div className='spinner'/> : "Salvar"}</button></div>
       </form>
       

       

       
   </div>
  

  );
}