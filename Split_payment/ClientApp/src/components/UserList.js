import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './UserList.css'

export const UserList = () => {
    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [apartment, setApartment] = useState(null);

    const [allUsers, setAllUsers] = useState([]);
    const [allApartment, setAllApartments] = useState([]);

    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    useEffect(() => {

        (
            async () => {
                const response = await fetch("http://localhost:5000/api/profile", {
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                })

                const content = await response.json();
                if (content.role !== 'owner') {
                    history.push('/');
                }
            }
        )();

        (
            async () => {
                const response = await fetch("http://localhost:5000/api/get-all-users", {
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                })

                const content = await response.json();
                const users = content.filter(user => user.role === 'user');
                setAllUsers(users);
            }
        )();

        (
            async () => {
                const response = await fetch("http://localhost:5000/api/get-all-apartments");
                if (!response.ok) {
                    console.log("error");
                }

                const content = await response.json();
                setAllApartments(content);
            }
        )();

    }, [history]);

    const handleDelete = async (user) => {

        if (window.confirm("Do you really want to delete \"" + user.name + "\" profile ? ") === true) {
            try {
                const response = await fetch("http://localhost:5000/api/delete-other", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                    body: JSON.stringify({
                        emailOld: user.email
                    }),
                });

                if (response.ok) {
                    window.location.reload();
                } else {
                    const errorData = await response.json();
                    console.log("Error: ", errorData);
                }
            } catch (error) {
                console.error("Error: ", error);
            }
        }
    }

    const handleApprove = async (user) => {
        try {
            const response = await fetch("http://localhost:5000/api/approve-user", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({
                    emailOld: user.email,
                }),
            });

            if (response.ok) {
                console.log("ok")
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.log("Error: ", errorData);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const handleSeeDetails = (user) => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);

        const myapartment = allApartment.filter(apartments => apartments.id === user.apartmentId)
        setApartment(myapartment[0].city + ", " + myapartment[0].street + " " + myapartment[0].houseNo + " - " + myapartment[0].apartmentNo);

        handleShow1();
    }

    return (
        <div className="homeDiv">
            <h1>Tenants List</h1>
            <br />
            <div className="tableDiv">
                <Table striped bordered hover className="userTable">
                    <thead>
                        <tr>
                            <th className="nameCol">Name</th>
                            <th className="approveCol">Approved/Not Approved</th>
                            <th className="actionCol"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user, index) => (
                            <tr key={user.id}>
                                <td className="nameCol">{user.name}</td>
                                <td className="approveCol">{user.isApproved}</td>
                                <td className="actionCol">
                                    {user.isApproved !== 'approved' && (
                                        <button className="btn btn-primary" onClick={() => handleApprove(user)}>Approve User</button>
                                    )}
                                    &nbsp;<button className="btn btn-danger" onClick={() => handleDelete(user)}>Delete User</button>
                                    &nbsp;<button className="btn btn-secondary" onClick={() => handleSeeDetails(user)}>See Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table></div>


            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <input type="email" className="form-control" id="email" name="email" value={email} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone</Form.Label>
                            <input type="text" className="form-control" id="phone" name="phone" value={phone} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Apartment</Form.Label>
                            <input type="text" className="form-control" id="apartment" name="apartment" value={apartment} readOnly />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}