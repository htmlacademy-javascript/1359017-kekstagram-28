import { isEscapeKey } from './util.js';

const FILE_FORMATS = ['jpg', 'jpeg', 'png'];
const bodyElement = document.querySelector('body');
const imgInputElement = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const imgPreviewElement = document.querySelector('.img-upload__preview');
const smallImgsPreviewElement = document.querySelectorAll('.effects__preview');

const displayImage = (image) => {
  const img = URL.createObjectURL(image);
  imgPreviewElement.children[0].src = img;
  smallImgsPreviewElement.forEach((child) => {
    child.style.backgroundImage = `url(${img})`;
  });
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

function openUploadModal() {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadModal() {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}
cancelButton.addEventListener('click', () =>
  closeUploadModal()
);
export {onDocumentKeydown, closeUploadModal};
