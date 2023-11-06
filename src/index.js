import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const loader = document.querySelector('.loader');
const select = document.querySelector('.breed-select');
const catInfoBox = document.querySelector('.cat-info');

let isFirstSelect = true;

loader.classList.remove('is-hidden');

select.addEventListener('change', onChange);

const breedsList = fetchBreeds()
  .then(dataFromApi => {
    if (!dataFromApi) {
      select.classList.add('is-hidden');
      loader.classList.add('is-hidden');
      throw new Error();
    }
    const newSelect = new SlimSelect({
      select: '#single',

      data: dataFromApi.map(breed => ({ text: breed.name, value: breed.id })),
    });

    loader.classList.add('is-hidden');
    select.classList.remove('is-hidden');
  })
  .catch(error => console.log(error));

function onChange(event) {
  event.preventDefault();
  loader.classList.remove('is-hidden');
  catInfoBox.innerHTML = '';

  if (!breedsList) {
    select.classList.add('is-hidden');
    return;
  }

  if (isFirstSelect) {
    isFirstSelect = false;
    return;
  }

  const { value } = event.currentTarget;
  fetchCatByBreed(value)
    .then(data => {
      if (!data) {
        loader.classList.add('is-hidden');
        throw new Error();
      }
      catInfoBox.insertAdjacentHTML('beforeend', createBreedCardMarkup(data));
      catInfoBox.classList.remove('is-hidden');
      loader.classList.add('is-hidden');
    })
    .catch(error => console.log(error.message));
}

function createBreedCardMarkup(data) {
  const { url } = data[0];
  const { description, name, temperament } = data[0].breeds[0];

  const markup = `<img src="${url}" alt="${name} cat" width="400" height="auto"/><div class="breed-text-info"><h1>${name}</h1><p class="description">${description}</p><p><strong>Temperament:</strong> ${temperament}</p></div>`;
  return markup;
}
