import { isEscapeKey } from './util.js';
const COMMENTS_SHOW_DEFAULT = 5;
let shownComments;
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
//Создание коментария
const createComment = (comment) => {
  comment.forEach (({avatar, name, message}) =>{
    const commentClone = commentElement.cloneNode(true);
    commentClone.querySelector('.social__picture').src = avatar;
    commentClone.querySelector('.social__picture').alt = name;
    commentClone.querySelector('.social__text').textContent = message;
    socialComments.append(commentClone);
  });
};
// Показ комментариев
const showComments = (comments) => {
  const showCommentsBy = comments.slice(0, COMMENTS_SHOW_DEFAULT);
  createComment(showCommentsBy);
  commentCountElement.textContent =
  `${showCommentsBy.length} из ${comments.length} комментариев`;
  if (showCommentsBy.length >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};
// Добавление еще комментариев
const createMoreComments = () => {
  const additionalCommentsToShow = shownComments
    .slice(socialComments.children.length, socialComments.children.length + 5);
  createComment(additionalCommentsToShow);
  commentCountElement.textContent =
  `${socialComments.children.length} из ${shownComments.length} комментариев`;
  if (shownComments.length <= socialComments.children.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const showBigPicture = (url, likes, comments, description) => {
  openUserModal();
  bigPictureElement.querySelector('img').src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  socialCaptionElement.textContent = description;
  socialComments.innerHTML = '';
  shownComments = comments;
  commentsLoaderElement.addEventListener('click', createMoreComments);
  showComments(comments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal() {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.removeEventListener('click', createMoreComments);
}
bigPictureCancel.addEventListener('click',()=>
  closeUserModal()
);


export { showBigPicture };

