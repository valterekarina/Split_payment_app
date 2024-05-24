import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './SignInUp.css';

export const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [livingArea, setLivingArea] = useState(0.00);

    const [apartments, setApartments] = useState([]);
    const [selectedApartmentId, setSelectedApartmentId] = useState(null);

    const [redirect, setRedirect] = useState(false);

    const fetchApartments = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/get-all-apartments");
            if (response.ok) {
                const data = await response.json();
                setApartments(data);
            } else {
                console.error("Failed to fetch apartments");
            }
        } catch (error) {
            console.error("Error fetching apartments", error);
        }
    };

    useEffect(() => {
        fetchApartments();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password === confirmPassword) {
            try {
                const response = await fetch("http://localhost:5000/api/create-user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        phone,
                        livingArea: parseFloat(livingArea),
                        apartmentId: parseInt(selectedApartmentId),
                    }),
                });

                if (response.ok) {
                    setRedirect(true);
                } else {
                    const errorData = await response.json();
                    console.log("Registration error: ", errorData);
                }
            } catch (error) {
                console.error("Registration error: ", error);
            }
        }
        else {
            alert("Check entered info");
        }
    };

    if (redirect) {
        return <Redirect to="/sign-in" />;
    }

    return (
        <div className="sign-form">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            onChange={e => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail: </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                            placeholder="example@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Phone number: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            onChange={e => setPhone(e.target.value)}
                            placeholder="+37122222222"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apartment">Choose an Apartment: </label>
                        <select
                            className="form-control"
                            id="apartment"
                            name="apartment"
                            onChange={(e) => setSelectedApartmentId(e.target.value)}
                            value={selectedApartmentId || ''}
                            required
                        >
                            <option value="" disabled>Select an apartment</option>
                            {apartments.map((apartment) => (
                                <option key={apartment.id} value={apartment.id}>
                                    {apartment.city}, {apartment.street} {apartment.houseNo} - {apartment.apartmentNo}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="livingArea">Living Area: </label>
                        <input
                            type="number"
                            className="form-control"
                            id="livingArea"
                            name="livingArea"
                            onChange={e => setLivingArea(e.target.value)}
                            placeholder="22,5"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            placeholder="*******"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm password: </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="*******"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    )
}