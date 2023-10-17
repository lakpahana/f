import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateProduct from "./components/saveproduct";
import GetAll from "./components/showallproducts";
import AdminView from "./components/AdminView";
import "./App.css";
import Admin from "./components/AdminLogin";
import { selectUser } from "./slices/userSlice";
import { useSelector } from "react-redux";
import Logout from "./components/Logout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
const App = () => {
    const user = useSelector(selectUser);
    console.log(user);

    const userType = user?.userType;

    const isLoggedInAndAdmin = user && userType === "admin";

    return (

        <div className="app">

            <Container>

                <Router>
                    <Routes>

                        <Route path="/" element={
                            user ? <GetAll /> :
                                <Login />
                        } />
                        <Route path="/logout" element={
                            //only show the logout component if the user is logged in
                            user ? <Logout /> : <Login />
                        } />
                        <Route path="/register" element={
                            //only show the logout component if the user is logged in
                            user ? <Logout /> : <Register />
                        } />
                        <Route path="/admin" element={
                            isLoggedInAndAdmin ? <AdminView /> : <Admin />
                        } />

                        <Route path="/dashboard" element={
                            isLoggedInAndAdmin ? <AdminView /> : <Admin />
                        } />
                        <Route path="/addpet" element={
                            //only show the logout component if the user is logged in
                            user ? <CreateProduct /> : <Login />
                        } />

                        <Route path="/addpet/:id" element={
                            //only show the logout component if the user is logged in
                            user ? <CreateProduct /> : <Login />
                        } />

                        <Route path="/pets" element={
                            //only show the logout component if the user is logged in
                            user ? <GetAll /> : <Login />
                        } />




                    </Routes>
                </Router>
            </Container>
        </div>

    );
};

export default App;
