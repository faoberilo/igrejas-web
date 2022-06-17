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
import Usuarios from './pages/Usuarios';
import Galeria from './pages/Galeria';
import Oracoes from './pages/Oracoes';
import Versiculo from './pages/Versiculo';
import Mensagem from './pages/Mensagem';
import Programacao from './pages/Programacao';
import Ministerio from './pages/Ministerio';
import Equipe from './pages/Equipe';
import Contatos from './pages/Contatos';
import Telefones from './pages/Telefones';
import VideoExplicativo from './pages/VideoExplicativo';
import GaleriaDetalhes from './pages/GaleriaDetalhes';
import GaleriaCadastrar from './pages/GaleriaCadastrar';


axios.defaults.baseURL = "https://igrejas-api-2.herokuapp.com/";
//axios.defaults.baseURL = "http://localhost:3001";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("TOKEN")}`;
  return config;
});

function defineInterceptor(){
  axios.interceptors.response.use(response => {
    return response
  }, err => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config
      if (err.response.status == 401 && err.config && !err.config._retry){
        originalReq._retry = true        
          let res = axios.put(`/token/refresh`, {oldToken: localStorage.getItem("TOKEN")})
          .then((res) => {
            localStorage.setItem("TOKEN", res.data.access_token)
            originalReq.headers["Authorization"] = `Bearer ${res.data.access_token}`
            return axios(originalReq)
          })
          resolve(res)
        
      }else{
        reject(err)
      }
    })
  })
}
defineInterceptor();

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
        <Route path="/oracoes" element={<Oracoes/>} />
        <Route path="/usuarios" element={<Usuarios/>} />
        <Route path="/galeria" element={<Galeria/>} />
        <Route path="/galeriadetalhes/:nome" element={<GaleriaDetalhes/>} />
        <Route path="/galeriacadastrar" element={<GaleriaCadastrar/>} />
        <Route path="/versiculo" element={<Versiculo/>} />
        <Route path="/mensagem" element={<Mensagem/>} />
        <Route path="/programacao" element={<Programacao/>} />
        <Route path="/ministerio" element={<Ministerio/>} />
        <Route path="/equipe" element={<Equipe/>} />
        <Route path="/contatos" element={<Contatos/>} />
        <Route path="/telefones" element={<Telefones/>} />
        <Route path="/explicativo" element={<VideoExplicativo/>} />



      </Routes>
      
    </BrowserRouter>   
  </React.StrictMode>
);

