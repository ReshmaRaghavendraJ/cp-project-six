import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Navbar() 
{
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);
  
      useEffect(() => {
        setActiveTab(location.pathname); // Update active tab on location change
    }, [location.pathname]);
  
      const navLinkStyle = (tab) => ({
          color: activeTab === tab ? 'maroon' : 'white', // Change color based on active tab
          backgroundColor: activeTab === tab ? 'white' : 'transparent',
          fontWeight: 'bold',
          fontSize: '18pt',
          fontFamily: 'serif'
        });  

  return (
    <>
    <div>
    <Nav activeKey={activeTab} variant="tabs"  style={{height:"105px",backgroundColor:"maroon",paddingTop:"50px",paddingLeft:"10px"
    }}>
     <Nav.Item>
       <Nav.Link as={Link} to="/" eventKey="/" style={navLinkStyle('/')}>Home</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link as={Link} to="/About" eventKey="/About" style={navLinkStyle('/About')}>About</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link as={Link} to="/Adminlogin"  eventKey="/Adminlogin" style={navLinkStyle('/Adminlogin')}>Adminlogin</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link as={Link} to="/Userlogin"  eventKey="/Userlogin" style={navLinkStyle('/Userlogin')}>Userlogin</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link as={Link} to="/Employeelogin"  eventKey="/Employeelogin" style={navLinkStyle('/Employeelogin')}>Employeelogin</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link as={Link} to="/Register"  eventKey="/Register" style={navLinkStyle('/Register')}>Register</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link as={Link} to="/Contact" eventKey="/Contact" style={navLinkStyle('/Contact')}>Contact</Nav.Link>
     </Nav.Item>
     <h1 style={{ color: 'white', marginLeft: '1000px', fontStyle: 'italic', fontWeight: 'revert', textShadow: '2px 2px 4px rgba(0.2, 0, 0.3, 0.5)', marginTop: '-50px' }}>InstaCo</h1>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW-qC7-FJRadcDmOHtp1lLZkc_jz7Qi_fZEsAcEc4NPAe21Uz8yJW3CrPvhFGpNHHkBYw&usqp=CAU" alt="logo" width="100px" height="80px" style={{ marginLeft: '1200px', marginTop: '-90px' }} />
   </Nav>
   </div>
   </>
  )
}
