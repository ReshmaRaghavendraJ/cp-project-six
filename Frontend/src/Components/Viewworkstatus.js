import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Viewworkstatus() {
  const [workstatuslist, setworkstatuslist] = useState([]);

  useEffect(() => {
    getallworkstatus();
  }, []); // Add empty dependency array to make sure it runs only once after mount

  function getallworkstatus() {
    axios
      .get("http://localhost:8080/getallworkstatus")
      .then((res) => {
        setworkstatuslist(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  return (
    <>
      <h1 style={{ color: "maroon", padding: "20px", textAlign: "center", marginTop: "-1500px" }}>
        View Workstatus List
      </h1>

      {/* Check if the workstatuslist is empty */}
      {workstatuslist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', fontSize: '18px' }}>
          <h2>No work status Found yet</h2>
        </div>
      ) : (
        <Card className='status1card'>
          <Card.Body>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Workstatus id</th>
                  <th>Workstatus</th>
                  <th>Employee Name</th>
                  <th>Username</th>
                  <th>Posted Date</th>
                </tr>
              </thead>
              <tbody>
                {workstatuslist.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.workstatusid}</td>
                      <td>{item.workstatus}</td>
                      <td>{item.employees.empname}</td>
                      <td>{item.user6.username}</td>
                      <td>{item.posteddate}</td>
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
