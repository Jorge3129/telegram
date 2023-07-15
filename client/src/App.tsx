import { FC, useEffect } from "react";
import Main from "./components/Main";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./auth/ui/Login";
import ErrorBoundary from "./shared/errors/ErrorBoundary";
import { useSelector } from "react-redux";
import { selectUser, setUser, setUserLoading } from "./redux/user-reducer";
import { useAppDispatch } from "./redux/store";
import { authService } from "./auth/services/auth.service";

import "./App.scss";

const App: FC = () => {
  const { user, loading } = useSelector(selectUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    authService
      .loadStoredUser()
      .then((user) => {
        if (user) {
          dispatch(setUser(user));
        }
      })
      .finally(() => {
        dispatch(setUserLoading(false));
      });
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route
              path="/"
              element={user ? <Main user={user} /> : <Navigate to={"/login"} />}
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </div>
  );
};

export default App;
