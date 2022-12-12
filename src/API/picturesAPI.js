import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API = '30756171-35a1e9813d8b92c3e50636358';

export const fetchPictures = (page, q) => {
  return axios({
    params: {
      q,
      page,
      key: API,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
};
