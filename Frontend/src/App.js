import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import { ToastContainer  } from 'react-toastify'
import Login from './Components/Login'
import Register from './Components/Register'
import About from './Components/About'
import Contact from './Components/Contact'
import Books from './Components/Books'
import Clothes from './Components/Clothes'
import Food from './Components/Food'
import Sportsitems from './Components/Sportsitems'
import Admindashboard from './Components/Admindashboard'
import Userdashboard from './Components/Userdashboard'
import Employeesdashboard from './Components/Employeesdashboard'
import Addcity from './Components/Addcity'
import Addarea from './Components/Addarea'
import Addemployees from './Components/Addemployees'
import Addservices from './Components/Addservices'
import Viewfeedback from './Components/Viewfeedback'
import Viewworkstatus from './Components/Viewworkstatus'
import Viewservices from './Components/Viewservices'
import Viewfeed from './Components/Viewfeed'
import Viewstatus from './Components/Viewstatus'
import Addaddress from './Components/Addaddress'
import Adminlogin from './Components/Adminlogin'
import Userlogin from './Components/Userlogin'
import Employeelogin from './Components/Employeelogin'
import 'bootstrap-icons/font/bootstrap-icons.css';



export default function App()
{

  return (
<>
<BrowserRouter>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/About" element={<About/>}/>
  <Route path="/Login" element={<Login/>}/>
  <Route path="/Register" element={<Register/>}/>
  <Route path="/Contact" element={<Contact/>}/>
  <Route path="/Adminlogin" element={<Adminlogin/>}/>
  <Route path="/Userlogin" element={<Userlogin/>}/>
  <Route path="/Employeelogin" element={<Employeelogin/>}/>


  <Route path="/Books" element={<Books/>}/>
  <Route path="/Clothes" element={<Clothes/>}/>
  <Route path="/Food" element={<Food/>}/>
  <Route path="/Sportsitems" element={<Sportsitems/>}/>

  <Route path="Admindashboard" element={<Admindashboard/>}>
  <Route path="Addcity" element={<Addcity />} />
  <Route path="Addarea" element={<Addarea />} />
  <Route path="Addservices" element={<Addservices />} />
  <Route path="Addemployees" element={<Addemployees />} />
  <Route path="Viewworkstatus" element={<Viewworkstatus />} />
  <Route path="Viewfeedback" element={<Viewfeedback />} />
  </Route>

  <Route path="Userdashboard" element={<Userdashboard/>}>
  <Route path="Addaddress" element={<Addaddress />} />
  <Route path="Viewstatus" element={<Viewstatus />} />
  </Route>

  <Route path="Employeesdashboard" element={<Employeesdashboard/>}>
  <Route path="Viewservices" element={<Viewservices />} />
  <Route path="Viewfeed" element={<Viewfeed />} />
  </Route>

</Routes>
</BrowserRouter>
<ToastContainer/>
</>
  )
}
