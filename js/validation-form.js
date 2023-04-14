import { isEscapeKey } from './util.js';
import { sendData } from './api.js';
import {createSuccess, createError} from './success.js';
import { onCloseUploadModal} from './upload-photo.js';
import { changeSizePhoto} from './scale.js';

const HASHTAG_REGEX = /^#[a-zа-яë0-9]{1,19}$/i;
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
const validateHashtagCheck = (value) => {
  const hashTages = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hashTages.every((tag) => HASHTAG_REGEX.test(tag));
};

pristine.addValidator(
  hashtagFieldElement,
  validateHashtagCheck,
  'Ошибка! не верно введен хештег'
);
//Проверка хэштегов на количество
const validateHashtagCount = (value) => {
  const hashTages = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hashTages.length <= MAX_HASHTAG_COUNT;
};

pristine.addValidator(
  hashtagFieldElement,
  validateHashtagCount,
  'Максимальное количество хэштэгов 5'
);
// проверка на уникальность
const validateSimilarHashtags = (value) => {
  const hashTages = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  const lowerCaseTags = hashTages.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagFieldElement,
  validateSimilarHashtags,
  'Хештеги не должны повторяться'
);

// проверка пробела
const validateHashtagSpaces = (value) => {
  const hashTages = value
    .trim()
    .split (' ');
  return !hashTages.every((hashtag) =>
    hashtag.includes('#',1)) ;
};

pristine. addValidator(
  hashtagFieldElement,
  validateHashtagSpaces,
  'Хэштэги должны разделяться пробелами'
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
