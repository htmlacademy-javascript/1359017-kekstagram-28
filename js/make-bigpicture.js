import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const socialComments = document.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');
const likesCountElement = document.querySelector('.likes-count');
const socialCaptionElement = document.querySelector('.social__caption');
const commentsCountElement = document.querySelector('.comments-count');
const commentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');

const createComment = (comment) => {
  comment.forEach (({avatar, name, message}) =>{
    const commentClone = commentElement.cloneNode(true);
    commentClone.querySelector('.social__picture').src = avatar;
    commentClone.querySelector('.social__picture').alt = name;
    commentClone.querySelector('.social__text').textContent = message;
    socialComments.append(commentClone);
  });
};

const showBigPicture = (url, likes, comments, description) => {
  openBigPhoto();
  bigPictureElement.querySelector('img').src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  socialCaptionElement.textContent = description;
  socialComments.innerHTML = '';
  createComment(comments);

};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

function openBigPhoto() {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  // Temporary
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
}

function closeBigPhoto() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  // Temporary
  commentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');
}

bigPictureCancel.addEventListener('click', () =>
  closeBigPhoto()
);

export { showBigPicture };
