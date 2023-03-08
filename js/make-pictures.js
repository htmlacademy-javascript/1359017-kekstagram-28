import { createMockPhotos } from './data.js';
import {MAX_ARRAY_LENGHT} from './const.js';
const picture = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPictures = createMockPhotos(MAX_ARRAY_LENGHT);

const similarPicturesFragment = document.createDocumentFragment();


similarPictures.forEach (({url, comments, likes})=> {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  similarPicturesFragment.appendChild(pictureElement);
});

picture.appendChild(similarPicturesFragment);

