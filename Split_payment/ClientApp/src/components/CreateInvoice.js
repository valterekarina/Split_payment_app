import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import './CreateInvoice.css';

export const CreateInvoice = () => {
    const history = useHistory();

    const [invoiceNo, setInvoiceNo] = useState("");
    const [apartmentId, setApartmentId] = useState(0);
    const [rent, setRent] = useState(0.00);
    const [electricity, setElectricity] = useState(0.00);
    const [heating, setHeating] = useState(0.00);
    const [utilityPayment, setUtilityPayment] = useState(0.00);
    const [userId, setUserId] = useState(0);
    const [sumToPay, setSumToPay] = useState(0.00);
    const [invoiceDate, setInvoiceDate] = useState(null);
    const [status, setStatus] = useState("");
    const [signedInUserId, setSignedInUserId] = useState(0);

    const [allApartment, setAllApartments] = useState([]);
    const [allInvoice, setAllInvoice] = useState([]);
    const [invoices, setInvoices] = useState([]);

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

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
                const response = await fetch("http://localhost:5000/api/get-all-invoices");
                if (!response.ok) {
                    console.log("error");
                }

                const content2 = await response.json();
                setAllInvoice(content2);
            }

        )();

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
                else {
                    setSignedInUserId(content.id);
                }
            }
        )();

    }, [history, allApartment]);

    const handleCreate = (apartment) => {
        setApartmentId(apartment.id);
        setRent(apartment.rentPrice);
        setUserId(signedInUserId);

        handleShow1();
    }

    const resetData = () => {
        setApartmentId(0);
        setInvoiceNo("");
        setHeating(0.00);
        setElectricity(0.00);
        setUtilityPayment(0.00);
        setRent(0);
        setSumToPay(0.00);
        setInvoiceDate(null);
        setStatus("");
    }

    const cancelCreateInvoice = () => {
        console.log(invoices);
        handleClose1();
        resetData();
    }

    const handleCreateInvoice = async (e) => {
        e.preventDefault();

        const sameInvoiceNo = allInvoice.filter(invoice => invoice.invoiceNo === invoiceNo);

        if (sameInvoiceNo.length > 0) {
            alert("Invoice number must be unique!");
        } else {



            try {
                const response = await fetch("http://localhost:5000/api/create-invoice-owner", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        invoiceNo,
                        apartmentId: parseInt(apartmentId),
                        rent: parseFloat(rent),
                        electricity: parseFloat(electricity),
                        heating: parseFloat(heating),
                        utilityPayment: parseFloat(utilityPayment),
                        userId: parseInt(userId),
                    }),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Invoice created: ', result);
                    handleClose1();
                    resetData();
                    window.location.reload();
                } else {
                    const errorData = await response.json();
                    console.log("failed to create invoice", response, errorData)
                }

            } catch {
                console.log("error");
            }
        }
    }

    const loadInvoices = (apartmentId) => {

        const filtered = allInvoice.filter(invoice => invoice.apartmentId === apartmentId);
        setInvoices(filtered);
    }

    const handleSeeDetails = (invoice) => {
        setInvoiceNo(invoice.invoiceNo);
        setRent(invoice.rent);
        setElectricity(invoice.electricity);
        setHeating(invoice.heating);
        setUtilityPayment(invoice.utilityPayment);
        setSumToPay(invoice.sumToPay);
        setInvoiceDate(invoice.date.substring(0, 10));

        handleShow2();
    }

    const handleCloseSeeDetails = () => {
        handleClose2();
        resetData();
    }

    const handleEditInvoice = (invoice) => {
        setInvoiceNo(invoice.invoiceNo);
        setElectricity(invoice.electricity);
        setHeating(invoice.heating);
        setUtilityPayment(invoice.utilityPayment);
        setStatus(invoice.status);
        setApartmentId(invoice.apartmentId);

        handleShow3();
    }

    const handleCloseEditInvoice = () => {
        handleClose3();
        resetData();
    }

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/edit-invoice", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    invoiceNo,
                    utilityPayment: parseFloat(utilityPayment),
                    electricity: parseFloat(electricity),
                    heating: parseFloat(heating),
                    status,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Invoice updated: ', result);
                handleClose3();
                window.location.reload();
                resetData();

            } else {
                const errorData = await response.json();
                console.log("failed to create invoice", response, errorData)
            }

        } catch {
            console.log("error");
        }

    }

    const handleMarkAsPaid = async (item) => {
        try {
            const response = await fetch("http://localhost:5000/api/edit-invoice", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    invoiceNo: item.invoiceNo,
                    utilityPayment: parseFloat(item.utilityPayment),
                    electricity: parseFloat(item.electricity),
                    heating: parseFloat(item.heating),
                    status: "paid",
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Invoice updated: ', result);
                resetData();
                window.location.reload();

            } else {
                const errorData = await response.json();
                console.log("failed to create invoice", response, errorData)
            }

        } catch {
            console.log("error");
        }
    }

    return (
        <div className="homeDiv">
            <h1>Invoices</h1>
            <div className="forAccordion">
                <Accordion>
                    {allApartment.map((apartment, index) => (
                        <div>
                            <Accordion.Item eventKey={index + 1}>
                                <Accordion.Header>
                                    <div>
                                        {apartment.city}, {apartment.street} {apartment.houseNo} - {apartment.apartmentNo}
                                        <Button className="loadInvoiceButton" variant="primary" onClick={() => loadInvoices(apartment.id)}>Load invoices</Button>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="forAddButton">
                                        <Button variant="secondary" className="addArticleButton" onClick={() => handleCreate(apartment)}>Create Invoice</Button>
                                    </div>
                                    <div className="invoice-table-owner">
                                        <Table striped bordered hover className="invoice-table">
                                            <thead>
                                                <tr>
                                                    <th className="date-col">Date</th>
                                                    <th className="sum-col">Full Payment</th>
                                                    <th className="status-col">Status</th>
                                                    <th className="action-col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoices.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td className="date-col">{item.date.substring(0, 10)}</td>
                                                        <td className="sum-col">{Number(parseFloat(item.sumToPay)).toFixed(2)} EUR</td>
                                                        <td className="status-col">{item.status}</td>
                                                        <td className="action-col">
                                                            {item.status === "unpaid" && (
                                                                <button className="btn btn-secondary" onClick={() => handleEditInvoice(item)}>Edit</button>
                                                            )}
                                                            &nbsp;<button className="btn btn-primary" onClick={() => handleSeeDetails(item)} >See details</button>&nbsp;
                                                            {item.status === "pending" && (
                                                                <button className="btn btn-danger" onClick={() => handleMarkAsPaid(item)}>Mark as paid</button>
                                                            )}

                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
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
                    <Modal.Title>Create Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Invoice No</Form.Label>
                            <input type="text" className="form-control" id="invoiceNo" name="invoiceNo" onChange={e => setInvoiceNo(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Electricity</Form.Label>
                            <input type="number" step="0.01" min="0" className="form-control" id="electricity" name="electricity" onChange={e => setElectricity(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Utility Payment</Form.Label>
                            <input type="number" step="0.01" min="0" className="form-control" id="utilityPayment" name="utilityPayment" onChange={e => setUtilityPayment(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Heating</Form.Label>
                            <input type="number" step="0.01" min="0" className="form-control" id="heating" name="heating" onChange={e => setHeating(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelCreateInvoice}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateInvoice}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header>
                    <Modal.Title>Invoice "{invoiceNo}" details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Electricity, EUR</Form.Label>
                            <input type="number" className="form-control" id="electricity" name="electricity" value={Number(parseFloat(electricity).toFixed(2))} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Utility Payment, EUR</Form.Label>
                            <input type="number" className="form-control" id="utilityPayment" name="utilityPayment" value={Number(parseFloat(utilityPayment).toFixed(2))} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Heating, EUR</Form.Label>
                            <input type="number" className="form-control" id="heating" name="heating" value={Number(parseFloat(heating).toFixed(2))} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Rent, EUR</Form.Label>
                            <input type="number" className="form-control" id="rent" name="rent" value={Number(parseFloat(rent).toFixed(2))} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label><b>Total, EUR</b></Form.Label>
                            <input type="number" className="form-control" id="sumToPay" name="sumToPay" value={Number(parseFloat(sumToPay).toFixed(2))} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Invoice creation date</Form.Label>
                            <input type="text" className="form-control" id="invoiceDate" name="invoiceDate" value={invoiceDate} readOnly />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSeeDetails}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show3} onHide={handleClose3}>
                <Modal.Header>
                    <Modal.Title>Edit invoice "{invoiceNo}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Electricity, EUR</Form.Label>
                            <input type="number" step="0.01" min="0" className="form-control" id="electricity" name="electricity" value={electricity} onChange={e => setElectricity(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Utility Payment, EUR</Form.Label>
                            <input type="number" step="0.01" min="0" className="form-control" id="utilityPayment" name="utilityPayment" value={utilityPayment} onChange={e => setUtilityPayment(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Heating, EUR</Form.Label>
                            <input type="number" step="0.01" min="0" className="form-control" id="heating" name="heating" value={heating} onChange={e => setHeating(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditInvoice}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
