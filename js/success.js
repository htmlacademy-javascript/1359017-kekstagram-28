import { isEscapeKey } from './util.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const removeErrorMessage = () => {
  document.removeEventListener('keydown', onErrorMessageKeydown);
  document.querySelector('.error').removeEventListener('click', onErrorMessageClick);

  document.querySelector('.error').remove();
};

const removeSuccessMessage = () => {
  document.removeEventListener('keydown', onSuccessMessageKeydown);
  document.querySelector('.success').removeEventListener('click', onSuccessMessageClick);

  document.querySelector('.success').remove();
};

function onErrorMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    removeErrorMessage();
  }
}

function onSuccessMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeSuccessMessage();
  }
}

function onErrorMessageClick(evt) {
  evt.preventDefault();
  if (evt.target.matches('.error') || evt.target.closest('.error__button')) {
    removeErrorMessage();
  }
}

function onSuccessMessageClick(evt) {
  evt.preventDefault();
  if (evt.target.matches('.success') || evt.target.closest('.success__button')) {
    removeSuccessMessage();
  }
}

const renderMessage = (element) => document.body.append(element);

const createErrorLoadMessage = (message) => {
  const div = document.createElement('div');
  div.classList.add('error-message');
  div.textContent = message;
  renderMessage(div);
};

const createError = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  renderMessage(errorMessage);

  document.addEventListener('keydown', onErrorMessageKeydown);
  document.querySelector('.error').addEventListener('click', onErrorMessageClick);
};

const createSuccess = () => {
  const successMessage = successTemplate.cloneNode(true);
  renderMessage(successMessage);

  document.addEventListener('keydown', onSuccessMessageKeydown);
  document.querySelector('.success').addEventListener('click', onSuccessMessageClick);
};
export {createSuccess,createError,createErrorLoadMessage};
