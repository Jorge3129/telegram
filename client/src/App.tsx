import React, {FC, useState} from 'react';
import './App.css';
import './components/reuse/Avatar.css'
import Main from "./components/Main";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from "./components/auth/Login";

const App: FC = () => {

    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'));

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={loggedIn ? <Main/> : <Navigate to={'/login'}/>}/>
                    <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
