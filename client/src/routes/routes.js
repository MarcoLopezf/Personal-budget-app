import React from "react";
import { Route,Routes } from "react-router-dom";
import Create from "../components/Create";
import Edit from "../components/Edit";
import Home from "../components/Home";
import Landing from "../components/landing";
import LogIn from "../components/LogIn";
import Register from "../components/Register";
import RoutesPriv from "../components/RoutesPriv";

export  const AppRoutes=()=>{
        return(
            <>
            <Routes>
                <Route path='*' element={<Landing/>}/>
                <Route path='/login' element={<LogIn/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/home' element={<RoutesPriv><Home/></RoutesPriv>}/>
                <Route path='/create' element={<RoutesPriv><Create/></RoutesPriv>}/>
                <Route path='/edit/:id' element={<RoutesPriv><Edit/></RoutesPriv>}/>
            </Routes>
            </>
        )
    }

