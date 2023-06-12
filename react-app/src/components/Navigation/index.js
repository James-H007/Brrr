import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import MagnifyingGlass from "../../assets/magnifying-glass.svg";
import "./Navigation.css";
import Snowflake from "../../assets/snowflake-regular.svg";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import { getAllBlogs } from "../../store/blogs";


function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  // Search functionality -----------------------------------------------------------------------------
  const allBlogs = useSelector((state) => state.blogs.blogs) || [];
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);


    if (e.target.value === '') {
      setSearchResults([])
      return

    }

    const results = allBlogs.filter((i) =>
      i.blogTitle.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setSearchResults(results);
  };

  // --------------------------------------------------------------------------------------------------

  const closeMenu = () => setShowMenu(false);

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

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
          {/* ----------------------- SEARCH */}
          <form className="searchForm">
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="searchInput"
              value={searchText}
              onChange={handleSearch}
            ></input>

            {searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.map((i) => (
                  <li className="search-li">
                    <Link
                      to={`/blog/${i.id}`}
                      key={i.id}
                      onClick={() => {
                        setSearchResults([]);
                        setSearchText("");
                      }}
                    >
                      <img src={i.blogAvatarUrl} alt='blog-icon' className="blog-select-icon" />
                      <p className="search-title">{i.blogTitle}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/*  ----------------- SEARCH */}

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
          <NavLink exact to="/feed">
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
