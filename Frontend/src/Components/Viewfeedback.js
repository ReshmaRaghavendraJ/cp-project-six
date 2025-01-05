import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

export default function Viewfeedback() {
  const [feedbacklist, setFeedbacklist] = useState([]);
  const [employeeFeedback, setEmployeeFeedback] = useState([]);

  useEffect(() => {
    getallfeedback();
  }, []);

  function getallfeedback() {
    axios
      .get("http://localhost:8080/getallfeedback")
      .then((res) => {
        setFeedbacklist(res.data);

        // Calculate average feedback per employee
        const feedbackMap = {};
        res.data.forEach((item) => {
          if (!feedbackMap[item.employees1.empname]) {
            feedbackMap[item.employees1.empname] = { total: 0, count: 0 };
          }
          feedbackMap[item.employees1.empname].total += item.feedback;
          feedbackMap[item.employees1.empname].count += 1;
        });

        // Convert feedbackMap to a format suitable for rendering
        const feedbackArray = Object.keys(feedbackMap).map((empname) => ({
          empname,
          averageFeedback: (feedbackMap[empname].total / feedbackMap[empname].count).toFixed(2),
        }));

        setEmployeeFeedback(feedbackArray);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  // Get unique employees from feedbacklist
  const uniqueEmployees = [...new Set(feedbacklist.map(item => item.employees1.empname))];

  return (
    <>
      <h1 style={{ color: "maroon", padding: "20px", textAlign: "center", marginTop: "-1500px" }}>
        View Feedback
      </h1>

      {/* Check if feedbacklist is empty */}
      {feedbacklist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', fontSize: '18px' }}>
          <h2>No feedback yet posted</h2>
        </div>
      ) : (
        <Card className='displayfeedcard'>
          <Card.Body>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Employee Name</th>
                  <th>Avg Feedback</th>
                </tr>
              </thead>
              <tbody>
                {uniqueEmployees.map((empname, index) => {
                  const employeeFeedbackEntry = employeeFeedback.find(feedback => feedback.empname === empname);
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{empname}</td>
                      <td>{employeeFeedbackEntry?.averageFeedback || 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
