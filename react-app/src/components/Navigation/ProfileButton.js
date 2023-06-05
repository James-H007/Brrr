import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";
import userIcon from "../../assets/user-solid.svg";
import { Link, Redirect, useHistory } from "react-router-dom";
import heart from "../../assets/heart-regular.svg";
import following from "../../assets/users-between-lines-solid.svg";
import gift from "../../assets/gift-solid.svg";
import explore from "../../assets/wpexplorer.svg";
import plus from "../../assets/plus-solid.svg";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const handleClick = (option) => {
    if (option === "Gifts") {
      alert("Feature coming soon!");
    } else {
      if (option === "Blogs") {
        // Handle the "Blogs" click event
      } else if (option === "Likes") {
        // Handle the "Likes" click event
      } else if (option === "Following") {
        // Handle the "Following" click event
      }
    }
  };

  return (
    <>
      <img
        src={userIcon}
        alt="userIcon"
        className="profile-button"
        onClick={openMenu}
      />
      <ul className={`user-menu ${ulClassName} user-dropdown`} ref={ulRef}>
        {user ? (
          <>
            <div className="logout-container" onClick={handleLogout}>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Log Out
            </div>
            <li
              className="likes-container"
              onClick={() => handleClick("Likes")}
            >
              <span className="heart-icon">
                <img src={heart} alt="heart-icon" />
              </span>
              &nbsp;
              <Link to="/my-likes">Likes</Link>
            </li>

            <li
              className="following-container"
              onClick={() => handleClick("Following")}
            >
              <span className="following-icon">
                <img src={following} alt="following-icon" />
              </span>
              &nbsp;
              <Link to="/following">Following</Link>
            </li>

            <li
              className="explore-blogs-container"
              onClick={() => handleClick("Explore Blogs")}
            >
              <span className="explore-icon">
                <img src={explore} alt="explore-icon" />
              </span>
              &nbsp;
              <Link to="/explore">Explore Blogs</Link>
            </li>

            <li
              className="create-blogs-container"
              onClick={() => handleClick("Create Blogs")}
            >
              <span className="plus-icon">
                <img src={plus} alt="plus-icon" />
              </span>
              <Link to="/api/blogs/create">Create a Blog</Link>
            </li>

            <li className="gift-container" onClick={() => handleClick("Gifts")}>
              <span className="gift-icon">
                <img src={gift} alt="gift-icon" />
              </span>
              &nbsp; Gifts
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
