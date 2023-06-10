import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editMyPost } from "../../store/posts";
import {ModalProvider} from "../../context/Modal"

const EditVideoFormModal = ({postType, postData} ) =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [isLoaded, setIsLoaded] = useState("false");
    const user = useSelector(state => state.user.currentUser);


    useEffect(() => {
        setDescription(postData.postDescription);
      }, [postData]);

      const handleSubmit = async (e) => {
        e.preventDefault();

        if (description.length < 1 || description.length > 1200) {
            setDescriptionError("Title should be between 1 and 1200 characters.");
            return;
          }

          const updatedPost = {
            post_description: description
          }

        const editImagePost = await dispatch(editMyPost(postData.id, updatedPost));

        setDescription("")

        if(editImagePost){
            window.location.reload();
        }
      };

      return (
        <>
      {!isLoaded && (
        <p>
          Loading...
        </p>
      )}
      {isLoaded && (user.blogs.length == 0) && (
        <p>
          YOU DON'T HAVE ANY BLOGS! MAKE ONE!
        </p>
      )}
      {isLoaded && (user.blogs.length > 0) && (
        <div className="post-form-container">
          <div className="post-form-content">
            <form className="post-form" onSubmit={handleSubmit}>
              <textarea
                type="textarea"
                className="post-form-input-text"
                placeholder="Maximum file size is 20MB... You can add a description as well"
                name="text"
                value={description}
                onChange ={(e) => setDescription(e.target.value)}
              />
              <div className="close-post-buttons">
                <button className="poster-button" type="submit">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
      )
}
export default EditVideoFormModal
