import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function LandingPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

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

  //   useEffect(() => {
  //     // Check if the user is logged in and on the "/" route
  //     if (user && history.location.pathname === "/") {
  //       history.push("/feed");
  //     }
  //   }, [user, history]);

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

export default LandingPage;
