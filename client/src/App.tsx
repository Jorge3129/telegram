import React, { FC, useState, MouseEvent, useEffect } from "react";
import "./App.css";
import "./components/reuse/styles/Avatar.css";
import Main from "./components/Main";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import ErrorBoundary from "./components/reuse/ErrorBoundary";
import { useSelector } from "react-redux";
import { selectUser, setUser, setUserLoading } from "./redux/user-reducer";
import { useAppDispatch } from "./redux/store";
import api from "./api/api";

const App: FC = () => {
  const { user, loading } = useSelector(selectUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("userId") || "");

    if (!userId) {
      dispatch(setUserLoading(false));
      return;
    }

    api.getUser(userId).then((user) => {
      localStorage.setItem("userId", user.id + "");
      dispatch(setUser(user));
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
              element={
                !!user ? <Main user={user} /> : <Navigate to={"/login"} />
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </div>
  );
};

export default App;
