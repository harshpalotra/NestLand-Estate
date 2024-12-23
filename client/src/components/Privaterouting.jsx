import React from 'react'
import { Outlet ,Navigate } from 'react-router-dom';

// Outlet is used in a parent route to render child routes
import { useSelector } from 'react-redux'
const Privaterouting = () => {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? <Outlet /> : <Navigate to='/sign-in' />

}

export default Privaterouting