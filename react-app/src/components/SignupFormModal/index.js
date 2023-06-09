import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [first_name, setFirst] = useState("");
  const [last_name, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile_pic_url, setProfile_pic_url] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(
          first_name,
          last_name,
          username,
          email,
          password,
          profile_pic_url,
        )
      );
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <>
      <div className="sign_up_modal">
        <form className="sign_up_modal_form" onSubmit={handleSubmit}>
          <ul className="sign_up_errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className="sign_up_input">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="sign_up_input">
            First Name
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirst(e.target.value)}
              required
            />
          </label>
          <label className="sign_up_input">
            Last Name
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLast(e.target.value)}
              required
            />
          </label>
          <label className="sign_up_input">
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="sign_up_input">
            Profile Picture
            <input
              type="text"
              value={profile_pic_url}
              onChange={(e) => setProfile_pic_url(e.target.value)}
              required
            />
          </label>
          <label className="sign_up_input">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="sign_up_input">
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button className="submit_button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
