import { ChangeEvent, FC, useState } from "react";
import "./LoginPage.scss";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../redux/store";
import { setUser } from "../../../redux/user-reducer";
import { usersApiService } from "../../../users/users-api.service";
import { LoginDto } from "../../dto/login-dto";
import { authService } from "../../services/auth.service";

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<LoginDto>({ username: "", password: "" });

  const dispatch = useAppDispatch();

  const handleUser = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, username: e.target.value });
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, password: e.target.value });
  };

  const handleSubmit = async () => {
    const userId = await authService.login(state);

    if (userId) {
      const user = await usersApiService.getUser(userId);

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

        <button
          type="submit"
          className="login_submit"
          onClick={(e) => {
            e.preventDefault();
            void handleSubmit();
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
