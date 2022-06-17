import React from 'react';
import { Link } from "react-router-dom";

export default function Home() {
   
  return (
    <div className='container'>
      <div className='homeContainer'>
      <Link to="/avisos" className='link'><button className='buttonHome'>Gerenciar Avisos</button></Link>
      <Link to="/cultos" className='link'><button className='buttonHome'>Gerenciar Cultos</button></Link>
      <Link to="/oracoes" className='link'><button className='buttonHome'>Gerenciar Orações</button></Link>
      <Link to="/galeria" className='link'><button className='buttonHome'>Gerenciar Galeria</button></Link>
      <Link to="/usuarios" className='link'><button className='buttonHome'>Lista de Usuários</button></Link>
      <Link to="/versiculo" className='link'><button className='buttonHome'>Adicionar Versículo</button></Link>
      <Link to="/mensagem" className='link'><button className='buttonHome'>Adicionar Mensagem</button></Link>
      <Link to="/programacao" className='link'><button className='buttonHome'>Adicionar Programação</button></Link>
      <Link to="/ministerio" className='link'><button className='buttonHome'>Gerenciar Ministério</button></Link>
      <Link to="/equipe" className='link'><button className='buttonHome'>Gerenciar Equipe</button></Link>
      <Link to="/contatos" className='link'><button className='buttonHome'>Gerenciar Contatos</button></Link>
      <Link to="/telefones" className='link'><button className='buttonHome'>Gerenciar Telefones</button></Link>
      <Link to="/explicativo" className='link'><button className='buttonHome'>Adicionar Vídeo Explicativo</button></Link>
     </div>
   </div>

  );
}

