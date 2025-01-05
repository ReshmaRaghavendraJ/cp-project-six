import React, { useState } from 'react'
import Admindashboard from './Admindashboard'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';

export default function Addcity() 
{
    const [city,setCity]=useState('');
    const[citylist,setCitylist]=useState([]);
    const[showcity,setShowCity]=useState(false);


    function addcity()  /* Post city */
    {
      if(city==="")
        {
          toast.error("Please enter city");
          return;
        }
        const obj={city};
    axios
      .post("http://localhost:8080/addcity",obj)
      .then((res)=>{
        toast.success(res.data);
        setShowCity(false);
        clearAll();
      })
      .catch((err)=>{
        toast.error(err.response.data);
      });
    }

    function clearAll()
    {
        setCity("");
    }

    function gettallcity()  /* get all city */
    {
    axios
      .get("http://localhost:8080/gettallcity")
      .then((res)=>{
        setCitylist(res.data);
        setShowCity(true);
      })
      .catch((err)=>{
        toast.error(err.response.data);
      });
    }


  return (
    <>
    <h1 style={{color:"maroon",padding:"20px",marginLeft:"150px",marginTop:"-1500px"}}>Add City</h1>
    <Card className='citycard'>
    <Card.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label style={{marginLeft:"20px"}}><h5>Enter City Name:</h5></Form.Label>
        <Form.Control type="text" value={city} onChange={(e)=>setCity(e.target.value)}  />
      </Form.Group>
    </Form>
    <br></br>
    <div  style={{marginLeft:"100px"}}>
      <Button variant="success me-3"  onClick={addcity}>
   Submit
      </Button>
      <Button variant="warning me-3"  onClick={gettallcity}>
       Display
      </Button>
      <Button variant="secondary me-3" onClick={clearAll}>
   Cancel
  </Button>
      </div><br></br>
      </Card.Body>
      </Card>
  

{showcity && ( 
  <>
    <h1 style={{color:"maroon",padding:"20px",marginLeft:"680px",marginTop:"-350px"}}>List of City:</h1>
    <Card className='displaycitycard'>
    <Card.Body>
    <table className='table table-striped'>
      <thead>
      <tr>
        <th>City id</th>
        <th>City Name</th>
      </tr>
      </thead>
      <tbody>
        {
          citylist.map((item,index)=>{
            return(
              <tr key={index}>
              <td>{item.cityid}</td>
              <td>{item.city}</td>
            </tr>
            )}
          )}
      </tbody>
    </table>
    </Card.Body>
    </Card>
    </>
)}
    </>
  )
}
