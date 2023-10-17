import React, { useState } from "react";
import "./Login.css";

import { login } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:3001/api/v1/admin/login", {
      email: email,
      password: password,
    });

    console.log(response);


    dispatch(
      login(response.data)
    );

    setEmail("");
    setPassword("");

    // redirect to the logout page
    window.location = "/logout";
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Login Admin here 🚪</h1>

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submit__btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Admin;
