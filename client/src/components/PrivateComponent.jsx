import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () => {
  const auth = localStorage.getItem('user');

  // allow private pages to be called only if user is authenticated
  return auth ? <Outlet/>:<Navigate to='/'/>
}

export default PrivateComponent