import React from 'react'
import { Link } from 'react-router-dom'

export default function Books() {
    return(
<>
<div className='Groc'><br></br>
    <h1 style={{color:"white",textAlign:"center",fontStyle:"italic"}}>Books or Documents Delivery</h1>
   
</div>
<div className='cardimg'>
    <img src="https://media.istockphoto.com/id/1036044564/photo/page.jpg?s=612x612&w=0&k=20&c=jQwyGjFoOFgBACZ6S7eUMOwQ_lS6V6lrp_9r3HIQe2Y=" alt="groc" width="600px" style={{padding:"5px"}}/>
    <h4 className='head5'> 
    A book is a medium for recording information in the form of writing or images. Modern books are typically in codex format, composed of many pages that are bound together and protected by a cover; they were preceded by several earlier formats, including the scroll and the tablet. The book publishing process is the series of steps involved in their creation and dissemination.<br></br></h4>
   <br></br>
   <Link to="/" className='btn btn-primary' style={{marginLeft:"1200px"}}>Back</Link>
</div>
</>
  )
}
