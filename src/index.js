import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Login from '../src/pages/Login'
import Home from '../src/pages/Home'
import Avisos from './pages/Avisos';
import Navbar from './components/Navbar';
import Cultos from './pages/Cultos';
import Projetos from './pages/Projetos';
import Relatorios from './pages/Relatorios';
import Usuarios from './pages/Usuarios';
import Galeria from './pages/Galeria';


//axios.defaults.baseURL = "https://igrejas-api.herokuapp.com";
axios.defaults.baseURL = "http://localhost:3001";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("TOKEN")}`;
  return config;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/avisos" element={<Avisos/>} />
        <Route path="/cultos" element={<Cultos/>} />
        <Route path="/projetos" element={<Projetos/>} />
        <Route path="/relatorios" element={<Relatorios/>} />
        <Route path="/usuarios" element={<Usuarios/>} />
        <Route path="/galeria" element={<Galeria/>} />
      </Routes>
    </BrowserRouter>   
  </React.StrictMode>
);

