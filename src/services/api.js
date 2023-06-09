import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '35820643-67a85c9b62a94d84d9d0abe4a';

const getImages = (searchQuery, page, perPage) => {
  return axios
    .get(
      `${URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&per_page=${perPage}`
    )
    .then(response => response.data);
};

export default getImages;
