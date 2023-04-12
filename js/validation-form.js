/*import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import {createSuccess, createError} from './success.js';
import { onCloseUploadModal} from './upload-photo.js';
import { changeSizePhoto} from './scale.js';

const HASHTAG_REGEX = /#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;
const uploadForm = document.querySelector('.img-upload__form');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('#upload-submit');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__hashtags-error',
});

// проверка написания
const validateHashtagcheck = (value) => {
  const hashTages = value.split(' ');
  return !value.length ? true : hashTages.every((hashtag) =>HASHTAG_REGEX.test(hashtag));
};
pristine.addValidator(
  hashtagFieldElement,
  validateHashtagcheck,
  'Ошибка! не верно введен хештег'
);


// проверка колличества
const validateHashtagCount = (value) => {
  const hashTages = value.split(' ');
  return hashTages.length <= MAX_HASHTAG_COUNT;
};
pristine.addValidator(
  hashtagFieldElement,
  validateHashtagCount,
  `Ошибка! Максимальное количество хештегов  ${MAX_HASHTAG_COUNT} хэш-тегов.`
);
// проверка на уникальность
const validateSimilarHashtags = (value) => {
  const hashTages = value.toLowerCase().split(' ');
  return new Set(hashTages).size === hashTages.length;
};
pristine.addValidator(
  hashtagFieldElement,
  validateSimilarHashtags,
  'Ошибка! Одинаковые хештеги!'
);
// проверка длинны комментариев.
const validateComment = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(
  commentFieldElement,
  validateComment,
  `Максимальная длина комментария ${COMMENT_MAX_LENGTH} символов.Удалите лишнee.`
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
          document.body.classList.add('modal-open');
          evt.target.reset();
        },
        () => {
          createError();
          unblockSubmitButton();
          document.body.classList.add('modal-open');
        },
        new FormData(evt.target),
        unblockSubmitButton
      );
    }
  });
};
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
commentFieldElement.addEventListener('input', validateComment);
setUserFormSubmit(onCloseUploadModal);
export {pristine};*/


import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import {createSuccess, createError} from './success.js';
import { onCloseUploadModal} from './upload-photo.js';
import { changeSizePhoto} from './scale.js';

const HASHTAG_REGEX = /#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_ERROR_MESSAGE = 'Неверно заполнены хэштеги';
const COMMENT_MAX_LENGTH = 140;
const uploadForm = document.querySelector('.img-upload__form');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('#upload-submit');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__hashtags-error',
});

//const validateHashtagCount = (hashtags) =>
//hashtags.length <= MAX_HASHTAG_COUNT;
function validateHashtagCount (value) {
  const hashArray = value.trim().split(' ') ;
  return hashArray. length <= MAX_HASHTAG_COUNT;
}
pristine. addValidator(
  hashtagFieldElement,
  validateHashtagCount,
  'Максимальное количество хэштэгов 5'
);
//Проверка хэштегов на уникальность
const validateSimilarHashtags = (hashtags) => {
  const hashTages = hashtags.map((hashtag) =>
    hashtag.toLowerCase());
  return hashTages.length === new Set(hashTages).size;
};


//Проверка хэштегов на валидность символов
const validateSymbol = (hashtag) => HASHTAG_REGEX.test(hashtag);

const validateHashtagcheck = (value) => {
  const hashtags = value
    .trim()
    .split(' ')
    .filter((hashtag) => hashtag.trim().length);
  return validateHashtagCount(value)
  && validateSimilarHashtags(hashtags)
  && hashtags.every(validateSymbol);
};

pristine.addValidator(
  hashtagFieldElement,
  validateHashtagcheck ,
  HASHTAG_ERROR_MESSAGE,
);


// проверка длинны комментариев.
const validateComment = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(
  commentFieldElement,
  validateComment,
  `Максимальная длина комментария ${COMMENT_MAX_LENGTH} символов.Удалите лишнee.`
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
          document.body.classList.add('modal-open');
          evt.target.reset();
        },
        () => {
          createError();
          unblockSubmitButton();
          document.body.classList.add('modal-open');
        },
        new FormData(evt.target),
        unblockSubmitButton
      );
    }
  });
};
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
commentFieldElement.addEventListener('input', validateComment);
setUserFormSubmit(onCloseUploadModal);
export {pristine};
