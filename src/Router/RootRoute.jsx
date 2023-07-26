import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom' 

import React from 'react'
import Home from '../Pages/Home'
import Details from '../Pages/Details'

const Router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path='/' element={<Home/>}/>
        <Route path='details/:country_code' element={<Details/>} />
        </>
    )
)


export default function RootRoute() {
  return (
<RouterProvider router={Router}/>
  )
}
