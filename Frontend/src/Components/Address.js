import React from 'react'

export default function Address() {
  return (
    <>
      <div style={{ backgroundImage: "url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0yMThiYXRjaDktYXVtLTA2XzEuanBn.jpg')", height: "900px" }}>
        <div className='admindash'>
          <h1 className='text-center' style={{ color: "plum", padding: "20px" }}>Welcome User Dashboard!</h1>
          <Nav variant="tabs" style={{ marginLeft: "10px" }}>
            <Nav.Item>
              <Nav.Link as={Link} to="/Viewemployees" style={{ color: "white", fontFamily: "serif", fontWeight: "bold", fontSize: "16pt"}} >View Employees</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/Viewstatus" style={{ color: "white", fontFamily: "serif", fontWeight: "bold", fontSize: "16pt" }} >View Status</Nav.Link>
            </Nav.Item>
          </Nav>
        </div><br></br>

        </>
  )
}
