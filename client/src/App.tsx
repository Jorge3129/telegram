import { FC, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErrorBoundary from "./shared/errors/ErrorBoundary";
import { useSelector } from "react-redux";
import { selectUser, setUser, setUserLoading } from "./redux/user-reducer";
import { useAppDispatch } from "./redux/store";
import { authService } from "./auth/services/auth.service";

import "./App.scss";
import MainComponent from "./main/main-component/MainComponent";
import LoginPage from "./auth/components/login-page/LoginPage";
import GlobalModal from "./shared/components/global-modal/GlobalModal";

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
        <GlobalModal>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  user ? (
                    <MainComponent user={user} />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Router>
        </GlobalModal>
      </ErrorBoundary>
    </div>
  );
};

export default App;
