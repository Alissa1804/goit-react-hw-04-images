import { Component } from 'react';
import { Overlay, ModalDiv } from './Modal.styled';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }

  closeByEsc = ({ code }) => {
    if (code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeByOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  };

  render() {
    const {
      currentPicture: { src, alt },
    } = this.props;
    return (
      <Overlay className="overlay" onClick={this.closeByOverlay}>
        <ModalDiv className="modal">
          <img src={src} alt={alt} />
        </ModalDiv>
      </Overlay>
    );
  }
}

export default Modal;
