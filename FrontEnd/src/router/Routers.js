import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Reagister from '../Pages/Reagister'


const Routers = () => {
  return (
    <Routes>
       <Route path ='/' element={<Navigate to = '/register' />}/>
       <Route path='/register' element={<Reagister/>}/>
    </Routes>
  )
}

export default Routers