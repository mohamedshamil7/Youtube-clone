import React from 'react'
import SideBar from './SideBar'
import MainContainer from './MainContainer'
import { Outlet } from 'react-router-dom';

const Body = () => {
  console.log("here1");

  return (

    <div className='grid grid-flow-col'>
        <SideBar/>
        <Outlet />
    </div>
  )
}

export default Body