import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { login } from "../../store/session";
import SignupFormModal from "../SignupFormModal";
// import OpenModalButton from "../OpenModalButton";
import brrWP1 from "../../assets/brrWP1.jpg";
import brrWP2 from "../../assets/brrWP2.jpg";
import brrWP3 from "../../assets/brrWP3.jpg";
import brrWP4 from "../../assets/brrWP4.jpg";
import brrWP5 from "../../assets/brrWP5.jpg";
import brrWP6 from "../../assets/brrWP6.jpg";
import brrWP7 from "../../assets/brrWP7.jpg";
import brrWP8 from "../../assets/brrWP8.jpg";
import brrWP9 from "../../assets/brrWP9.jpg";
import brrWP10 from "../../assets/brrWP10.jpg";
import brrWP11 from "../../assets/brrWP11.jpg";
import brrWP12 from "../../assets/brrWP12.jpg";
import brrWP13 from "../../assets/brrWP13.jpg";
import brrWP14 from "../../assets/brrWP14.jpg";
import brrWP15 from "../../assets/brrWP15.jpg";
import brrWP16 from "../../assets/brrWP14.jpg";
import "./landingPage.css";

function LandingPage() {
  const dispatch = useDispatch();
  const { closeModal, openModal } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  // const [showMenu, setShowMenu] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const backgroundImages = [
      brrWP1,
      brrWP2,
      brrWP3,
      brrWP4,
      brrWP5,
      brrWP6,
      brrWP7,
      brrWP8,
      brrWP9,
      brrWP10,
      brrWP11,
      brrWP12,
      brrWP13,
      brrWP14,
      brrWP15,
      brrWP16,
    ];

    const randomImage = Math.floor(Math.random() * backgroundImages.length);
    const theRandomImage = backgroundImages[randomImage];

    setBackgroundImage(theRandomImage);
  }, []);

  const handleDemo = async (e) => {
    e.preventDefault();
    const demoEmail = "demo@aa.io";
    const demoPass = "password";
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

  // const closeMenu = () => setShowMenu(false);

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  const handleSignUpClick = () => {
    openModal(<SignupFormModal />);
  };

  return (
    <>
      <div
        className="landing-page"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="move-it-down">
          <div className="login_modal">
            <h1 className="login_h1">Brrr</h1>

            <form className="login_modal_form" onSubmit={handleSubmit}>
              <ul className="login_errors">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <label className="login_input">
                <input
                  className="login_input"
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                <input
                  type="password"
                  placeholder="Password"
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
              <label className="login_h2">
                New To Brrr?{" "}
                <span className="signup_clickable" onClick={handleSignUpClick}>
                  Sign Up!
                </span>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
