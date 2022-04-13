import React, {FC, useState, MouseEvent} from 'react';
import './App.css';
import './components/reuse/styles/Avatar.css'
import Main from "./components/Main";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from "./components/auth/Login";
import ErrorBoundary from "./components/reuse/ErrorBoundary";

const App: FC = () => {

    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'));

    return (

        <div className="App">
            <ErrorBoundary>
                <Router>
                    <Routes>
                        <Route path="/" element={loggedIn ? <Main/> : <Navigate to={'/login'}/>}/>
                        <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>
                    </Routes>
                </Router>
            </ErrorBoundary>
        </div>

    );
}

export default App;
