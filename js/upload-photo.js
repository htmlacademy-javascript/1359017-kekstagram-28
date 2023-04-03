import { isEscapeKey } from './util.js';
import { resetValueScale} from './scale.js';

const FILE_FORMATS = ['jpg', 'jpeg', 'png'];
const bodyElement = document.querySelector('body');
const imgInputElement = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const imgPreviewElement = document.querySelector('.img-upload__preview');
const smallImgsPreviewElement = document.querySelectorAll('.effects__preview');
const formElement = document.querySelector('.img-upload__form');
const sliderEffectValueElement = document.querySelector('.img-upload__effect-level');
const firstRadioElement = document.querySelector('.effects__radio');

const displayImage = (image) => {
  const img = URL.createObjectURL(image);
  imgPreviewElement.children[0].src = img;
  smallImgsPreviewElement.forEach((child) => {
    child.style.backgroundImage = `url(${img})`;
  });
};
const refreshUploadPopup = () => {
  imgPreviewElement.children[0].style.transform = 'scale(1.0)';
  imgPreviewElement.children[0].className = '';
  imgPreviewElement.children[0].style.removeProperty('filter');
  firstRadioElement.value = 'none';
  sliderEffectValueElement.classList.add('hidden');
  firstRadioElement.checked = true;
};
imgInputElement.addEventListener('change',() => {
  openUploadModal();
  const file = imgInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_FORMATS.some((it) => fileName.endsWith(it));
  if (matches) {
    displayImage(file);
  }
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }

};
function closeUploadModal() {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  formElement.reset();
  window.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', closeUploadModal);
  //resetValueScale();
  //refreshUploadPopup();
}
function openUploadModal() {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  resetValueScale();
  window.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', closeUploadModal);
  refreshUploadPopup();
}


export { closeUploadModal};
