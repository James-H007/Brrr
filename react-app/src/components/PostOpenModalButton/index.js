import React from 'react';
import { useModal } from '../../context/Modal';

function PostOpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  iconType, // Icon for the post type
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (

    <div className='post-type-box'>
      <button onClick={onClick} className='post-type-button'>
        <img src={iconType} alt="post-icon" className='post-type-icon' />
      </button>
      <p className='post-type-text'>{buttonText}</p>
    </div>

  );
}

export default PostOpenModalButton;
