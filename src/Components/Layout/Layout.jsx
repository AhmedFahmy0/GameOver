import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';

export default function Layout({crrUser , logOut}) {
  return (
    <>
    <Navbar logOut={logOut} crrUser={crrUser}/>
    <div className='contact-aria'>
    <Outlet/>
    </div>
    </>
  )
}
