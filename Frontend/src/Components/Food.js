import React from 'react'
import { Link } from 'react-router-dom'

export default function Food() {
  return (
    <>
    <div className='Groc'><br></br>
        <h1 style={{color:"white",textAlign:"center",fontStyle:"italic"}}>Food or Flowers delivery</h1>
       
    </div>
    <div className='cardimg'>
        <img src="https://media.istockphoto.com/id/1334248361/photo/spicy-chinese-take-out-food.jpg?s=612x612&w=0&k=20&c=T_PDvoBs5q5TVsFoTjxwvJJtcps0IWrE-WC3CyruJ_Q=" alt="homeservice" width="500px" height="400px" style={{padding:"5px"}}/><br></br>
        <h4 className='head7'>
        Food delivery is the service of bringing food to a customer's location, either at their home or another place. It can be provided by restaurants, grocery stores, or independent food delivery companies. <br></br><br></br><br></br>
        Food delivery can be done online or offline. Online food delivery platforms act as intermediaries between consumers and food facilities, arranging for the delivery of orders.
           </h4>
       <Link to="/" className='btn btn-primary' style={{marginLeft:"1200px",marginTop:"50px"}}>Back</Link>
    </div>
    </>
  )
}
