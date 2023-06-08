import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import * as sessionActions from "../../store/session";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleDemo = async (e) => {
    e.preventDefault();
    let demoEmail = "demo@aa.io";
    let demoPass = "password";
    const data = await dispatch(login(demoEmail, demoPass));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="login_modal">
        <h1 className="login_h1">Log In</h1>
        <form className="login_modal_form" onSubmit={handleSubmit}>
          <ul className="login_errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className="login_input">
            Email
            <input
              className="login_input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="submit_button" type="submit">
            Log In
          </button>
          <button className="demoLoginButton" onClick={handleDemo}>
            Demo Login
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
