import { renderSimilarPictures } from './make-pictures.js';
import { shuffleArray,debounce } from './util.js';
import { getData } from './api.js';
const MAX_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;

const imgFilterElement = document.querySelector('.img-filters');
const filterButtonsElements = document.querySelectorAll('.img-filters__button');

const makeButtonActive = (evt) => {
  filterButtonsElements.forEach((option) => {
    if (evt.target.classList.contains('img-filters__button')) {
      option.classList.remove('img-filters__button--active');
    }
  });
  if (evt.target.classList.contains('img-filters__button')) {
    evt.target.classList.add('img-filters__button--active');
  }

};
const changePhotosByFilter = (posts, evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    document.querySelectorAll('.picture').forEach((pic) => {
      pic.remove();
    });
  }
  let photosList = posts;
  switch (evt.target.id) {
    case 'filter-default':
      renderSimilarPictures(photosList);
      break;
    case 'filter-random':
      photosList = shuffleArray(posts).slice(0, MAX_RANDOM_PHOTOS);
      renderSimilarPictures(photosList);
      break;
    case 'filter-discussed':
      photosList = posts
        .slice()
        .sort((a, b) => {
          if (a.comments.length < b.comments.length) {
            return 1;
          } else {
            return -1;
          }
        });
      renderSimilarPictures(photosList);
      break;
  }

};
/*getData((posts) => {
  renderSimilarPictures(posts);

  imgFilterElement.addEventListener('click', debounce((evt) => changePhotosByFilter(posts, evt), RERENDER_DELAY,));
  imgFilterElement.addEventListener('click', (evt) => makeButtonActive(evt));

});*/
const showFilteredPictures = (posts) => {
  imgFilterElement.addEventListener('click', debounce((evt) => {
    changePhotosByFilter(posts, evt);
  }, RERENDER_DELAY));
};
const onFilterClic = (photos) => {
  imgFilterElement.addEventListener('click', (evt) =>
    makeButtonActive(evt,photos));
};
getData ((photos) => {
  renderSimilarPictures(photos);
  showFilteredPictures(photos);
  onFilterClic(photos);
});
