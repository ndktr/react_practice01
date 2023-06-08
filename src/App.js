import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home/Home';
import Todo from './pages/Todo/Todo';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    //ログイン状態監視
    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            console.log('onAuthStateChanged:', !!user);
            setIsLoggedIn(!!user);
            setAuthLoading(false);
        })
    }, []);

    return (
        <div className="app">
            <Header isLoggedIn = {isLoggedIn} />
            {authLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <Router>
                    <div className="app-main">
                        <Routes>
                            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                            <Route path='/todo' element={<Todo isLoggedIn={isLoggedIn} />} />
                        </Routes>
                    </div>
                </Router>
            )}
            <div className="app-footer">
                <p className="app-footer-text">&copy; 2023 ToDoMe. All rights reserved.</p>
            </div>
        </div>
    );
}

export default App;
