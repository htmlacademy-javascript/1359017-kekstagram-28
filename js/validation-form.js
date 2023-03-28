import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import {createSuccess, createError} from './success.js';
import { hideModal} from './upload-photo.js';
import {resetPhotoStyles, changeSizePhoto} from './scale.js';
const bodyElement = document.querySelector('body');


const HASHTAG_REGEX = /#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;

const uploadForm = document.querySelector('.img-upload__form');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const submitButtonElement = uploadForm.querySelector('#upload-submit');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__hashtags-error',
});

const validateHashtag = (text) => HASHTAG_REGEX.test(text) || text === '';

const validateHashtagCount = (text) =>
  text
    .split('')
    .filter((tag) => tag === '#')
    .length <= MAX_HASHTAG_COUNT;

const validateSimilarHashtags = (text) => {
  const textArray = text
    .replaceAll(' ','')
    .toLowerCase()
    .split('#');
  textArray.shift();

  const unique = Array.from(new Set(textArray));

  return textArray.length === unique.length;

};

// Валидатор правильности хештега
pristine.addValidator(
  hashtagFieldElement,
  validateHashtag,
  'Ошибка! не верно введен хештег'
);

// Валидатор на количество хештегов
pristine.addValidator(
  hashtagFieldElement,
  validateHashtagCount,
  'Ошибка! максимальное количество хештегов: 5'
);

// Валидатор на одинаковые хештеги
pristine.addValidator(
  hashtagFieldElement,
  validateSimilarHashtags,
  'Ошибка! Одинаковые хештеги!'
);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';

};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';

};

const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          blockSubmitButton();
          createSuccess();
          changeSizePhoto();
          resetPhotoStyles();
          bodyElement.classList.add('modal-open');
          evt.target.reset();

        },
        () => {
          createError();
          unblockSubmitButton();
          bodyElement.classList.add('modal-open');
        },
        new FormData(evt.target),
        unblockSubmitButton
      );
    }

  });
};

// При первичном нажатии ESC убирает фокус с элемента, при повторном (без фокуса) работает как обычно
hashtagFieldElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});

commentFieldElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});

setUserFormSubmit(hideModal);

