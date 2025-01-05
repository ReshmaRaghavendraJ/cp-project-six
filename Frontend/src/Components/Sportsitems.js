import React from 'react'
import { Link } from 'react-router-dom'

export default function Sportsitems() {
  return (
    <>
    <div className='Groc'><br></br>
        <h1 style={{color:"white",textAlign:"center",fontStyle:"italic"}}>Sports items Delivery</h1>
       
    </div>
    <div className='cardimg'>
        <img src="https://media.istockphoto.com/id/2153921266/photo/assorted-sports-equipment-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=MoASmoKdzBmNZCnRnx7OqzEyjwvPI444joUfp0H_hK4=" alt="bill" width="500px" height="400px" style={{padding:"5px"}}/>
        <h4 className='head8'>
        Sports equipment, also called sporting goods, are the tools, materials, apparel, and gear, which varies in shapes, size, and usage in a particular sport. It includes balls, nets, rackets, protective gears like helmets, goggles, etc. <br></br>
       As the sporting equipment industry improves, so do the athletes' performance. This is due to the fact that the equipment is more efficient, lighter and stronger, thus forming a biomechanical system that is interacting with the athlete. <br></br><br></br>
        </h4>
       <Link to="/" className='btn btn-primary' style={{marginLeft:"1200px"}}>Back</Link>
    </div>
    </>
  )
}
