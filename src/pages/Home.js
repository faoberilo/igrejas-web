import React from 'react';
import { Link } from "react-router-dom";

export default function Home() {
   
  return (
    <div className='container'>
     <button className='buttonHome'><Link to="/avisos" className='link'>Gerenciar Avisos</Link></button>
     <button className='buttonHome'><Link to="/cultos" className='link'>Gerenciar Cultos</Link></button>
     <button className='buttonHome'><Link to="/projetos" className='link'>Gerenciar Projetos</Link></button>
     <button className='buttonHome'><Link to="/galeria" className='link'>Gerenciar Galeria</Link></button>
     <button className='buttonHome'><Link to="/relatorios" className='link'>Gerenciar Relatórios</Link></button>
     <button className='buttonHome'><Link to="/usuarios" className='link'>Lista de Usuários</Link></button>
   </div>

  );
}

