import React, { useState } from 'react'
import Admindashboard from './Admindashboard'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Addservices()
 {
  const[servicename,setServicename]=useState('');
  const[serviceamount,setServiceamount]=useState('');
  const[servicelist,setServicelist]=useState([]);  //Display only one Services
  const[showservice,setShowservie]=useState(false);

  function addservices()
  {
    if(servicename==="")
      {
        toast.error("Please enter service name");
        return;
      }
      if(serviceamount==="")
        {
          toast.error("Please enter service amount");
          return;
        }
    const obj={servicename,serviceamount};
    axios
      .post("http://localhost:8080/addservices",obj)
      .then((res)=>{
        toast.success(res.data);
        setShowservie(false);
        clearAll();
      })
      .catch((err)=>{
        toast.error(err.response.data);
      });
  }

    function clearAll()
    {
      setServiceamount("");
      setServicename("");
    }

    function getallservices()  /* get all services */
{
axios
  .get("http://localhost:8080/getallservices")
  .then((res)=>{
    setServicelist(res.data);
    setShowservie(true);
  })
  .catch((err)=>{
    toast.error(err.response.data);
  });
}

  return (
    <>
    <h1 style={{color:"maroon",padding:"20px",marginLeft:"150px",marginTop:"-1500px"}}>Add Services</h1>
    <Card className='citycard'>
    <Card.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label style={{marginLeft:"20px"}}><h5>Enter Service Name:</h5></Form.Label>
        <Form.Control type="text" value={servicename} onChange={(e)=>setServicename(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{marginLeft:"20px"}}><h5>Enter Service Amount:</h5></Form.Label>
        <Form.Control type="text" value={serviceamount} onChange={(e)=>setServiceamount(e.target.value)} />
      </Form.Group>
    </Form>
    <br></br>
    <div  style={{marginLeft:"100px"}}>
      <Button variant="success me-3"  onClick={addservices}>
   Submit
      </Button>
      <Button variant="secondary me-3"  onClick={clearAll}>
       Cancel
      </Button>
      <Button variant="warning me-3" onClick={getallservices}>
       Display
      </Button>
      </div>
      </Card.Body>
      </Card>

    {
      showservice && (
        <>
      <h1 style={{color:"maroon",padding:"20px",marginLeft:"680px",marginTop:"-420px"}}>List of Services:</h1>
      <Card className='displayservicecard'>
      <Card.Body>
    <table className='table table-striped' >
      <thead>
      <tr>
        <th>Service id</th>
        <th>Service Name</th>
        <th>Service Amount</th>
      </tr>
      </thead>
      <tbody>
        {
          servicelist.map((item,index)=>(
            <tr key={index}>
              <td>{item.serviceid}</td>
              <td>{item.servicename}</td>
              <td>{item.serviceamount}</td>
            </tr>
          ))
          }
      </tbody>
    </table>
    </Card.Body>
    </Card>
    </>
      )}
      </>
  )
}
