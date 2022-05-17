import axios from 'axios';
import React from 'react';
import './style.css'
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

export default function UsuariosCadastrar(props) {
  const navigate = useNavigate();  
  const [nome, setNome] = React.useState(null)
  const [email, setEmail] = React.useState(null)
  const [profissao, setProfissao] = React.useState(null)
  const [nascimento, setNascimento] = React.useState(null)
  const [batismo, setBatismo] = React.useState(null)
  const [endereco, setEndereco] = React.useState(null)
  const [conjuge, setConjuge] = React.useState(null)
  const [filhos, setFilhos] = React.useState(null)
  const [cpf, setCpf] = React.useState(null)
  const [senha, setSenha] = React.useState(null)
  const [telefone, setTelefone] = React.useState(null)
  const [diaDizimo,setDiaDizimo] = React.useState(null)
  const [diaLembrete,setDiaLembrete] = React.useState(null)
  const [isAdmin,setIsAdmin] = React.useState(null)

  const getUsuarioById = async (id)=>{
    await axios.get(`/usuario/${id}`).then((response)=>{
      setNome(response.data.nome)
      setEmail(response.data.email)
      setProfissao(response.data.profissao)
      const nascimento = response.data.nascimento;
      setNascimento(nascimento[6]+nascimento[7]+nascimento[8]+nascimento[9]+"-"+nascimento[3]+nascimento[4]+'-'+nascimento[0]+nascimento[1])
      const batismo = response.data.batismo;
      setBatismo(batismo[6]+batismo[7]+batismo[8]+batismo[9]+"-"+batismo[3]+batismo[4]+'-'+batismo[0]+batismo[1])  
      setEndereco(response.data.endereco)
      setConjuge(response.data.conjuge)
      setFilhos(response.data.filhos)
      setCpf(response.data.cpf)
      setSenha(response.data.senha)
      setTelefone(response.data.telefone)
      setDiaDizimo(response.data.diaDizimo)
      setDiaLembrete(response.data.diaLembrete)
      setIsAdmin(response.data.isAdmin)
    }).catch((err)=>{
      alert(err)
      navigate('/')
    })
  }

  React.useEffect(()=>{
    if(props.id){
      getUsuarioById(props.id);
    }},[])


  
    const cadastrar = async (event) => {       
      event.preventDefault();     
      const usuario = {
        nome: nome,
        email: email,
        profissao:profissao,
        nascimento:nascimento[8]+nascimento[9]+"/"+nascimento[5]+nascimento[6]+'/'+nascimento[0]+nascimento[1]+nascimento[2]+nascimento[3],        
        batismo:batismo[8]+batismo[9]+"/"+batismo[5]+batismo[6]+'/'+batismo[0]+batismo[1]+batismo[2]+batismo[3],
        endereco:endereco,
        conjuge:conjuge,
        filhos:filhos,
        cpf: cpf,
        telefone: telefone,
        senha: senha,
        diaDizimo:diaDizimo,
        diaLembrete:diaLembrete,
        isAdmin:isAdmin
      } 
      console.log(usuario)  
      if(props.id){
      await axios.put(`/usuario/${props.id}`,usuario)
      .then(()=>{
        alert("Usuario editado com sucesso!!!");
        navigate("/usuarios");
        document.location.reload(true);     
      }).catch((err)=>{
        alert(err)
        navigate('/')      
      })
      }else{
      await axios.post(`/usuario/cadastrar`,usuario)
      .then(()=>{
        alert("Usuário cadastrado com sucesso!!!");
        navigate("/usuarios");
        document.location.reload(true);
      }).catch((err)=>{
        alert(err)
        navigate('/')      
      })
      }
  }   
  return (
    <div className='containerCadastro'>
        {props.id?<h1 className='title'>Editar Usuário</h1>:<h1 className='title'>Cadastro de Usuario</h1>}
       <form className='formCadastro' onSubmit={cadastrar}>
           <label className='label'>Nome:<input className='inputCadastro' value={nome} onChange={(event) => setNome(event.target.value)} required/></label>
           <label className='label'>Email:<input className='inputCadastro' value={email} onChange={(event) => setEmail(event.target.value)} required/></label>         
           <label className='label'>Data de Nascimento:<input className='inputCadastro' value={nascimento} onChange={(event) => setNascimento(event.target.value)} type='date' required/></label>          
           <label className='label'>Data de Batismo:<input className='inputCadastro' value={batismo} onChange={(event) => setBatismo(event.target.value)} type='date' required/></label>
           <label className='label'>Profissão:<input className='inputCadastro' value={profissao}  onChange={(event) => setProfissao(event.target.value)} required/></label>
           <label className='label'>Endereço:<input className='inputCadastro' value={endereco} onChange={(event) => setEndereco(event.target.value)} required/></label>
           <label className='label'>Conjuge:<input className='inputCadastro' value={conjuge} onChange={(event) => setConjuge(event.target.value)} required/></label>         
           <label className='label'>Filhos:<input className='inputCadastro' value={filhos} onChange={(event) => setFilhos(event.target.value)} required/></label>
           <label className='label'>CPF:<InputMask className='inputCadastro' value={cpf} onChange={(event) => setCpf(event.target.value)} mask="999.999.999-99" required/></label>
           <label className='label'>Telefone:<InputMask className='inputCadastro' value={telefone} onChange={(event) => setTelefone(event.target.value)} mask="(99)99999-9999" required/></label>
           <label className='label'>Dia do Dízimo:<input className='inputDia' value={diaDizimo} onChange={(event) => setDiaDizimo(event.target.value)} type='number' required/></label>
           <label className='label'>Dia do Lembrete:<input className='inputDia' value={diaLembrete} onChange={(event) => setDiaLembrete(event.target.value)} type='number' required/></label>
           <label className='label'>Senha:<input className='inputCadastro' value={senha} onChange={(event) => setSenha(event.target.value)} type='password' required/></label>
           <label className='label'>Tipo de usuário:<select className='inputCadastro' onChange={(event) => setIsAdmin(event.target.value)}>
              <option value={1}>Administrador</option>
              <option value={0}>Usuário Comun</option>
           </select></label>
           <div className='centralButton'><button className='buttonLogin' type="submit" >Salvar</button></div>
       </form>

   </div>

  );
}