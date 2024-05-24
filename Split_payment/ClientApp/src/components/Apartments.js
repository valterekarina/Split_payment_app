import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Apartments.css';

export const Apartments = ({ role }) => {

    const history = useHistory();

    const [id, setId] = useState(0);
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [apartmentNo, setApartmentNo] = useState('');
    const [area, setArea] = useState(0.00);
    const [rentPrice, setRentPrice] = useState(0);
    const [relation, setRelation] = useState('');

    const [text, setText] = useState('');

    const [allApartment, setAllApartments] = useState([]);
    const [allNotes, setAllNotes] = useState([]);
    const [apartmentNotes, setApartmentNotes] = useState([]);

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const handleClose4 = () => {
        setShow4(false);
        //resetData();
    }
    const handleShow4 = () => setShow4(true);

    useEffect(() => {

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

        (
            async () => {
                const response = await fetch("http://localhost:5000/api/get-all-notes");
                if (!response.ok) {
                    console.log("error");
                }

                const content = await response.json();
                setAllNotes(content);
            }

        )();

        if (role !== 'owner') {
            history.push('/');
        }
    }, [role, history, allApartment, allNotes]);

    const resetData = () => {
        id(0);
        setCity('');
        setStreet('');
        setHouseNo('');
        setApartmentNo('');
        setArea(0.00);
        setRentPrice(0);
        setRelation('');
        setText('');
    }

    const handleAddApartment = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/create-apartment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    city,
                    street,
                    houseNo,
                    apartmentNo,
                    area: parseFloat(area),
                    rentPrice: parseInt(rentPrice),
                    relation,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Apartment created: ', result);
                handleClose2();
                resetData();
            } else {
                const errorData = await response.json();
                console.log("failed to create apartment", response, errorData)
            }

        } catch {
            console.log("error");
        }
    };

    const cancelAddApartment = () => {
        handleClose1();
        resetData();
    }

    const handleEdit = (apartment) => {
        setId(apartment.id);
        setCity(apartment.city);
        setStreet(apartment.street);
        setHouseNo(apartment.houseNo);
        setApartmentNo(apartment.apartmentNo);
        setArea(apartment.area);
        setRentPrice(apartment.rentPrice);
        setRelation(apartment.relation);
        handleShow2();
    }

    const handleUpdateApartment = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/edit-apatment", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: parseInt(id),
                    city,
                    street,
                    houseNo,
                    apartmentNo,
                    area: parseFloat(area),
                    rentPrice: parseInt(rentPrice),
                    relation,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Apartment updated: ', result);
                handleClose2();
                resetData();
            } else {
                const errorData = await response.json();
                console.log("failed to create apartment", response, errorData)
            }

        } catch {
            console.log("error");
        }
    };

    const cancelUpdateApartment = () => {
        handleClose2();
        resetData();
    }

    const handleAddNote = (apartmentId) => {
        setId(apartmentId);
        handleShow3();
    };

    const cancelAddNote = () => {
        resetData();
        handleClose3();
    };

    const handleAddNoteComplete = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/create-note", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    apartmentId:parseInt(id),
                    text
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Note created: ', result);
                handleClose3();
                resetData();
            } else {
                const errorData = await response.json();
                console.log("failed to create note", response, errorData)
            }

        } catch {
            console.log("error");
        }
    };

    const handleSeeNotes = (apartmentGivenId) => {

        setApartmentNotes(allNotes.filter(note => note.apartmentId === apartmentGivenId));
        handleShow4();
    };

    return (
        <div className="homeDiv">
            <h1>Apartments</h1>
            <div className="forAddButton">
                <Button variant="primary" className="addArticleButton" onClick={handleShow1}>Add Apartment</Button>
            </div>
            <div className="forAccordion">
                <Accordion>
                    {allApartment.map((apartment, index) => (
                        <div>
                            <Accordion.Item eventKey={index + 1}>
                                <Accordion.Header>
                                    <div>
                                        {apartment.city}, {apartment.street} iela {apartment.houseNo} - {apartment.apartmentNo}
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        Area: {apartment.area} m2
                                    </p>
                                    <p>
                                        Rent price: {apartment.rentPrice} EUR/month
                                    </p>
                                    <div className="forAddButton">
                                        <Button variant="link" className="editDeleteButton" onClick={() => handleSeeNotes(apartment.id)}>See All Notes</Button>
                                        <Button variant="secondary" className="editDeleteButton" onClick={() => handleAddNote(apartment.id)}>Add Note</Button>
                                    </div>
                                    <div className="forAddButton">
                                        <Button variant="primary" className="editDeleteButton" onClick={() => handleEdit(apartment)}>Edit</Button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <br />
                        </div>
                    ))}
                </Accordion>
            </div>

            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header>
                    <Modal.Title>Add Apartment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>City</Form.Label>
                            <input type="text" className="form-control" id="city" name="city" onChange={e => setCity(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Street</Form.Label>
                            <input type="text" className="form-control" id="street" name="street" onChange={e => setStreet(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>House Number</Form.Label>
                            <input type="text" className="form-control" id="houseNo" name="houseNo" onChange={e => setHouseNo(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Apartment Number</Form.Label>
                            <input type="text" className="form-control" id="apartmentNo" name="apartmentNo" onChange={e => setApartmentNo(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Area</Form.Label>
                            <input type="number" step="0.01" min="0" className="form-control" id="area" name="area" onChange={e => setArea(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Rent Price</Form.Label>
                            <input type="number" min="0" className="form-control" id="rentPrice" name="rentPrice" onChange={e => setRentPrice(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Relation with other aprartment</Form.Label>
                            <input type="text" className="form-control" id="relation" name="relation" onChange={e => setRelation(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelAddApartment}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddApartment}>
                        Add Apartment
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header>
                    <Modal.Title>Edit Apartment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>City</Form.Label>
                            <input type="text" className="form-control" id="city" name="city" value={city} onChange={e => setCity(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Street</Form.Label>
                            <input type="text" className="form-control" id="street" name="street" value={street} onChange={e => setStreet(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>House Number</Form.Label>
                            <input type="text" className="form-control" id="houseNo" name="houseNo" value={houseNo} onChange={e => setHouseNo(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Apartment Number</Form.Label>
                            <input type="text" className="form-control" id="apartmentNo" name="apartmentNo" value={apartmentNo} onChange={e => setApartmentNo(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Area</Form.Label>
                            <input type="number" step="0.01" min="0" className="form-control" id="area" name="area" value={area} onChange={e => setArea(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Rent Price</Form.Label>
                            <input type="number" min="0" className="form-control" id="rentPrice" name="rentPrice" value={rentPrice} onChange={e => setRentPrice(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Relation with other aprartment</Form.Label>
                            <input type="text" className="form-control" id="relation" name="relation" value={relation} onChange={e => setRelation(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelUpdateApartment}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateApartment}>
                        Save Apartment
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show3} onHide={handleClose3}>
                <Modal.Header>
                    <Modal.Title>Add Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Text</Form.Label>
                            <Form.Control as="textarea" rows={4} className="form-control"  name="text" onChange={e => setText(e.target.value)} required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelAddNote}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddNoteComplete}>
                        Add Note
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show4} onHide={handleClose4}>
                <Modal.Header>
                    <Modal.Title>All Notes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {apartmentNotes.map((note) => (
                            <>
                                <div>{note.text}</div>
                                <div>{note.noteDate.substring(0, 10)}</div>
                                <br />
                            </>
                            
                        ))}
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose4}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}