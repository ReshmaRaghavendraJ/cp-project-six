import React from 'react'
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


export default function Userdashboard() 
{
  const location = useLocation(); // Get the current path

  // Helper function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  
  return (
    <>
      <div className='admindash'>
      <h3 className='text-center' style={{ color: "pink", padding: "20px", marginLeft: "150px", marginTop: "-15px" }}>
          Welcome User Dashboard !
        </h3>
        <Nav variant="tabs" style={{ marginLeft: "10px", marginTop: "-30px" }}>
        <Nav.Item>
      <Nav.Link as={Link} to="/Userdashboard/Addaddress"  active={isActive("/Addcity")}
              className={isActive("/Addcity") ? "active-link" : ""} style={{color:"white",fontFamily:"serif",fontWeight:"bold",fontSize:"16pt"}}>Add Address</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/Userdashboard/Viewstatus"  active={isActive("/Addcity")}
              className={isActive("/Addcity") ? "active-link" : ""}  style={{color:"white",fontFamily:"serif",fontWeight:"bold",fontSize:"16pt"}}>View Status</Nav.Link>
    </Nav.Item>

    <Nav.Item>
            <Nav.Link
              as={Link}
              to="/"
              active={isActive("/")}
              className={isActive("/") ? "active-link" : ""}
              style={{
                color: "white",
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: "16pt"
              }}
            >
              Logout
            </Nav.Link>
          </Nav.Item>
    </Nav>
      </div><br></br>
      <div className="userdashboard-background"></div>
      <Outlet/>
</>
  )}
     
  