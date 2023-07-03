import { ChangeEvent, MouseEvent, FC, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router";
import { IUser } from "../../types/types";
import api from "../../api/api";
import { setUser } from "../../redux/user-reducer";
import { useAppDispatch } from "../../redux/store";
import { usersApiService } from "../../users/users-api.service";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<IUser>({ username: "", password: "" });

  const dispatch = useAppDispatch();

  const handleUser = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, username: e.target.value });
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, password: e.target.value });
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await api.login(state);

    if (response.data.userId) {
      const user = await usersApiService.getUser(response.data.userId);
      localStorage.setItem("userId", response.data.userId + "");
      dispatch(setUser(user));
    }

    navigate("/");
  };

  return (
    <div className="login_container">
      <h2>Login</h2>
      <form className="login_form">
        <label>
          Username
          <input type="text" value={state.username} onChange={handleUser} />
        </label>
        <label>
          Password
          <input
            type="password"
            value={state.password}
            onChange={handlePassword}
          />
        </label>
        <button type="submit" className="login_submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
