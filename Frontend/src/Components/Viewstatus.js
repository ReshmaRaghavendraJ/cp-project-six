import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Viewstatus() {
  const [statuslist, setStatuslist] = useState({});
  const [feedback, setFeedback] = useState(0);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [feedbacklist, setFeedbacklist] = useState({});
  const ursid = sessionStorage.getItem('userid');

  useEffect(() => {
    if (ursid) {
      getworkstatus();
      getfeedbackuserid();  // Fetch feedback data on component mount
    }
  }, [ursid]);

  function getworkstatus() {
    axios
      .get(`http://localhost:8080/getworkstatus/${ursid}`)
      .then((res) => {
        setStatuslist(res.data);
        if (res.data.feedback) {
          setFeedback(res.data.feedback);
          setIsFeedbackSubmitted(true); // If feedback exists, hide stars
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  function clearAll() {
    setFeedback(0);
  }

  function addfeedback(empid, feedback) {
    const obj = { feedback };
    axios
      .post(`http://localhost:8080/addfeedback/${ursid}/${empid}`, obj)
      .then((res) => {
        toast.success(res.data);
        setStatuslist((prevStatus) => ({
          ...prevStatus,
          feedback, // Update feedback in the status list
        }));
        setIsFeedbackSubmitted(true); // Set feedback as submitted
        clearAll();
        getfeedbackuserid();
      })
      .catch((err) => {
        toast.error(err.response.data);
        clearAll();
      });
  }

  const handleStarClick = (star) => {
    setFeedback(star); // Update the rating state with the selected rating
    if (statuslist?.employees?.empid) {
      addfeedback(statuslist.employees.empid, star);
    }
  };

  function getfeedbackuserid()    /* Get - Particular users given Feedback */
   {     
    axios
      .get(`http://localhost:8080/getfeedbackuserid/${ursid}`)
      .then((res) => {
        setFeedbacklist(res.data);
        if (res.data.length > 0) {
          setIsFeedbackSubmitted(true); // Hide stars if feedback exists
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  return (
    <>
      <div>
        <h1 style={{ color: 'maroon', padding: '20px', marginLeft: '10px', marginTop: '-1500px' }}>View Status of Employee</h1>
        <div className='card-container'>
          {statuslist && statuslist.employees && (
            <Card style={{ width: '300px', height: '500px', margin: '10px' }}>
              <Card.Body>
                <Card.Title>
                  <img src={statuslist.employees.photo} alt="emp" width="250px" />
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item style={{ color: 'Green' }}>
                  <h5>{statuslist.workstatus}</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6>Employee Name:</h6>
                  {statuslist.employees.empname}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6>Workstatus Posted Date:</h6>
                  {statuslist.posteddate}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6>Phoneno:</h6>
                  {statuslist.employees.phoneno}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          )}
        </div>

        <div className="form-outline lbl">
          <label className="form-label me-4" style={{  color: 'green',marginLeft: '150px' ,marginTop:"150px"}}>
            <h5 style={{marginLeft:"-10px"}}>Ratings:</h5>
          </label>
          {isFeedbackSubmitted ? (
            <h5 style={{ color: 'green', marginLeft: '270px',marginTop:"-40px" }}>
              {feedbacklist.length > 0 ? feedbacklist[0].feedback : feedback}
            </h5>
          ) : (
            [1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{ cursor: 'pointer', color: star <= feedback ? 'gold' : 'gray', fontSize: '40px' }}
                onClick={() => handleStarClick(star)}
              >
                &#9733;
              </span>
            ))
          )}
        </div>
      </div>
    </>
  );
}


