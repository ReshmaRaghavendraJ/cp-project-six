import React from 'react'
import { Link } from 'react-router-dom'

export default function Clothes() {
  return (
<>
<div className='Groc'><br></br>
    <h1 style={{color:"white",textAlign:"center",fontStyle:"italic"}}>Clothes and Accessories Delivery for Seniors</h1>
   
</div>
<div className='cardimg'>
    <img src="https://images.unsplash.com/photo-1578939662863-5cd416d45a69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3RoZXMlMjBzaG9wcGluZ3xlbnwwfHwwfHx8MA%3D%3D" alt="clothes" width="500px" style={{padding:"5px"}}/>
    <h4 className='head6'>
    Clothing also known as clothes, garments, dress, apparel, or attire is any item worn on the body. Typically, clothing is made of fabrics or textiles, but over time it has included garments made from animal skin and other thin sheets of materials and natural products found in the environment, put together. The wearing of clothing is mostly restricted to human beings and is a feature of all human societies. 
    </h4><br></br><br></br>
   <Link to="/" className='btn btn-primary' style={{marginLeft:"1200px"}}>Back</Link>
</div>
</>
  )
}
