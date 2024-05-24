import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './SignInUp.css';

export const SignIn = ({ setRole }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password
                }),
            });



            if (response.ok) {
                const content = await response.json();
                setRedirect(true);
                setRole(content.role);
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error("Sign In error: ", error);
        }


    }

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div className="sign-form">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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
                    <div>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </div>

                </div>
            </form>
        </div>
    )
}