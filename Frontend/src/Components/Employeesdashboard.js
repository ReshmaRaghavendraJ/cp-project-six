import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import { useLocation } from 'react-router-dom';

export default function Employeesdashboard()
 {
  const location = useLocation(); // Get the current path

  // Helper function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
    <div className='admindash'>
    <h3 className='text-center' style={{ color: "pink", padding: "20px", marginLeft: "150px", marginTop: "-15px" }}>
          Welcome Employee Dashboard !
        </h3>
        <Nav variant="tabs" style={{ marginLeft: "10px", marginTop: "-30px" }}>
    <Nav.Item>
        <Nav.Link as={Link} to="/Employeesdashboard/Viewservices"    active={isActive("/Addcity")}
              className={isActive("/Addcity") ? "active-link" : ""}  style={{color:"white",fontFamily:"serif",fontWeight:"bold",fontSize:"16pt"}}>View Services</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Employeesdashboard/Viewfeed"     active={isActive("/Addcity")}
              className={isActive("/Addcity") ? "active-link" : ""}style={{color:"white",fontFamily:"serif",fontWeight:"bold",fontSize:"16pt"}}>View Feedback</Nav.Link>
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
    </div>
    <div className="empdashboard-background"></div>
    <Outlet/>
    </>
  )
}
