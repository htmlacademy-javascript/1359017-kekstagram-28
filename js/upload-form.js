import { isEscapeKey } from './util.js';

const HASHTAG_REGEX = /#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;

const uploadForm = document.querySelector('.img-upload__form');

const hashtagFieldElement = uploadForm.querySelector('.text__hashtags');
const commentFiledElement = uploadForm.querySelector('.text__description');

// .img-upload__field-wrapper
const hashtagPristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  // successClass: 'form__item--valid',
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
hashtagPristine.addValidator(
  hashtagFieldElement,
  validateHashtag,
  'Ошибка! не верно введен хештег'
);

// Валидатор на количество хештегов
hashtagPristine.addValidator(
  hashtagFieldElement,
  validateHashtagCount,
  'Ошибка! максимальное количество хештегов: 5'
);

// Валидатор на одинаковые хештеги
hashtagPristine.addValidator(
  hashtagFieldElement,
  validateSimilarHashtags,
  'Ошибка! Одинаковые хештеги!'
);

uploadForm.addEventListener('submit', () => {
  // evt.preventDefault();
  hashtagPristine.validate();

});

// При первичном нажатии ESC убирает фокус с элемента, при повторном (без фокуса) работает как обычно
hashtagFieldElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});

commentFiledElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});

