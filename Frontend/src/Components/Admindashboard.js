import { Link, Outlet, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import './styles.css'; // Import your CSS file for styling

export default function Admindashboard() {
  const location = useLocation(); // Get the current path

  // Helper function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className='admindash'>
        <h3 className='text-center' style={{ color: "pink", padding: "20px", marginLeft: "150px", marginTop: "-15px" }}>
          Welcome Admin Dashboard !
        </h3>
        <Nav variant="tabs" style={{ marginLeft: "10px", marginTop: "-30px" }}>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/Admindashboard/Addcity"
              active={isActive("/Addcity")}
              className={isActive("/Addcity") ? "active-link" : ""}
              style={{
                color: "white",
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: "16pt"
              }}
            >
              Add City
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/Admindashboard/Addarea"
              active={isActive("/Addarea")}
              className={isActive("/Addarea") ? "active-link" : ""}
              style={{
                color: "white",
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: "16pt"
              }}
            >
              Add Area
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/Admindashboard/Addservices"
              active={isActive("/Addservices")}
              className={isActive("/Addservices") ? "active-link" : ""}
              style={{
                color: "white",
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: "16pt"
              }}
            >
              Add Services
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/Admindashboard/Addemployees"
              active={isActive("/Addemployees")}
              className={isActive("/Addemployees") ? "active-link" : ""}
              style={{
                color: "white",
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: "16pt"
              }}
            >
              Add Employees
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/Admindashboard/Viewworkstatus"
              active={isActive("/Viewworkstatus")}
              className={isActive("/Viewworkstatus") ? "active-link" : ""}
              style={{
                color: "white",
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: "16pt"
              }}
            >
              View Workstatus
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/Admindashboard/Viewfeedback"
              active={isActive("/Viewfeedback")}
              className={isActive("/Viewfeedback") ? "active-link" : ""}
              style={{
                color: "white",
                fontFamily: "serif",
                fontWeight: "bold",
                fontSize: "16pt"
              }}
            >
              View Feedback
            </Nav.Link>
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
      <div className="dashboard-background"></div>
      <Outlet/>
    </>
  );
}
