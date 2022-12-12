import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Imagegallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures, openModal }) => {
  return (
    <Imagegallery>
      {' '}
      {pictures.map(picture => {
        return (
          <ImageGalleryItem
            key={picture.id}
            picture={picture}
            openModal={openModal}
          />
        );
      })}
    </Imagegallery>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};
