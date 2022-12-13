import { useEffect } from 'react';
import { Overlay, ModalDiv } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ currentPicture: { src, alt }, closeModal }) => {
  useEffect(() => {
    const closeByEsc = ({ code }) => {
      if (code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModal]);

  const closeByOverlay = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay className="overlay" onClick={closeByOverlay}>
      <ModalDiv className="modal">
        <img src={src} alt={alt} />
      </ModalDiv>
    </Overlay>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  src: PropTypes.string,
  alt: PropTypes.string,
};
