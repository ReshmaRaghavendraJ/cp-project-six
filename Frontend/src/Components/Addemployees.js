import React, { useEffect, useState } from 'react'
import Admindashboard from './Admindashboard'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
 

export default function Addemployees() 
{
  const[empname,setEmpname]=useState('');
  const[phoneno,setPhoneno]=useState('');
  const[qualification,setQualification]=useState('');
  const[photo,setPhoto]=useState('');
  const[arealist,setArealist]=useState([]);   //Drop down list
  const[selectedareaid,setSelectedareaid]=useState('');
  const[emplist,setEmplist]=useState([]);  //Display list of employees
  const[showemp,setShowemp]=useState(false);
  const[emailid,setEmailid]=useState('');

  
  useEffect(()=>{
    getallareas();
  },[]);

  function registeremployees()      /* Register Employees */
  {
    if(selectedareaid==="")
      {
        toast.error("Please choose area");
        return;
      }
      if(empname==="")
        {
          toast.error("Please enter empname");
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
            if(qualification==="")
              {
                toast.error("Please enter qualification");
                return;
              }

              if(emailid==="")
                {
                  toast.error("Please enter emailid");
                  return;
                }

              if(photo==="")
                {
                  toast.error("Please enter Url to upload your photo");
                  return;
                }
    const obj={selectedareaid,empname,phoneno,qualification,emailid,photo};
    axios
      .post(`http://localhost:8080/registeremployees/${selectedareaid}`,obj)
      .then((res)=>{
        toast.success(res.data);
        setShowemp(false);
        clearAll();
      })
      .catch((err)=>{
        toast.error(err.response.data);
      });
  }

  function clearAll()
  {
    setEmpname("");
    setPhoneno("");
    setQualification("");
    setSelectedareaid("");
    setPhoto("");
    setEmailid("");
  }

  function getallareas()       /* Drop down list of areas */
{
  axios
  .get("http://localhost:8080/getallareas")
  .then((res)=>{
 setArealist(res.data);
 setShowemp(false);
  })
  .catch((err)=>{
    toast.error(err.response.data);
  });
}

function getallemployees()  /* get all employees */
{
axios
  .get("http://localhost:8080/getallemployees")
  .then((res)=>{
    setEmplist(res.data);
    debugger;
    setShowemp(true);
  })
  .catch((err)=>{
    toast.error(err.response.data);
  });
}
  return (
    <>
    <h1 style={{color:"maroon",padding:"20px",textAlign:"center",marginTop:"-1500px"}}>Add Employees</h1>
    <Card className='addempcard'>
    <Card.Body>
    <label className='form-label' style={{marginLeft:"20px"}}><h5>Select Areaid:</h5></label>
    <select value={selectedareaid} onChange={(e)=>setSelectedareaid(e.target.value)} className='form-select'  style={{marginLeft:"20px",width:"850px"}}>
      <option value={0}>--Select Options--</option>
      {
        arealist.map((item,index)=>{
          return(
          <option key={index} value={item.areaid}>{item.areaid}-{item.area}</option>
        )})
      }
    </select><br></br>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label style={{marginLeft:"20px"}}><h5>Enter Employee Name:</h5></Form.Label>
        <Form.Control type="text" value={empname} onChange={(e)=>setEmpname(e.target.value)} style={{marginLeft:"20px",width:"850px"}} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{marginLeft:"20px"}}><h5>Enter Phoneno:</h5></Form.Label>
        <Form.Control type="text" value={phoneno} onChange={(e)=>setPhoneno(e.target.value)} style={{marginLeft:"20px",width:"850px"}} placeholder='+91' />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{marginLeft:"20px"}}><h5>Enter Qualification:</h5></Form.Label>
        <Form.Control type="text" value={qualification} onChange={(e)=>setQualification(e.target.value)} style={{marginLeft:"20px",width:"850px"}} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{marginLeft:"20px"}}><h5>Enter Emailid:</h5></Form.Label>
        <Form.Control type="text" value={emailid} onChange={(e)=>setEmailid(e.target.value)} style={{marginLeft:"20px",width:"850px"}} placeholder='@gmail.com'/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{marginLeft:"20px"}}><h5>Upload Photo:</h5></Form.Label>
        <Form.Control type="text" value={photo} onChange={(e)=>setPhoto(e.target.value)} style={{marginLeft:"20px",width:"850px"}} />
      </Form.Group>
    </Form>
    <br></br>
    <div  style={{marginLeft:"300px",width:"1280px"}}>
      <Button variant="success me-3"  onClick={registeremployees}>
   Submit
      </Button>
      <Button variant="secondary me-3"  onClick={clearAll}>
       Cancel
      </Button>
      <Button variant="warning me-3" onClick={getallemployees}>
       Display
      </Button>
      </div><br></br>
      </Card.Body>
      </Card>
  

      {showemp && (
  <>
    <h1 style={{ color: "maroon", padding: "20px", textAlign: "center" }}>List of Employees:</h1>
    {emplist.length === 0 ? (
      <p style={{ textAlign: "center", fontSize: "18px" }}>No employees found.</p>
    ) : (
      <Card className="displayempcard">
        <Card.Body>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee Phoneno</th>
                <th>Employee Qualification</th>
                <th>Employee Photo</th>
              </tr>
            </thead>
            <tbody>
              {emplist.map((item, index) => (
                <tr key={index}>
                  <td>{item.empname}</td>
                  <td>{item.phoneno}</td>
                  <td>{item.qualification}</td>
                  <td><img src={item.photo} alt="employee" width="100px" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    )}
  </>
)}
</>
  )}
