import React from "react";
import { Route,Routes } from "react-router-dom";
import Create from "../components/Create";
import Edit from "../components/Edit";
import Home from "../components/Home.js";
import Landing from "../components/landing";
import LogIn from "../components/LogIn";
import Register from "../components/Register";

export  const AppRoutes=()=>{
        return(
            <>
            <Routes>
                <Route path='/' element={<Landing/>}/>
                <Route path='/login' element={<LogIn/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/create' element={<Create/>}/>
                <Route path='/edit/:id' element={<Edit/>}/>
            </Routes>
            </>
        )
    }

