import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Feed from "./components/Feed";
import FollowingPage from "./components/FollowingPage";
import "./App.css";
import LikesPage from "./components/LikesPage/LikePage";
import Blog from "./components/Blog";
import Explore from "./components/Explore/Explore";
import CreateBlogPage from "./components/CreateBlogPage";
import MyBlogCollection from "./components/MyBlogCollection";
import EditBlogPage from "./components/EditBlogPage";
import Home from "./components/LandingPageWrapper";
import About from "./components/About";
import { getAllComments } from "./store/comment";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAllComments())
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="entire-application">
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/feed">
              <Feed />
            </Route>
            <Route path="/following">
              <FollowingPage />
            </Route>
            <Route path="/my-likes">
              <LikesPage />
            </Route>
            <Route path="/blog/:blogId/edit">
              <EditBlogPage />
            </Route>
            <Route path="/blog/:id">
              <Blog />
            </Route>
            <Route path="/explore">
              <Explore />
            </Route>
            <Route path="/blogs/create">
              <CreateBlogPage />
            </Route>
            <Route path="/my-blogs">
              <MyBlogCollection />
            </Route>

            <Route path="/">
              <Home />
            </Route>
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
