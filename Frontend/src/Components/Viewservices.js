import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Viewservices() {
  const [servicelist, setServicelist] = useState([]);
  const [acceptedServices, setAcceptedServices] = useState(new Set()); // Track accepted services
  const [completedServices, setCompletedServices] = useState(new Set()); // Track completed services
  const employid = sessionStorage.getItem('empid');

  useEffect(() => {
    getdeliveryservicesbyemployee();
    // Load accepted and completed services from localStorage when the component mounts
    const storedAcceptedServices = localStorage.getItem('acceptedServices');
    const storedCompletedServices = localStorage.getItem('completedServices');
    if (storedAcceptedServices) {
      setAcceptedServices(new Set(JSON.parse(storedAcceptedServices)));
    }
    if (storedCompletedServices) {
      setCompletedServices(new Set(JSON.parse(storedCompletedServices)));
    }
  }, []);

  useEffect(() => {
    // Save the accepted and completed services to localStorage whenever they change
    localStorage.setItem('acceptedServices', JSON.stringify([...acceptedServices]));
    localStorage.setItem('completedServices', JSON.stringify([...completedServices]));
  }, [acceptedServices, completedServices]);

  function getdeliveryservicesbyemployee() {
    axios
      .get(`http://localhost:8080/getdeliveryservicesbyemployee/${employid}`)
      .then((res) => {
        setServicelist(res.data);
      })
      .catch((err) => {
        toast.error(err.response?.data || "An error occurred while fetching services.");
      });
  }

  function updatestatus(deliveryserviceid) {
    axios
      .put(`http://localhost:8080/updatestatus/${employid}/${deliveryserviceid}`)
      .then((res) => {
        toast.success(res.data);
        setAcceptedServices((prev) => new Set(prev).add(deliveryserviceid));
      })
      .catch((err) => {
        toast.error(err.response?.data || "An error occurred while updating the service status.");
      });
  }

  function addworkstatus(userid, deliveryserviceid) {
    axios
      .post(`http://localhost:8080/addworkstatus/${employid}/${userid}/${deliveryserviceid}`)
      .then((res) => {
        toast.success(res.data);
        setCompletedServices((prev) => new Set(prev).add(deliveryserviceid));
        // Also move the delivery service from accepted to completed
        setAcceptedServices((prev) => {
          const newSet = new Set(prev);
          newSet.delete(deliveryserviceid);
          return newSet;
        });
      })
      .catch((err) => {
        toast.error(err.response?.data);
      });
  }

  // Filter for services that have not been completed and are pending
  const filteredServices = servicelist.filter(
    (service) => service.status === 'Pending' && !completedServices.has(service.deliveryserviceid)
  );

  return (
    <>
      <div style={{ color: "maroon", padding: "20px", textAlign:"center", marginTop: "-1500px" }}>
        <h1>List of Services:</h1>
      </div>
      <div className="card-container">
        {filteredServices.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h4>No Services Available</h4>
          </div>
        ) : (
          filteredServices.map((item, index) => (
            <div className="col-md-4" key={index}>
              <Card style={{ width: "300px", height: "450px", margin: "10px" }} key={index}>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item><h6>Service Amount:</h6> {item.services4?.serviceamount}</ListGroup.Item>
                  <ListGroup.Item><h6>Delivery Address:</h6> {item.deliveryaddress}</ListGroup.Item>
                  <ListGroup.Item><h6>Username:</h6> {item.user1.username}</ListGroup.Item>
                  <ListGroup.Item><h6>Contact:</h6> {item.user1.phoneno}</ListGroup.Item>
                  <ListGroup.Item><h6>Pickup Address:</h6> {item.pickupaddress}</ListGroup.Item>
                </ListGroup>
                {/* Conditional rendering of buttons */}
                {!acceptedServices.has(item.deliveryserviceid) && !completedServices.has(item.deliveryserviceid) ? (
                  <button
                    className="btn btn-primary"
                    style={{ width: '100px', margin: "10px auto" }}
                    onClick={() => updatestatus(item.deliveryserviceid)}
                  >
                    Accept
                  </button>
                ) : null}
                {acceptedServices.has(item.deliveryserviceid) && !completedServices.has(item.deliveryserviceid) ? (
                  <button
                    className="btn btn-success"
                    style={{ width: '200px', margin: "10px auto" }}
                    onClick={() => addworkstatus(item.user1.userid, item.deliveryserviceid)}
                  >
                    Task Completed
                  </button>
                ) : null}
              </Card>
            </div>
          ))
        )}
      </div>
    </>
  );
}
