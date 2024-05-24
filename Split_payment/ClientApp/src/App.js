import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './custom.css'

import { Home } from './components/Home';
import { NavMenu } from './components/NavMenu';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { ProfilePage } from './components/ProfilePage';
import { CreateInvoice } from './components/CreateInvoice';
import { Apartments } from './components/Apartments';
import { InvoicesUser } from './components/InvoicesUser';
import { UserList } from './components/UserList';

export const App = () => {

    const [role, setRole] = useState(' ');
    const [approved, setApproved] = useState(' ');

    useEffect(() => {
        (
            async () => {
                const response = await fetch("http://localhost:5000/api/profile", {
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                })

                const content = await response.json();
                setRole(content.role);
                setApproved(content.isApproved);
            }
        )();
    });
    return (
        <BrowserRouter>
            <NavMenu role={role} setRole={setRole} approved={approved} />
            <Route exact path='/' component={() => <Home role={role} />} />
            <Route path='/sign-in' component={() => <SignIn setRole={setRole} />} />
            <Route path='/sign-up' component={SignUp} />
            <Route exact path='/profile' component={() => <ProfilePage role={role} setRole={setRole} />} />
            <Route exact path='/create-invoice' component={() => <CreateInvoice />} />
            <Route exact path='/apartments' component={() => <Apartments role={role} />} />
            <Route exact path='/invoices' component={() => <InvoicesUser role={role} />} />
            <Route exact path='/user-list' component={() => <UserList />} />
        </BrowserRouter>
    );
}
