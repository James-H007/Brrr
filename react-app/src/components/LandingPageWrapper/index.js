import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Feed from "../Feed/index";
import LandingPage from "../LandingPage/index";

function Home() {
  const currentUser = useSelector((state) => state.session.user);

  if (currentUser) {
    return (
      <div>
        <Feed />
      </div>
    );
  } else {
    return (
      <div>
        <LandingPage />
      </div>
    );
  }
}

export default Home;
