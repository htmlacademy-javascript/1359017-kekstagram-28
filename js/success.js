import { isEscapeKey } from './util.js';

const errorElement = document.querySelector('#error').content;
const successElement = document.querySelector('#success').content;
let errorClone;
let successClone;
const removeErrorMessage = () => {
  errorClone.remove();
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  errorClone = '';
};

const onRemoveOutError = (evt) => {
  evt.preventDefault();
  removeErrorMessage();
};
const createError = () => {
  errorClone = errorElement.querySelector('section').cloneNode(true);
  document.body.insertAdjacentElement('beforeend', errorClone);
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  errorClone.querySelector('.error__button').addEventListener('click', onRemoveOutError);
};
const removeSuccessMessage = () => {
  successClone.remove();
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
};

const onRemoveOutSuccess = (evt) => {
  evt.preventDefault();
  removeSuccessMessage();

};
const createSuccess = () => {
  successClone = successElement.querySelector('section').cloneNode(true);
  document.body.insertAdjacentElement('beforeend', successClone);
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  successClone.querySelector('.success__button').addEventListener('click',onRemoveOutSuccess);
};


function onDocumentEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (errorClone) {
      removeErrorMessage();
      evt.stopPropagation();
      return;
    }
    removeSuccessMessage();
  }
}

export{createSuccess, createError,};


