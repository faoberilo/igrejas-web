import axios from 'axios';
import React from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import image from '../assets/imgplaceholder.png'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '30%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background:'rgb(80,80,80)',
    padding:'1%',
    flexDirection: 'column',
    width: 'fit-content'
}}

export default function Galeria() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modal2Visible, setModal2Visible] = React.useState(false);
  const [pastas, setPastas] = React.useState([]);
  const [idPasta,setIdPasta] = React.useState(null);
  const [videos, setVideos] = React.useState([]);
  const [videoId, setVideoId] = React.useState(null);

  const getPastas = async ()=>{
    await axios.get(`/imagens/listarpastas`).then((response)=>{
      setPastas(response.data)
    }).catch((err)=>{
      alert(err)
    })
  }
  const getVideos = async ()=>{
    await axios.get(`/videos/listar`).then((response)=>{
      setVideos(response.data)
    }).catch((err)=>{
      alert(err)
    })
  }

  React.useEffect(() => {
      getPastas();
      getVideos();
    }, []);

  async function deletePasta(id) {
    await axios.delete(`/imagens/pasta/${id}`)
    .then((response)=>{
      getPastas();
      setModalVisible(false);
      alert(response.data);      
    }).catch((err)=>{
      console.log(err)
      alert(err)
    })
  }
  async function deleteVideo(id) {
   
    await axios.delete(`/videos/${id}`)
    .then((response)=>{
      getVideos();
      setModal2Visible(false);
      alert(response.data);
    }).catch((err)=>{
      console.log(err)
      alert(err)
    })  
  }
   
  return (
    <div className='container'>
      <h1>Fotos</h1>
      <div className='containerGaleria'>
      {pastas?.map((pasta)=>(
              <div className='divGaleria' key={pasta.id}>                
                <Link to={`/galeriadetalhes/${pasta.nome}`} ><img className='pasta' src={image} alt={pasta.nome}  /></Link>
                <span>{pasta.nome} - {pasta.data}</span>
                <button class='buttonGerenciar' onClick={()=>{setModalVisible(true);setIdPasta(pasta.id)}}>Excluir</button>                
              </div>
            ))}
      </div>
      <Link to="/galeriacadastrar"><button className='buttonGerenciar'>Adicionar Nova Galeria</button></Link>

      

      <h1>Videos</h1>
      <div className='containerGaleria'>
      {videos?.map((video)=>(
              <div className='divGaleria' key={video.id}>                
               <iframe width="224" height="126" src={`https://www.youtube.com/embed/${video.videoId}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen={true}></iframe>
                <span> {video.titulo}</span>
                <button class='buttonGerenciar' onClick={()=>{setModal2Visible(true);setVideoId(video.id)}}>Excluir</button>                
              </div>
            ))}
      </div>
      <Link to="/galeriacadastrar"><button className='buttonGerenciar'>Adicionar Novo Vídeo</button></Link>


        <Modal isOpen={modalVisible} ariaHideApp={false} onRequestClose={()=>setModalVisible(false)} style={customStyles} >
        <div className='containerExcluir'>
        <h2>Deseja realmente excluir a pasta?</h2>
        <div className='buttons'>
        <button className='buttonGerenciar' onClick={()=>deletePasta(idPasta)}>Sim</button>
        <button className='buttonGerenciar' onClick={()=>setModalVisible(false)}>Não</button>
        </div>
        </div>
        </Modal>
        <Modal isOpen={modal2Visible} ariaHideApp={false} onRequestClose={()=>setModal2Visible(false)} style={customStyles} >
        <div className='containerExcluir'>
        <h2>Deseja realmente excluir o vídeo?</h2>
        <div className='buttons'>
        <button className='buttonGerenciar' onClick={()=>deleteVideo(videoId)}>Sim</button>
        <button className='buttonGerenciar' onClick={()=>setModal2Visible(false)}>Não</button>
        </div>
        </div>
        </Modal>

   </div>

  );
}

