import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_KDjowYAaFCSgvZaRHoH7SlZdcXdU0AmY9ho0T0LOMwznNJeRDQUi51iP6oVW60Xc';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
    if (!response.data) {
      throw new Error();
    }

    return response.data;
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
    });
}
