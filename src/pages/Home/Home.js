import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { logIn } from '../../utils/auth';

function Home(props) {
    const { isLoggedIn } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = event => {
        event.preventDefault();
        logIn(event, email, password);
    };

    if (isLoggedIn) {
        return <Navigate to="/todo" />
    } else {
        return (
            <div className="home">
                <div className="home-text">
                    This is todo app for me.<br/>
                    Check todo list once a day.<br/>
                    <span className="home-text-famous">"If you can’t fly, then run, if you can’t run, then walk, if you can’t walk, then crawl, but whatever you do, you have to keep moving forward."</span>
                </div>  
                <div className="home-login">
                    <form className="home-login-form" onSubmit={onLogin}>
                        <div className="home-login-form-line">
                            <label>Email:</label>
                            <input type="email" name="email" className="home-login-form-email" value={email} onChange={event => setEmail(event.target.value)} />
                        </div>
                        <div className="home-login-form-line">
                            <label>Password:</label>
                            <input type="password" name="password" className="home-login-form-password" value={password} onChange={event => setPassword(event.target.value)} />
                        </div>
                        <div className="home-login-form-line">
                            <button type="submit" className="home-login-form-button">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Home;