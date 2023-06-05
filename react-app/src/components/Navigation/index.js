import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import MagnifyingGlass from "../../assets/magnifying-glass.svg";
import "./Navigation.css";
import Snowflake from "../../assets/snowflake-regular.svg";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const closeMenu = () => setShowMenu(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li className="searchArea">
          <img
            src={MagnifyingGlass}
            alt="magnifying-glass"
            className="searchLogo"
          />
          <form className="searchForm">
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="searchInput"
            ></input>
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div>
          <OpenModalButton
            className="log_in_button"
            buttonText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />
          <OpenModalButton
            className="sign_up_button"
            buttonText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
        </div>
      </>
    );
  }

  return (
    <ul className="navBar">
      <div className="logoSearch">
        <li>
          <NavLink exact to="/">
            <img src={Snowflake} alt="logo" className="logo" />
          </NavLink>
        </li>
        {isLoaded && sessionLinks}
      </div>
      {isLoaded && sessionUser && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
