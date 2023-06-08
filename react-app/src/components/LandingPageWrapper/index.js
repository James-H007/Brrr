import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Feed from "../Feed/index";
import LandingPage from "../LandingPage/index";

function Home() {
  const user = useSelector((state) => state.session.user);

  if (user) {
    // User is already logged in, render the Feed component
    return (
      <div>
        <Feed />
      </div>
    );
  } else {
    // User is not logged in, render the LandingPage component
    return (
      <div>
        <LandingPage />
      </div>
    );
  }
}

export default Home;
