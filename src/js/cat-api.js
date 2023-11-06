import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

axios.defaults.headers.common['x-api-key'] =
  'live_KDjowYAaFCSgvZaRHoH7SlZdcXdU0AmY9ho0T0LOMwznNJeRDQUi51iP6oVW60Xc';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.data) {
        throw new Error();
      }

      return response.data;
    })
    .catch(error => {
      console.log(error);
      iziToast.error({
        message: 'Oops! Something went wrong! Try to reload the page!',
        position: 'topRight',
      });
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (!response.data) {
        throw new Error();
      }
      return response.data;
    })
    .catch(error => {
      console.log(error);
      iziToast.error({
        message: 'Oops! Something went wrong! Try to reload the page!',
        position: 'topRight',
      });
    });
}
