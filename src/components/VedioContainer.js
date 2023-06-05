import React, { useState,useEffect } from 'react'
import { YOUTUBE_VEDIO_API } from '../utils/constants'
import VedioCard from './VedioCard'
import { Link } from 'react-router-dom';

const VedioContainer = () => {

  console.log("here3");
  const [vedios,setVedios] = useState([]);
  const [loading,setLoading] = useState(true);

  
  useEffect(() => {
    getVedios()
  },[]);


  const getVedios = async () => {
    const data = await fetch(YOUTUBE_VEDIO_API);
    const json = await data.json();
    console.log(json.items)
     setVedios(json.items);
     setLoading(false)
  };
  if(loading) return

  return (
    <div className='flex flex-wrap'>

      {vedios.map((video) =>(
      <Link to={"/watch?v="+video.id}> <VedioCard key ={video.id} info={video} /> </Link>
     ) )}
      
    </div>
  );
}

export default VedioContainer