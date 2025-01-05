import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import img3 from './img3.jpg';
import Navbar from './Navbar';

export default function Adminlogin() 
{
    // const[userid,setUserid]=useState('');
    const[password,setPassword]=useState('');
    const navigate = useNavigate(); // Initialize navigate
    const [emailid, setEmailid] = useState(''); // State for email input
    const[emplogin,setEmplogin]=useState({});
    
  
    function clearAll()
  {
      setEmailid("");
      setPassword("");
  }



  function logincheck()
  {
    if(emailid==="")
      {
        toast.error("please enter emailid");
        return;
      }
      if(password==="")
        {
          toast.error("please enter password");
          return;
        }
        axios
        .get(`http://localhost:8080/employeeLogin/${emailid}/${password}`)
        .then((res)=>{
          setEmplogin(res.data);
          const empid=res.data.empid;
          sessionStorage.setItem('empid',empid);
          debugger;
          getareaidofemp();
          clearAll();
          navigate('/Employeesdashboard'); 
  
        })
        .catch((err)=>{
          toast.error(err.response.data);
        });
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
   <Navbar/>

   <img src={img3} alt="img3"  width="100%"/>

   <Card className='emplogincard'>
      <Card.Body>
        <Card.Title><h2 style={{color:"Purple",marginLeft:"100px"}}>Employee Login Page</h2></Card.Title>
   <Form style={{marginLeft:"20px",marginRight:"20px"}}>
      <Form.Group className="mb-3" ><br></br>
        <Form.Label><h5>Emailid:<i class="bi bi-file-person-fill"></i></h5></Form.Label>
        <Form.Control type="text" value={emailid} onChange={(e)=>setEmailid(e.target.value)} placeholder='@gmail.com'/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label><h5>Password:<i class="bi bi-file-person-fill"></i></h5></Form.Label>
        <Form.Control type="password" rows={3}  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='*****'/>
      </Form.Group>
      </Form>
   <div className='btnss'>
      <Button variant="primary"  onClick={logincheck} style={{marginLeft:"-10px",marginRight:"20px"}}>
      Submit
      </Button>
      <Button variant="secondary"  onClick={clearAll} style={{marginLeft:"20px",marginRight:"20px"}}>
      Cancel
      </Button>
      </div><br></br>
      </Card.Body>
      </Card><br></br>
    </>
  )
}
