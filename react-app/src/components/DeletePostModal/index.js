// import "./PostFormModal.css";
import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { deleteMyPost } from "../../store/posts";
import { getCurrentUser } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
// import { editMyPost } from "../../store/posts";
import { useModal } from "../../context/Modal";

import "./DeletePostModal.css"
// import Post from "../Post";

const DeleteFormModal = ({ postType, postData }) => {
    // const history = useHistory();
    const dispatch = useDispatch();
    const [isAuth, setIsAuth] = useState()
    // const [authError, setAuthError] = useState("")
    const [isLoaded, setIsLoaded] = useState("false");
    const { closeModal } = useModal();
    const deleteGif = "https://media.tenor.com/cS9NkvTBKtAAAAAd/pulp-fiction.gif"

    // useEffect(() => {
    //     setTitle(postData.postTitle);
    //     setText(postData.postDescription);
    // }, [postData]);
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        dispatch(getCurrentUser())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        if (currentUser) {
            if (currentUser.id === postData.userId) {
                setIsAuth(true)
            }
        }
    }, [currentUser, postData.userId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(deleteMyPost(postData.id))
        window.location.reload();

    };
    return (
        <>
            {!isLoaded && <p>Loading...</p>}
            {isLoaded && postData && !isAuth && (
                <div className="post-form-container">
                    <p>You're not authorized to be here!</p>
                </div>
            )}
            {isLoaded && postData && isAuth && (
                <div className="post-form-container">
                    <div className="delete-form-container">
                        <h2>Are you sure, you want to delete this post?</h2>

                        <img src={deleteGif} alt="delete-gif" className="delete-image" />
                        <div className="delete-form-buttons">
                            <button onClick={handleSubmit} className="delete-button">Yes, delete it.</button>
                            <button onClick={() => { closeModal() }} className="delete-button">No, nevermind.</button>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};

export default DeleteFormModal;
