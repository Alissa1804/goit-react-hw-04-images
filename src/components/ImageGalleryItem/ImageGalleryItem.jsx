import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  picture: { webformatURL, largeImageURL, tags },
  openModal,
}) => {
  return (
    <Item>
      {' '}
      <Image
        src={webformatURL}
        alt={tags}
        onClick={() => openModal({ src: largeImageURL, alt: tags })}
      />
    </Item>
  );
};
