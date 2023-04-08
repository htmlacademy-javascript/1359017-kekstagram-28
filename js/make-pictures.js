import { showBigPicture } from './make-bigpicture.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderSimilarPictures = (similarPictures)=>{
  const similarPicturesFragment = document.createDocumentFragment();
  similarPictures.forEach (({url, comments, likes,description})=> {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(url,likes, comments,description);
    });
    similarPicturesFragment.append(pictureElement);
  });
  pictureContainer.append(similarPicturesFragment);
};
export {renderSimilarPictures};
