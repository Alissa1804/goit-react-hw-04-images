import { fetchPictures } from '../API/picturesAPI';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from '../components/Loader/Loader';
import Searchbar from '../components/Searchbar/Searchbar';
import { Button } from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import { AppS } from './App.styled';
import Notiflix from 'notiflix';

class App extends Component {
  state = {
    pictures: [],
    page: 1,
    error: '',
    q: '',
    loading: false,
    currentPicture: null,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page || prevState.q !== this.state.q) {
      this.getPictures();
    }
  }

  getPictures = () => {
    this.setState({ loading: true });
    const { page, q } = this.state;
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
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures],
          error: '',
        }));
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => this.setState({ loading: false }));
  };

  formSubmit = q => {
    if (q === '') {
      Notiflix.Notify.init({ width: '550px' });
      Notiflix.Notify.info('Please enter your search term.');
      return;
    }
    this.setState({
      q,
      page: 1,
      pictures: [],
      error: '',
      loading: false,
      currentPicture: null,
    });
  };

  picturesLoading = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = data => {
    this.setState({ currentPicture: data });
  };

  closeModal = () => {
    this.setState({ currentPicture: null });
  };

  render() {
    const { pictures, loading, currentPicture } = this.state;
    return (
      <AppS>
        <Searchbar onSubmit={this.formSubmit} />
        {pictures.length > 0 && (
          <ImageGallery pictures={pictures} openModal={this.openModal} />
        )}
        {loading && <Loader />}
        {pictures.length > 0 && pictures.length % 12 === 0 && !loading && (
          <Button clickHandler={this.picturesLoading} />
        )}
        {currentPicture && (
          <Modal currentPicture={currentPicture} closeModal={this.closeModal} />
        )}
      </AppS>
    );
  }
}

export default App;
