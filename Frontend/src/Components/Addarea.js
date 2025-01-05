import React, { useEffect } from 'react'
import Admindashboard from './Admindashboard'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';

export default function Addarea()
 {
const [area,setArea]=useState('');
const[citylist,setCitylist]=useState([]);      //Drop down list
const[selectedcity,setSelectedcity]=useState('');
const[arealist,setarealist]=useState([]);  //List of areas
const[showarea,setShowarea]=useState(false);

useEffect(()=>{
  gettallcity();
},[]);




function addarea()  /* Post city */
{
  if(selectedcity==="")
    {
      toast.error("Please choose city");
      return;
    }
    if(area==="")
      {
        toast.error("Please enter area");
        return;
      }
    const obj={area,selectedcity};
axios
  .post(`http://localhost:8080/addarea/${selectedcity}`,obj)
  .then((res)=>{
    toast.success(res.data);
    setShowarea(false);
    clearAll();
  })
  .catch((err)=>{
    toast.error(err.response.data);
  });
}

function gettallcity()       /* Drop down list of Cities */
{
  axios
  .get("http://localhost:8080/gettallcity")
  .then((res)=>{
 setCitylist(res.data);
 setShowarea(false);
  })
  .catch((err)=>{
    toast.error(err.response.data);
  });
}


function clearAll()
{
    setArea("");
    setSelectedcity("");
}

function getallareas()  /* get all Area */
{
axios
  .get("http://localhost:8080/getallareas")
  .then((res)=>{
    setarealist(res.data);
    setShowarea(true);
  })
  .catch((err)=>{
    toast.error(err.response.data);
  });
}

return (
<>
<h1 style={{color:"maroon",padding:"20px",marginLeft:"150px",marginTop:"-1500px"}}>Add Area</h1>
<Card className='citycard'>
    <Card.Body>
<label className='form-label' style={{marginLeft:"20px"}}><h5>Select City:</h5></label>
<select value={selectedcity} onChange={(e)=>setSelectedcity(e.target.value)} className='form-select' >
  <option value={0}>--Choose Options--</option>
 {
  citylist.map((item,index)=>{
    return(
      <option key={index} value={item.cityid}>{item.cityid}-{item.city}</option>
    )
  })
 }
</select><br></br>
<Form>
  <Form.Group className="mb-3">
    <Form.Label style={{marginLeft:"20px"}}><h5>Enter Area Name:</h5></Form.Label>
    <Form.Control type="text" value={area} onChange={(e)=>setArea(e.target.value)}/>
  </Form.Group>
</Form>
<br></br>
<div  style={{marginLeft:"50px"}}>
  <Button variant="success me-3"  onClick={addarea}>
Submit
  </Button>
  <Button variant="secondary me-3" onClick={clearAll}>
   Cancel
  </Button>
  <Button variant="warning me-3"  onClick={getallareas}>
       Display
      </Button>
  </div>
  </Card.Body>
  </Card>
  


{showarea && ( 
  <>
    <h1 style={{color:"maroon",padding:"20px",marginLeft:"680px",marginTop:"-420px"}}>List of Area:</h1>
    <Card className='displayareacard'>
    <Card.Body>
    <table className='table table-striped' >
      <thead>
      <tr>
        <th>Area id</th>
        <th>Area Name</th>   
        <th>City Name</th>
      </tr>
      </thead>
      <tbody>
        {
          arealist.map((item,index)=>{
            return(
              <tr key={index}>
              <td>{item.areaid}</td>
              <td>{item.area}</td>
              <td>{item.city.city}</td>
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
