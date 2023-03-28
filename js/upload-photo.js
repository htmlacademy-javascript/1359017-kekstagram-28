import { isEscapeKey } from './util.js';


const bodyElement = document.querySelector('body');


const imgInputElement = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');

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

}
cancelButton.addEventListener('click', () =>
  hideModal()
);
export {onDocumentKeydown, hideModal};
