/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {  createHashRouter, RouterProvider } from "react-router-dom";
import Register from "../Register/Register";
import Layout from '../Layout/Layout';
import Login from '../Login/Login';
import Home from '../Home/Home';
import All from '../All/All';
import GameDetails from '../GameDetails/GameDetails';
import jwtDecode from 'jwt-decode';
import GamesBy from '../GamesBy/GamesBy';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../NotFound/NotFound';


export default function App() {

const [loggedInUser, setloggedInUser] = useState(null)

function getLoginUser(){
    if (localStorage.getItem("tkn") != null) {
        let tkn  = localStorage.getItem("tkn")
        let userData =  jwtDecode( tkn )
        setloggedInUser(userData)
    }
}

function removeUserData(){
    localStorage.removeItem('tkn')
    setloggedInUser(null)
}

useEffect(function(){
    checkReload()
},[] )

function checkReload(){
    if (localStorage.getItem("tkn") != null && loggedInUser === null ) {
        getLoginUser()
    }
}


    let router = createHashRouter([
        {path:"" , element:<Layout logOut={removeUserData} crrUser={loggedInUser}/> , children:[
            {path:"login" , element:<Login saveUserData={getLoginUser}/>},
            {path:"register" , element:<Register/>},
            {path:"/home" , element:  <Home userData={loggedInUser} saveUserData={getLoginUser} /> },
            {path:true , element:  <Home userData={loggedInUser} saveUserData={getLoginUser} /> },
            {path:"all-games" , element:  <All userData={loggedInUser} saveUserData={getLoginUser} /> },
            {path:"game-details/:id" , element:  <GameDetails userData={loggedInUser} saveUserData={getLoginUser} /> },
            {path:"platforms/:platf" , element:  <GamesBy userData={loggedInUser} saveUserData={getLoginUser} /> },
            {path:"category/:cat" , element:  <GamesBy userData={loggedInUser} saveUserData={getLoginUser} /> },
            {path:"'sort-by'/:sort" , element:  <GamesBy userData={loggedInUser} saveUserData={getLoginUser} /> },
            {path:"*" , element:<NotFound/>},
        ]}
    ])


return(
<>
<RouterProvider router={router}/>
</>
)
;
}
