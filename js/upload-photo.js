import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');

const imgInputElement = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');

const HASHTAG_REGEX = /#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;

const texthashtagElement = uploadForm.querySelector('.text__hashtags');
const textDescriptionElement = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__hashtags-error',
});

imgInputElement.addEventListener('change',() => {
  showModal();

});


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }

};

function showModal() {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

}

function hideModal() {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgInputElement.value = '';
}
cancelButton.addEventListener('click', () =>
  hideModal()
);


const validateHashtag = (text) => HASHTAG_REGEX.test(text) || text === '';


const validateHashtagCount = (tags) =>
  tags
    .split('')
    .filter((tag) => tag === '#')
    .length <= MAX_HASHTAG_COUNT;


const validateUniqHashtags = (tag) => {
  const tagArray = tag
    .replaceAll(' ','')
    .toLowerCase()
    .split('#');
  tagArray.shift();

  const unique = Array.from(new Set(tagArray));

  return tagArray.length === unique.length;

};


// Валидатор правильности хештега
pristine.addValidator(
  texthashtagElement,
  validateHashtag,
  'Ошибка! не верно введен хештег'
);

// Валидатор на количество хештегов
pristine.addValidator(
  texthashtagElement,
  validateHashtagCount,
  'Ошибка! максимальное количество хештегов: 5'
);

// Валидатор на одинаковые хештеги
pristine.addValidator(
  texthashtagElement,
  validateUniqHashtags ,
  'Ошибка! Одинаковые хештеги!'
);

uploadForm.addEventListener('submit', () => {

  pristine.validate();

});
texthashtagElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});

textDescriptionElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});

