import { fetchPictures } from '../API/picturesAPI';
import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from '../components/Loader/Loader';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { Button } from '../components/Button/Button';
import { Modal } from '../components/Modal/Modal';
import { AppS } from './App.styled';
import Notiflix from 'notiflix';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPicture, setCurrentPicture] = useState(null);

  useEffect(() => {
    if (page !== 1 || q !== '') {
      setLoading(true);
      fetchPictures(page, q)
        .then(response => {
          if (response.data.hits.length === 0) {
            Notiflix.Notify.init({ width: '550px' });
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }
          if (page === 1) {
            Notiflix.Notify.init({ width: '550px' });
            Notiflix.Notify.success(
              `Hooray! We found ${response.data.totalHits} images!`
            );
          }
          const pictures = response.data.hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => {
              return { id, tags, webformatURL, largeImageURL };
            }
          );
          setPictures(prevPictures => [...prevPictures, ...pictures]);
          setError('');
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => setLoading(false));
    }
  }, [page, q, error]);

  const formSubmit = q => {
    if (q === '') {
      Notiflix.Notify.init({ width: '550px' });
      Notiflix.Notify.info('Please enter your search term.');
      return;
    }
    setQ(q);
    setPage(1);
    setPictures([]);
    setError('');
    setLoading(false);
    setCurrentPicture(null);
  };

  const picturesLoading = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = data => {
    setCurrentPicture(data);
  };

  const closeModal = () => {
    setCurrentPicture(null);
  };

  return (
    <AppS>
      <Searchbar onSubmit={formSubmit} />
      {pictures.length > 0 && (
        <ImageGallery pictures={pictures} openModal={openModal} />
      )}
      {loading && <Loader />}
      {pictures.length > 0 && pictures.length % 12 === 0 && !loading && (
        <Button clickHandler={picturesLoading} />
      )}
      {currentPicture && (
        <Modal currentPicture={currentPicture} closeModal={closeModal} />
      )}
    </AppS>
  );
};
