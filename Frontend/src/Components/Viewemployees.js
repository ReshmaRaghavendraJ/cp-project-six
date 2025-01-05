import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// import Userdashboard from './Userdashboard';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react'; 
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function Viewemployees() 
{
  const[emplist,setEmplist]=useState([]);  //list emplist inside card
  const navigate = useNavigate(); // Hook for navigation
  const ursid=sessionStorage.getItem('userid');  //Session storage of user
  const[selectedEmpId,setSelectedEmpId]=useState(null);



  useEffect(()=>{
    if (ursid) {
      getEmployeesByDeliveryAddress();
    }
},[ursid])


function getEmployeesByDeliveryAddress()    /* Get all employees in card format*/
{
    axios
  .get(`http://localhost:8080/getEmployeesByDeliveryAddress/${ursid}`)
  .then((res)=>{
    console.log("Employees Data: ", res.data); // Debugging line
    if (res.data && res.data.length > 0 ) {
      setEmplist(res.data);
      debugger;
    }
  })
  .catch((err)=>{
    toast.error(err.response.data);
  });
}

function updateempstatus(empid)    /* Update Employee Status */
{
    axios
  .put(`http://localhost:8080/updateempstatus/${empid}`)
  .then((res)=>{
  toast.success(res.data);
  setSelectedEmpId(empid); // Set selected employee ID
  })
  .catch((err)=>{
    toast.error(err.response.data);
  });
}

function handleViewWorkStatus(empid) {
  sessionStorage.setItem('employid', empid); // Store employee ID in session storage
  navigate("/Viewstatus"); // Navigate to ViewWorkstatus component with empid
}

  return (
<>
    {/* <Userdashboard/> */}
    <h1 style={{color:"purple",padding:"20px",marginLeft:"500px",marginTop:"-650px"}}>View Employees</h1>
    <div className="card-container">
 {
      emplist.length > 0 ? (  
            emplist.map((item,index)=>(
              <div className="col-md-4" key={index}>
      <Card style={{ width:"300px",height:"500px",margin:"10px", border: "2px solid gray" }} key={index}>
          {item.photo && <Card.Img variant="top" src={item.photo} />}
      <Card.Body>
        <Card.Title>{item.empname}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{item.qualification}</ListGroup.Item>
        <ListGroup.Item>{item.address}</ListGroup.Item>
        <ListGroup.Item>{item.phoneno}</ListGroup.Item>
        <ListGroup.Item>{item.area1.area}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
        {selectedEmpId === item.empid ? (
          <button
          className="btn btn-success"
          style={{ width: '200px', margin:"10px auto" }}
          onClick={() => handleViewWorkStatus(item.empid)}
        >
          View Workstatus
        </button>
        ):(
<button
className="btn btn-primary"
style={{ width: '200px', margin:"10px auto" }}
onClick={()=>updateempstatus(item.empid)}
>
Select
</button>
        )}
   </Card.Body>  
    </Card>
    </div>
             ))
            ):(
             <p>No employees</p> 
            )}
     
    </div>
        </>
  );
}
