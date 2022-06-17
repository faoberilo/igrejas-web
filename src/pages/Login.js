import axios from 'axios';
import React from 'react';
import './style.css'
import { useNavigate } from "react-router-dom";


export default function Login() {
    const [email, setEmail] = React.useState(null);
    const [senha, setSenha] = React.useState(null);
    const [isLoading,setLoading] = React.useState(false);
    const navigate = useNavigate();

    const login = (event) => {
        setLoading(true)
        event.preventDefault();
        const data = {
          username: email,
          password: senha
        }
        axios.post("auth/login", data)
            .then((response) => {
                localStorage.setItem("TOKEN", response.data.access_token);      
                navigate("/home");
                document.location.reload(true);
                setLoading(false);
            }).catch((response) => {
                alert("Algum dado errado")
                navigate("/");
                document.location.reload(true);
                setLoading(false);
                });
    }; 
  return (
   <div className='container'>
       <h1>Login</h1>
       {isLoading? <div className='spinner'/>:<form className='formLogin' onSubmit={login}>
           <input className='inputLogin' type='email' placeholder='Email' onChange={(event) => setEmail(event.target.value)} required/>
           <input className='inputLogin' type='password' placeholder='Senha' onChange={(event) => setSenha(event.target.value)} required/>
           <button className='buttonLogin' type="submit" >Entrar</button>
       </form>}
   </div>

  );
}

