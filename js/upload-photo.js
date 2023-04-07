import { isEscapeKey } from './util.js';
import { resetValueScale} from './scale.js';
import { pristine } from './validation-form.js';

const FORMATS = ['jpg', 'jpeg', 'png'];

const bodyElement = document.querySelector('body');
const imgUploadElement = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const cancelButtonElement = document.querySelector('#upload-cancel');
const imgPreviewElement = document.querySelector('.img-upload__preview');
const EffectsPreviewElement = document.querySelectorAll('.effects__preview');
const formElement = document.querySelector('.img-upload__form');
const sliderEffectValueElement = document.querySelector('.img-upload__effect-level');
const EffectRadioElement = document.querySelector('.effects__radio');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const refreshUploadPopup = () => {
  imgPreviewElement.children[0].style.transform = 'scale(1.0)';
  imgPreviewElement.children[0].className = '';
  imgPreviewElement.children[0].style.removeProperty('filter');
  EffectRadioElement.value = 'none';
  sliderEffectValueElement.classList.add('hidden');
  EffectRadioElement.checked = true;
  hashtagFieldElement.value = '';
  commentFieldElement.value = '';
};

const displayImage = (image) => {
  const img = URL.createObjectURL(image);
  imgPreviewElement.children[0].src = img;
  EffectsPreviewElement.forEach((child) => {
    child.style.backgroundImage = `url(${img})`;
  });
};

imgUploadElement.addEventListener('change',() => {
  openUploadModal();
  const file = imgUploadElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FORMATS.some((it) => fileName.endsWith(it));
  if (matches) {
    displayImage(file);
  }
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
    pristine.reset();

  }
};
function closeUploadModal() {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  formElement.reset();
  pristine.reset();
  window.removeEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.removeEventListener('click', closeUploadModal);

}
function openUploadModal() {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  resetValueScale();
  pristine.reset();
  window.addEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.addEventListener('click', closeUploadModal);
  refreshUploadPopup();
}

export {closeUploadModal};
