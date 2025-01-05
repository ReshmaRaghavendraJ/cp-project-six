import React from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


export default function Login()
 {
  const [activeTab, setActiveTab] = useState('/');
  const users=["admin","user","employees"];
  const[usertypes,setUsertypes]=useState('');
  const[userid,setUserid]=useState('');
  const[password,setPassword]=useState('');
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation();



  useEffect(() => {
    setActiveTab(location.pathname); // Update active tab on location change
}, [location.pathname]);

const navLinkStyle = (tab) => ({
  color: activeTab === tab ? 'purple' : 'white', // Change color based on active tab
  backgroundColor: activeTab === tab ? 'white' : 'transparent',
  fontWeight: 'bold',
  fontSize: '18pt',
  fontFamily: 'serif',
});

    function logincheck()
    {
      if(usertypes==="")
      {
        toast.error("Please choose usertypes");
        return;
      }
      if(userid==="")
        {
          toast.error("please enter userid");
          return;
        }
        if(password==="")
          {
            toast.error("please enter password");
            return;
          }
      if(usertypes==="admin" || usertypes==="Admin")
      {
      axios
      .get(`http://localhost:8080/adminlogin/${userid}/${password}`)
      .then((res)=>{
        toast.success(res.data);
        clearAll();
        navigate('/Admindashboard'); 
      })
      .catch((err)=>{
        toast.error(err.response.data);
      });
    }
    else if(usertypes==="user" || usertypes==="User")
    {
      axios
      .get(`http://localhost:8080/userlogin/${userid}/${password}`)
      .then((res)=>{
        toast.success(res.data);
        sessionStorage.setItem('userid',userid);
        clearAll();
        navigate('/Userdashboard'); 
      })
      .catch((err)=>{
        toast.error(err.response.data);
      });
    }
    else if(usertypes==="employees" || usertypes==="Employees")
    {
      axios
      .get(`http://localhost:8080/employeeLogin/${userid}/${password}`)
      .then((res)=>{
        toast.success(res.data);
        sessionStorage.setItem('empid',userid);
        getareaidofemp();
        clearAll();
        navigate('/Employeesdashboard'); 

      })
      .catch((err)=>{
        toast.error(err.response.data);
      });
    }
  }


  function clearAll()
  {
      setUserid("");
      setPassword("");
      setUsertypes("");
  }

  function getareaidofemp() //To get the areaid as session storage of particular employee
  {
    
  const employid=sessionStorage.getItem('empid');
    axios
    .get(`http://localhost:8080/getareaidofemp/${employid}`)
    .then((res)=>{
      const areaidno=res.data.area1.areaid;
      sessionStorage.setItem('areaidno', areaidno);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }


 

  return (
    <>
     <div>
    
    <Nav activeKey={activeTab} variant="tabs"  style={{height:"105px",backgroundColor:"purple",paddingTop:"50px",paddingLeft:"10px"
    }}>
       
     
     <Nav.Item>
       <Nav.Link as={Link} to="/" eventKey="/" style={navLinkStyle('/')} onClick={() => setActiveTab('/')}>Home</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link as={Link} to="/About" eventKey="/About" style={navLinkStyle('/About')} onClick={() => setActiveTab('/About')}>About</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link as={Link} to="/Adminlogin"  eventKey="/Adminlogin" style={navLinkStyle('/Adminlogin')} onClick={() => setActiveTab('/Adminlogin')}>Adminlogin</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link as={Link} to="/Userlogin"  eventKey="/Userlogin" style={navLinkStyle('/Userlogin')} onClick={() => setActiveTab('/Userlogin')}>Userlogin</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link as={Link} to="/Employeelogin"  eventKey="/Employeelogin" style={navLinkStyle('/Employeelogin')} onClick={() => setActiveTab('/Employeelogin')}>Employeelogin</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link as={Link} to="/Register"  eventKey="/Register" style={navLinkStyle('/Register')} onClick={() => setActiveTab('/Register')}>Register</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link as={Link} to="/Contact" eventKey="/Contact" style={navLinkStyle('/Contact')} onClick={() => setActiveTab('/Contact')}>Contact</Nav.Link>
     </Nav.Item>
     <h1 style={{color:"white",marginLeft:"300px",fontStyle:"italic",fontWeight:"revert",textShadow:"2px 2px 4px rgba(0.2, 0, 0.3, 0.5)"}}>InstaCo</h1>
     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi0GCOKb0hM-65_h2ABvQ5b2c7lG44I4Ou7A&s" alt="logo" width="100px" height="80px" style={{marginLeft:"30px",marginTop:"-25px"}}/>
   </Nav>
   </div><br></br>


  <div style={{width:"900px",marginLeft:"220px",marginRight:"20px",border:"1px solid lightgray",padding:"5px",borderRadius:"20px",backgroundImage:"url('https://media.istockphoto.com/id/158684803/photo/rainbow-soft-grunge-texture.jpg?s=612x612&w=0&k=20&c=NZm-aGZJAIY0ir0T01_jE39LfxtB2gq7_OQhugKN3s8=')"}}>
    <h1 className='text-center' style={{color:"purple"}}> Login Page</h1>
    <img src="https://cdn-icons-png.flaticon.com/256/11864/11864674.png" alt="loginicon" width="60px" style={{color:"purple",marginLeft:"400px"}}/><br></br>
    <label className='form-label' style={{marginLeft:"20px",marginRight:"20px"}}><h5>Select Usertypes:</h5></label>
   <select value={usertypes} className="form-select" onChange={(e)=>setUsertypes(e.target.value)} style={{marginLeft:"20px",width:"850px"}}>
    <option value={0}>--Select Options--</option>
    {
      users.map((item,index)=>{
        return(
          <option key={index} value={item}>{item}</option>
        )
      })
    }
   </select>
   <Form style={{marginLeft:"20px",marginRight:"20px"}}>
      <Form.Group className="mb-3" ><br></br>
        <Form.Label><h5>Userid:</h5></Form.Label>
        <Form.Control type="text" value={userid} onChange={(e)=>setUserid(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label><h5>Password:</h5></Form.Label>
        <Form.Control type="password" rows={3}  value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      </Form>
   <div style={{marginLeft:"300px"}}>
      <Button variant="primary"  onClick={logincheck} style={{marginLeft:"20px",marginRight:"20px"}}>
      Submit
      </Button>
      <Button variant="secondary"  onClick={clearAll} style={{marginLeft:"20px",marginRight:"20px"}}>
      Cancel
      </Button>
      </div><br></br>
  </div><br></br>

  </>
  )
}
