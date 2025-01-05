import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';

export default function Viewfeed() {
  const [feedbacklist, setFeedbacklist] = useState([]);
  const [employeeFeedback, setEmployeeFeedback] = useState([]); // Track average feedback for employees

  const employid = sessionStorage.getItem('empid');

  useEffect(() => {
    getfeedback();
  }, []);

  function getfeedback() {
    axios
      .get(`http://localhost:8080/getfeedback/${employid}`)
      .then((res) => {
        // Check if response is an array before setting state
        if (Array.isArray(res.data)) {
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
        } else {
          // In case the response is not an array, log it and show an error
          console.error("API response is not an array", res.data);
          setFeedbacklist([]);
        }
      })
      .catch((err) => {
        const errorMessage = err.response?.data || "An error occurred while fetching feedback";
        toast.error(errorMessage);
      });
  }

  // Get unique employees from feedbacklist
  const uniqueEmployees = [...new Set(feedbacklist.map(item => item.employees1.empname))];

  return (
    <>
      <h1 style={{ color: "maroon", padding: "20px", textAlign: "center", marginTop: "-1500px" }}>
        View Feedback List
      </h1>
      <Card className='displayfeed2card'>
        <Card.Body>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Employee Name</th>
                <th>Average Ratings</th>
              </tr>
            </thead>
            <tbody>
              {uniqueEmployees.length > 0 ? (
                uniqueEmployees.map((empname, index) => {
                  const employeeFeedbackEntry = employeeFeedback.find((feedback) => feedback.empname === empname);
                  const feedbackItem = feedbacklist.find((item) => item.employees1.empname === empname);
                  if (feedbackItem) {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{feedbackItem.employees1.empname}</td>
                        <td>{employeeFeedbackEntry?.averageFeedback || 0}</td>
                      </tr>
                    );
                  }
                  return null;
                })
              ) : (
                <tr>
                  <td colSpan="3">
                    <h5 style={{ color: "red" }}>No feedback yet Posted</h5>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </>
  );
}
