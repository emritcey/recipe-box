import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getSessionCookie } from '../Sessions';
import NavBarComponent from './NavBarComponent/NavBarComponent';


export default function PrivateRoute({ component: Component, ...rest }) {
    const [session, setSession] = useState(getSessionCookie());
    useEffect(
      () => {
        setSession(getSessionCookie());
      },
      [session.userName]
    );

    return (
        <Route exact {...rest} render={(props) => (
            (typeof session.userName === 'undefined')
            ? <Redirect to='/' />
            : <div><NavBarComponent /><Component {...props}/></div>
        )}/>
    )
}


