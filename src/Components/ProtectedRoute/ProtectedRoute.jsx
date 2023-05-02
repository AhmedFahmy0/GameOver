import React from 'react'
import Login from '../Login/Login'

export default function ProtectedRoute({userData , saveUserData , children}) {
    if (userData === null) {
        return <Login saveUserData={saveUserData}/>
    }
    else {
        return children
    }
}

