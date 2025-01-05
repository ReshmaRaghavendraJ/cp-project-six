import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import pic1 from './pic1.jpg';
import Navbar from './Navbar';

export default function Userlogin() 
{
    // const[userid,setUserid]=useState('');
    const[password,setPassword]=useState('');
    const navigate = useNavigate(); // Initialize navigate
    const [emailid, setEmailid] = useState(''); // State for email input
    const[userlogin,setUserlogin]=useState({});
    
    function clearAll()
  {
      setEmailid("");
      setPassword("");
  }

  function logincheck()  /* User Login Check */
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
        .get(`http://localhost:8080/userlogin/${emailid}/${password}`)
        .then((res)=>{
          setUserlogin(res.data);
          const userid=res.data.userid;
          sessionStorage.setItem('userid',userid);
          clearAll();
          navigate('/Userdashboard'); 
        })
        .catch((err)=>{
          toast.error(err.response.data);
        });
  }



  return (
    <>
   <Navbar/>
   <img src={pic1} alt="pic1" width="100%"/>

   <Card className='userlogincard'>
      <Card.Body>
        <Card.Title><h2 style={{color:"Green",marginLeft:"100px"}}>User Login Page</h2></Card.Title>
        <Form style={{marginLeft:"20px",marginRight:"20px"}}>
      <Form.Group className="mb-3" ><br></br>
        <Form.Label><h5>Emailid:<i class="bi bi-file-person-fill"></i></h5></Form.Label>
        <Form.Control type="text" value={emailid} onChange={(e)=>setEmailid(e.target.value)} placeholder='@gmail.com'/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label><h5>Password:<i class="bi bi-file-lock-fill"></i></h5></Form.Label>
        <Form.Control type="password" rows={3}  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='*****'/>
      </Form.Group>
      </Form>
      <div className='btnss'>
      <Button variant="primary"  onClick={logincheck} style={{marginLeft:"20px",marginRight:"20px"}}>
      Submit
      </Button>
      <Button variant="secondary"  onClick={clearAll} style={{marginLeft:"20px",marginRight:"20px"}}>
      Cancel
      </Button>
      </div> 
      </Card.Body>
      </Card><br></br>
    </>
  )
}
