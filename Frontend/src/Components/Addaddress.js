import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';

export default function Addaddress() {
    const [selectedContents, setSelectedContents] = useState('');
    const [pickupaddress, setPickupaddress] = useState('');
    const [deliveryaddress, setDeliveryaddress] = useState('');
    const [arealist, setArealist] = useState([]);
    const [servicelist, setServicelist] = useState([]);
    const [selectedarea, setSelectedarea] = useState('');
    const [deliveryservicelist, setDeliveryservicelist] = useState([]);
    const [hideForm, setHideForm] = useState(false);
    const [storedAddressFlag, setStoredAddressFlag] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [editMode, setEditMode] = useState(false); // New state for edit mode
    const [deliveryserviceid, setDeliveryserviceid] = useState(null);


    // Retrieve the user ID from session storage
    const ursid = sessionStorage.getItem('userid');

    useEffect(() => {
        if (ursid) {
            checkUserAddress();
            getallareas();
            getallservices();
        } else {
            toast.error("User not logged in. Please log in to access this page.");
        }
    }, [ursid]);

    const getallservices = () => {
        axios.get("http://localhost:8080/getallservices")
            .then((res) => setServicelist(res.data))
            .catch((err) => toast.error(err.response.data));
    };

    const getallareas = () => {
        axios.get("http://localhost:8080/getallareas")
            .then((res) => setArealist(res.data))
            .catch((err) => toast.error(err.response.data));
    };

    const checkUserAddress = () => {
        axios
        .get(`http://localhost:8080/checkUserAddress/${ursid}`)
            .then((res) => {
                const storedAddress = res.data;
                if (storedAddress && storedAddress !== 'Please enter your address') {
                    setPickupaddress(storedAddress);
                    setHideForm(true);
                    setStoredAddressFlag(true);
                } else {
                    setHideForm(false);
                    setStoredAddressFlag(false);
                }
            })
            .catch((err) => toast.error(err.response.data));
    };

    async function adddeliveryservices(serviceid, selectedarea) {
        try {
            const area = JSON.parse(selectedarea).areaName;
            const areaId = JSON.parse(selectedarea).areaId;
            const combinedPickupAddress = `${pickupaddress} ${area}`;
            const obj = { pickupaddress: combinedPickupAddress, deliveryaddress };

            axios.post(`http://localhost:8080/adddeliveryservices/${areaId}/${serviceid}/${ursid}`, obj)
                .then((res) => {
                    toast.success(res.data);
                });
        } catch (err) {
            toast.error(err.response ? err.response.data : "An error occurred while adding the delivery service.");
        }
    }

    function getdeliveryserviceinfo() {
        axios.get(`http://localhost:8080/getdeliveryserviceinfo/${ursid}`)
            .then((res) => {
                setDeliveryservicelist(res.data);
                setShowCard(true);
            })
            .catch((err) => toast.error(err.response.data));
    }

    const handleRadioChange = (serviceid) => {
        setSelectedContents(serviceid);
    };
    function getaddress(deliveryserviceid) {
        axios.get(`http://localhost:8080/getaddress/${deliveryserviceid}`)
            .then((res) => {
                if (res.data) {
                    const { pickupaddress: fetchedPickupAddress, deliveryaddress: fetchedDeliveryAddress, areaId } = res.data;
                    setPickupaddress(fetchedPickupAddress);
                    setDeliveryaddress(fetchedDeliveryAddress);
                    setSelectedarea(JSON.stringify({ areaId }));
                    setEditMode(true); // Set edit mode to true to show the dropdown
                    setDeliveryserviceid(deliveryserviceid); // Store the delivery service ID in state
                } else {
                    toast.error("No address data found for the selected delivery service.");
                }
            })
            .catch((err) => {
                toast.error(err.response ? err.response.data : "An error occurred while fetching the address.");
            });
    }
    
    function updatebothaddress() {
        const area = JSON.parse(selectedarea);
        if (!area) {
            toast.error("Please select an area to update the address.");
            return;
        }
        const updatedPickupAddress = `${pickupaddress} ${area.areaName}`;
        const obj = { pickupaddress: updatedPickupAddress, deliveryaddress ,area2: { areaid: area.areaId }};

        axios
        .put(`http://localhost:8080/updatebothaddress/${ursid}/${deliveryserviceid}`, obj)
            .then((res) => {
                toast.success(res.data);
                setEditMode(false); // Hide dropdown after update
            })
            .catch((err) => toast.error(err.response ? err.response.data : "An error occurred while updating the address."));
    }

    function adddeliveryaddress() 
    {
        const obj={pickupaddress,deliveryaddress};
        axios
        .put(`http://localhost:8080/adddeliveryaddress/${ursid}`,obj)
        .then((res) => {
            toast.success(res.data);
        })
        .catch((err) => {
            toast.error(err.response.data);
        });
    }

    return (
        <>
            <Card className='pickdeliverycard'>
            <Card.Body>
                    {!storedAddressFlag && (
                        <>
                            <label className='form-label' style={{ marginLeft: "20px" }}>
                                <h5>Select Areas:</h5>
                            </label>
                            <select value={selectedarea} onChange={(e) => setSelectedarea(e.target.value)} className='form-select' style={{ marginLeft: "20px", width: "500px" }}>
                                <option value={0}>--Choose Options--</option>
                                {arealist.map((item, index) => (
                                    <option key={index} value={JSON.stringify({ areaId: item.areaid, areaName: item.area })}>{item.areaid}-{item.area}</option>
                                ))}
                            </select>
                        </>
                    )}

                    <br />

                    <Form.Group className="mb-3">
                        <Form.Label style={{ marginLeft: "20px" }}><h5>Pick-up Address:</h5></Form.Label>
                        <Form.Control type="textarea" style={{ marginLeft: "20px", width: "500px", height: "100px" }} value={pickupaddress} onChange={(e) => setPickupaddress(e.target.value)} />
                        {/* {!storedAddressFlag &&  (<p style={{ color: 'green', marginLeft: '20px' }}>Pickup address loaded.</p>)} */}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label style={{ marginLeft: "20px" }}><h5>Enter Delivery Address:</h5></Form.Label>
                        <Form.Control type="textarea" style={{ marginLeft: "20px", width: "500px", height: "100px" }} value={deliveryaddress} onChange={(e) => setDeliveryaddress(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label style={{ marginLeft: "20px" }}><h5>Select Package Contents:</h5><br /><h5>e.g. Documents</h5></Form.Label>
                        <div style={{ display: 'flex', marginLeft: '20px' }}>
                            {servicelist.map((item, index) => (
                                <div key={index} style={{ marginRight: '20px' }}>
                                    <Form.Check
                                        type="radio"
                                        style={{ fontWeight: "bold" }}
                                        label={item.servicename}
                                        checked={selectedContents === item.serviceid}
                                        onChange={() => handleRadioChange(item.serviceid)}
                                    />
                                </div>
                            ))}

                            {!storedAddressFlag ? (
                                <Button variant="success" style={{ marginLeft: "20px" }} onClick={() => adddeliveryservices(selectedContents, selectedarea)}>
                                    Submit
                                </Button>
                            ) : (
                                <Button variant="info" style={{ marginLeft: "20px" }} onClick={adddeliveryaddress}>
                                    Add Delivery Address
                                </Button>
                            )}

                            {editMode && (
                                <Button variant="info" style={{ marginLeft: "20px" }} onClick={updatebothaddress}>
                                    Update Address
                                </Button>
                            )}

                            <Button variant="warning" style={{ marginLeft: "20px" }} onClick={getdeliveryserviceinfo}>
                                Display
                            </Button>
                        </div>
                    </Form.Group>

                    <br />

                    {showCard && (
                        <Card className='deliveryinfo'>
                            <Card.Body>
                                <Card.Title><h1 style={{color:"maroon",textAlign:"center"}}>Delivery Service Details:</h1></Card.Title>
                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th>Deliveryserviceid</th>
                                            <th>Delivery-Address</th>
                                            <th>Pick-up Address</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            deliveryservicelist.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.deliveryserviceid}</td>
                                                    <td>{item.deliveryaddress}</td>
                                                    <td>{item.pickupaddress}</td>
                                                    <td>{item.status}</td>
                                                    <td><button className='btn btn-primary' onClick={() => getaddress(item.deliveryserviceid)}>Edit</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </Card.Body>
                        </Card>
                    )}

                    {/* Show area dropdown only when editing */}
                    {editMode && (
                        <>
                            <label className='form-label' style={{ marginLeft: "20px" }}>
                                <h5>Select Areas for Update:</h5>
                            </label>
                            <select value={selectedarea} onChange={(e) => setSelectedarea(e.target.value)} className='form-select' style={{ marginLeft: "20px", width: "500px" }}>
                                <option value={0}>--Choose Options--</option>
                                {arealist.map((item, index) => (
                                    <option key={index} value={JSON.stringify({ areaId: item.areaid, areaName: item.area })}>{item.areaid}-{item.area}</option>
                                ))}
                            </select>
                        </>
                    )}
                  </Card.Body>
                  </Card>
                <br />
        </>
    );
}
