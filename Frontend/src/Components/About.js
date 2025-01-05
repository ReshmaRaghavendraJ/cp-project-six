import React from 'react'
import Card from 'react-bootstrap/Card';
import Navbar from './Navbar';

export default function About() 
{
  return (
    <>
    <Navbar/>
   <img src="https://wallpaperboat.com/wp-content/uploads/2019/10/best-background-for-website-06.jpg" alt="backgrdimg1"/>
  
  
   <Card className='aboutcard'>
   <Card.Body>
    <h1 className='text-center'style={{textDecoration:"underline",color:"maroon"}}>OUR MISSION</h1>
    <h5 style={{fontFamily:"monospace",color:"gray",textAlign:"center",border:"5px dotted black"}}> &nbsp; &nbsp; &nbsp; 
    Courier delivery typically happens on the day specified on the requested document, and usually, it occurs during business hours. The receiver must wait for the package or can direct the delivery person to give it to a specified person.
    <br></br>
    The shipping carrier will take the package to the local courier depot for further sorting. The parcel will travel through various hubs until it arrives at the final depot that is closest to its destination for last-mile delivery.
</h5>
</Card.Body>
    </Card>

    <img src="https://img.freepik.com/premium-photo/cute-courier-delivery-package-cartoon-vector-icon-illustration_1029476-330093.jpg" alt="imgs4" style={{marginLeft:"1000px",marginTop:"-350px", width:"300px",height:"320px",border:"5px dotted black"}}/>
    </>
  )
}
