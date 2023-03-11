import { isEscapeKey } from './util.js';
const picture = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

const hiddenBigPhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  bigPicture.removeEventListener('click', onHiddenBigPhoto);
  document.removeEventListener('keydown', onDocumentKeydown);
};
const showBigPhoto = (evt) => {
  evt.preventDefault();

  if (evt.target.matches('.picture__img')) {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    bigPicture.addEventListener('click', onHiddenBigPhoto);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

function onHiddenBigPhoto(evt) {
  if (!evt.target.closest('.big-picture__preview') || evt.target.closest('.big-picture__cancel')) {
    hiddenBigPhoto();
  }
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hiddenBigPhoto();
  }
}

picture.addEventListener('click', showBigPhoto);
