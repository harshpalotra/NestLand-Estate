import React from 'react'
import { BrowserRouter , Routes ,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Profile from './Pages/Profile'
import SignUp from './Pages/SignUp.jsx'
import About from './Pages/About.jsx'
import Header from './components/Header.jsx'
import Privaterouting from './components/Privaterouting.jsx'
import CreateListing from './Pages/CreateListing.jsx'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header />
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/sign-in' element={<Signin />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/about'  element= {<About/> }  />
    
    <Route element ={<Privaterouting/>} >
    <Route path='/profile' element={<Profile />} />
    <Route path='/create-listing' element={<CreateListing />} />
    </Route>

   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App