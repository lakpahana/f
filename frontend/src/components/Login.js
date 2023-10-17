import React, { useState } from "react";
import "./Login.css";

import { login } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3001/api/v1/users/login", {
      email: email,
      password: password,
    }).then((response) => {

      dispatch(
        login(response.data)
      );
      console.log(response);
      window.location.href = "/";
    }
    ).catch((error) => {
      console.log(error);
    });


    setEmail("");
    setPassword("");

    // redirect to the logout page
    window.location = "/pets";
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Login here 🚪</h1>

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

export default Login;
