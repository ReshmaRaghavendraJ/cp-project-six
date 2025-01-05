import React from 'react'
import Card from 'react-bootstrap/Card';
import Navbar from './Navbar';


export default function Contact() 
{
  return (
    <>
    <Navbar/>

   <img src="https://static.vecteezy.com/system/resources/thumbnails/023/028/809/small_2x/businessman-using-tablet-business-global-internet-connection-application-technology-and-digital-marketing-financial-and-banking-digital-link-tech-big-data-photo.jpg" alt="img5" width="100%" />

   <Card className='card1'>
      <Card.Body>
      <Card.Title><i class="bi bi-telephone-fill"></i></Card.Title>
        <Card.Text>
         <h4>Contact us:</h4>
         <h5>0821-536363654</h5>
         <h5>+91 1287564895</h5>
        </Card.Text>
      </Card.Body>
    </Card>


    <Card className='card2'>
      <Card.Body>
      <Card.Title><i class="bi bi-envelope-fill"></i></Card.Title>
        <Card.Text>
         <h4>Email-id:</h4>
         <h5>courierdelivery@gmail.com</h5>
        </Card.Text>
      </Card.Body>
    </Card>



    <Card className='card3'>
      <Card.Img variant="top"/>
      <Card.Body>
      <Card.Title><i class="bi bi-geo-alt-fill"></i></Card.Title>
        <Card.Text>
          <h4>Location:</h4>
          <h5>#456,4th main,ABC Branch office,XXXX</h5>
        </Card.Text>
      </Card.Body>
    </Card>
  </>
  )
}
