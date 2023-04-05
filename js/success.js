import { isEscapeKey } from './util.js';
import { onDocumentKeydown,closeUploadModal} from './upload-photo.js';
const errorElement = document.querySelector('#error').content;
const successElement = document.querySelector('#success').content;

const createError = () => {
  const errorClone = errorElement.querySelector('section').cloneNode(true);
  document.body.insertAdjacentElement('beforeend', errorClone);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onErrorKeydown);

  const removeErrorMessage = () => {
    errorClone.remove();
    document.removeEventListener('keydown', onErrorKeydown);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  const removeOutError = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      removeErrorMessage();
      document.removeEventListener('click', removeOutError);
    }
  };

  function onErrorKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      errorClone.remove();
      document.removeEventListener('keydown', onErrorKeydown);
      document.addEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', removeOutError);

    }
  }
  errorClone.querySelector('.error__button').addEventListener('click', () => {
    removeErrorMessage();
    document.removeEventListener('click', removeOutError);
  });

  document.addEventListener('click', removeOutError);
};

const createSuccess = () => {
  const successClone = successElement.querySelector('section').cloneNode(true);
  document.body.insertAdjacentElement('beforeend', successClone);

  const removeSuccessMessage = () => {
    closeUploadModal();
    successClone.remove();
    document.removeEventListener('keydown', onSuccessKeydown);
  };

  const removeOutSuccess = (evt) => {
    if (!evt.target.closest('.success__inner')) {
      removeSuccessMessage();
      document.removeEventListener('click', removeOutSuccess);
    }
  };

  function onSuccessKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successClone.remove();
      document.removeEventListener('keydown', onSuccessKeydown);
      document.removeEventListener('click', removeOutSuccess);
    }
  }

  document.addEventListener('keydown',onSuccessKeydown);

  successClone.querySelector('.success__button').addEventListener('click', () => {
    removeSuccessMessage();
    document.removeEventListener('click', removeOutSuccess);
  });

  document.addEventListener('click', removeOutSuccess);
};
export{createSuccess, createError,};

