import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// iziToast.error({
//   message: 'Oops! Something went wrong! Try reloading the page!',
//   position: 'topRight',
// });
const loader = document.querySelector('.loader');
const select = document.querySelector('.breed-select');
const catInfoBox = document.querySelector('.cat-info');

let isLoading = true;

select.classList.add('is-hidden');
catInfoBox.classList.add('is-hidden');
loader.classList.remove('is-hidden');

const newSelect = fetchBreeds().then(dataFromApi => {
  // Використовуйте dataFromApi для ініціалізації SlimSelect або інших завдань
  new SlimSelect({
    select: '#single',
    data: dataFromApi.map(breed => ({ text: breed.name, value: breed.id })),
  });
  loader.classList.add('is-hidden');
  select.classList.remove('is-hidden');
});

select.addEventListener('change', onChange);

function onChange(event) {
  event.preventDefault();
  catInfoBox.innerHTML = '';

  const { value } = event.currentTarget;
  const infoAboutBreed = fetchCatByBreed(value).then(data => {
    console.log(data[0].breeds);
    catInfoBox.insertAdjacentHTML('beforeend', createBreedCard(data));
    catInfoBox.classList.remove('is-hidden');
  });
}

function createBreedCard(data) {
  const { url } = data[0];
  const { description, name, temperament } = data[0].breeds[0];
  const markup = `<img src="${url}" alt="${name} cat" width="400" loading="lazy"/><div class="breed-text-info"><h1>${name}</h1><p class="description">${description}</p><p><strong>Temperament:</strong> ${temperament}</p></div>`;
  return markup;
}
