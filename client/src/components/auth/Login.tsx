import React, {ChangeEvent, MouseEvent, FC, useState, Dispatch, SetStateAction} from 'react';
import './Login.css'
import {useNavigate} from "react-router";
import {IUser} from "../../types/types";
import api from "../../api/api";

interface ILogin {
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login: FC<ILogin> = ({setLoggedIn}) => {

    const navigate = useNavigate();

    const [state, setState] = useState<IUser>({username: '', password: ''});

    const handleUser = (e: ChangeEvent<HTMLInputElement>) => {
        setState({...state, username: e.target.value})
    }

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setState({...state, password: e.target.value})
    }

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const response = await api.login(state);
        if (response.data.success) setLoggedIn(true);
        localStorage.setItem('user', response.data.username)
        navigate('/');
    }

    return (
        <div className="login_container">
            <h2>Login</h2>
            <form className="login_form">
                <label>Username
                    <input
                        type="text"
                        value={state.username}
                        onChange={handleUser}
                    />
                </label>
                <label>Password
                    <input
                        type="password"
                        value={state.password}
                        onChange={handlePassword}
                    />
                </label>
                <button
                    type="submit"
                    className="login_submit"
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
