import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './InvoicesUser.css'

export const InvoicesUser = ({ role }) => {

    const history = useHistory();

    const [invoiceNo, setInvoiceNo] = useState("");
    const [apartmentId, setApartmentId] = useState(0);
    const [rent, setRent] = useState(0.00);
    const [electricity, setElectricity] = useState(0.00);
    const [heating, setHeating] = useState(0.00);
    const [utilityPayment, setUtilityPayment] = useState(0.00);
    const [sumToPay, setSumToPay] = useState(0.00);
    const [invoiceDate, setInvoiceDate] = useState(null);

    const [showInvoices, setShowInvoices] = useState(false);

    const [individualSumToPay, setIndividualSumToPay] = useState(0.00);
    const [livingArea, setLivingArea] = useState(0.00);
    const [apartment, setApartment] = useState(null);
    const [allApartment, setAllApartments] = useState([]);
    const [allInvoice, setAllInvoice] = useState([]);
    const [invoices, setInvoices] = useState([]);

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    useEffect(() => {

        (
            async () => {
                const response = await fetch("http://localhost:5000/api/profile", {
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                })

                const content = await response.json();
                if (content.role !== 'user') {
                    history.push('/');
                }
                else {
                    //setSignedInUserId(content.id);
                    setApartmentId(content.apartmentId);
                    setLivingArea(content.livingArea);
                }
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
                const response = await fetch("http://localhost:5000/api/get-all-apartments");
                if (!response.ok) {
                    console.log("error");
                }

                const content = await response.json();
                setAllApartments(content);
            }
        )();

    }, [history]);

    const handleShowInvoices = async () => {
        setShowInvoices(true);

        const myInvoices = allInvoice.filter(invoice => invoice.apartmentId === apartmentId);
        setInvoices(myInvoices);

        const myApartment = allApartment.filter(apartment => apartment.id === apartmentId);
        setApartment(myApartment);
    }

    const handleHideInvoices = () => {
        setShowInvoices(false);
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
    }

    const handleSeeDetails = (invoice) => {
        setIndividualSumToPay(parseFloat(invoice.sumToPay) / parseFloat(apartment[0].area) * parseFloat(livingArea));
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

    const handleMarkAsPaid = async (item) => {
        try {
            const response = await fetch("http://localhost:5000/api/mark-paid", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    invoiceNo: item.invoiceNo,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Invoice updated: ', result);
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
            {!showInvoices && (
                <Button variant="primary" onClick={handleShowInvoices}> Show my invoices</Button>
            )}
            {showInvoices && (
                <div>
                    <Button variant="primary" onClick={handleHideInvoices}> Hide my invoices</Button>
                    <Table striped bordered hover className="invoicesTable">
                        <thead>
                            <tr>
                                <th className="dateCol">Date</th>
                                <th className="sumCol">Sum To Pay</th>
                                <th className="paymentCol">Full Payment</th>
                                <th className="statusCol">Status</th>
                                <th className="invActionCol"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="dateCol">{item.date.substring(0, 10)}</td>
                                    <td className="sumCol"><b>{Number(parseFloat(item.sumToPay) / parseFloat(apartment[0].area) * parseFloat(livingArea)).toFixed(2)} EUR</b></td>
                                    <td className="paymentCol">{Number(parseFloat(item.sumToPay)).toFixed(2)} EUR</td>
                                    {item.status !== 'paid' && (
                                        <td className="statusCol"><b>{item.status}</b></td>
                                    )}
                                    {item.status === 'paid' && (
                                        <td className="statusCol">{item.status}</td>
                                    )}

                                    <td className="invActionCol">
                                        <button className="btn btn-primary" onClick={() => handleSeeDetails(item)} >See details</button>&nbsp;
                                        {item.status !== 'paid' && (
                                            <button className="btn btn-danger" onClick={() => handleMarkAsPaid(item)} >Mark as paid</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}

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
                            <Form.Label><b>Sum To Pay, EUR</b></Form.Label>
                            <input type="number" className="form-control" id="sumToPay2" name="sumToPay2" value={Number(individualSumToPay).toFixed(2)} readOnly />
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

        </div>
    )
}
