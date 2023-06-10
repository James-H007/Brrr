import React from 'react';
import { useModal } from '../../context/Modal';

function PostOpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  iconType, // Icon for the post type
  smallerIcon //Checks if it's a smaller icon
}) {
  const { setModalContent, setOnModalClose } = useModal();
  let iconClass;
  let postTypeClass;
  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  if (smallerIcon) {
    postTypeClass = 'post-type-box-small'
    iconClass = 'post-icon-small'
  }
  else {
    postTypeClass = 'post-type-box'
    iconClass = 'post-type-icon'
  }

  return (

    <div className={postTypeClass}>
      <button onClick={onClick} className='post-type-button'>
        <img src={iconType} alt="post-icon" className={iconClass} />
      </button>
      <p className='post-type-text'>{buttonText}</p>
    </div>

  );
}

export default PostOpenModalButton;
