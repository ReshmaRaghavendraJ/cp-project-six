import React from 'react'
import Navbar from './Navbar';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import backgrd from './backgrd.jpg';

export default function Register() 
{
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const[phoneno,setPhoneno]=useState('');
  const[emailid,setEmailid]=useState('');



    function userregister()        /* User Register */
    {
      if(username==="")
        {
          toast.error("Please enter Proper username");
          return;
        }
        if(password==="")
          {
            toast.error("Please enter password");
            return;
          }
          if (password.length > 0 && password.length < 5) 
          {
            toast.error("Password should be minimum of 5 Characters");
            return;
          }
          if (password.length > 0 && (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password))) 
            {
            toast.warning("Password should contain both letters and numbers");
          }
          if (!/^[A-Z]/.test(password)) {
            toast.error("Password should start with an uppercase letter");
            return;
          }
          if(phoneno==="")
            {
              toast.error("Please enter phoneno");
              return;
            }
            if (!/^\+91\d{10}$/.test(phoneno)) {
              toast.error("Phone number should start with +91 and be followed by 10 digits");
              return;
            }
            if(emailid==="")
              {
                toast.error("Please enter emailid");
                return;
              }
      const obj={username,password,phoneno,emailid};
      axios
      .post("http://localhost:8080/userregister",obj)
      .then((res)=>{
        toast.success(res.data);
        clearAll();
      })
      .catch((err)=>{
        toast.error(err.response.data);
      });
    }

    function clearAll()
    {
      setEmailid("");
      setPassword("");
      setPhoneno("");
      setUsername("");
    }

  return (
    <>
<Navbar/>
    
<img src={backgrd} alt="backgrd"/>

   <Card className='regcard'>
      <Card.Body>
        <Card.Title><h2 style={{color:"brown",marginLeft:"150px"}}>User Registration</h2></Card.Title>
    <Form style={{marginLeft:"20px",marginRight:"20px"}}>
      <Form.Group className="mb-3" >
        <Form.Label><h5>Username:</h5></Form.Label>
        <Form.Control type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label><h5>Password:</h5></Form.Label>
        <Form.Control type="password" rows={3}  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='*****'/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label><h5>Phone Number:</h5></Form.Label>
        <Form.Control type="text" rows={3} value={phoneno} onChange={(e)=>setPhoneno(e.target.value)} placeholder='+91'/>
      </Form.Group> 
      <Form.Group className="mb-3">
        <Form.Label><h5>Emailid:</h5></Form.Label>
        <Form.Control type="emailid" rows={3} value={emailid} onChange={(e)=>setEmailid(e.target.value)} placeholder='@gmail.com'/>
      </Form.Group> 
      <div className='btnss'>
      <Button variant="primary" className='me-3'  onClick={userregister}>
      Submit
      </Button>
      <Button variant="secondary"  onClick={clearAll}>
      Cancel
      </Button>
      </div>
    </Form>
    </Card.Body>
    </Card><br></br>
  </>
  )
}
