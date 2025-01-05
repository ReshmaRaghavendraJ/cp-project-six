import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles.css';
import Navbar from './Navbar';

export default function Home()
{

  return (
    <>
      <Navbar/>
      <img src="https://e0.pxfuel.com/wallpapers/115/360/desktop-wallpaper-light-brown-abstract-www-pixshark-com.jpg" width="100%" height="800px"/>

      <Container style={{marginLeft:"200px",marginTop:"-700px"}}>
      <Row>
        <Col><img className="imggs" src="https://img.freepik.com/free-photo/3d-rendering-cartoon-like-man-delivering-gift_23-2150797658.jpg" alt="backgrdimg1" width="500px" style={{border:"2px solid black"}}/></Col>
        <Col><img className="imggs" src="https://img.freepik.com/premium-photo/3d-cartoon-courier-riding-motorcycle-deliver-package-white-background_979520-12432.jpg" alt="backgrdimg1" width="400px" height="315px" style={{marginLeft:"-70px",border:"2px solid black"}}/></Col>
      </Row>
      <Row>
        <Col><img className="imggs" src="https://img.freepik.com/premium-photo/courier-with-parcel-background-delivery-service-van-vector-illustration-flat-style_960782-105261.jpg" alt="backgrdimg1" height="300px" width="300px" style={{border:"2px solid black"}}/></Col>
        <Col><img className="imggs" src="https://cdni.iconscout.com/illustration/premium/thumb/delivery-man-delivering-package-at-doorstep-illustration-download-in-svg-png-gif-file-formats--home-daily-activities-pack-e-commerce-shopping-illustrations-5690123.png" alt="backgrdimg1" width="350px" height="300px" style={{marginLeft:"-80px",border:"2px solid black"}}/></Col>
        <Col><img className="imggs" src="https://img.freepik.com/premium-photo/smiling-delivery-man-cartoon-illustration-holding-package-3d-character-design-courier-service_996993-57600.jpg" alt="backgrdimg1" width="250px" height="300px" style={{marginLeft:"-110px",border:"2px solid black"}}/></Col>
      </Row>
    </Container><br></br>
    </>
  );
}
