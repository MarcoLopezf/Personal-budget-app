import React from 'react'
import { Navigate } from 'react-router-dom';

function RoutesPriv({ children }) {
    
    const user = JSON.parse(localStorage.getItem("user"));

    
  
  return (!!user) ? children : <Navigate to ='/'/>
  
}

export default RoutesPriv