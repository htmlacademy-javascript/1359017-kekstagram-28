import { createMockPhotos } from './data.js';
import { showBigPicture } from './make-bigpicture.js';


const picture = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPictures = createMockPhotos();

const similarPicturesFragment = document.createDocumentFragment();


similarPictures.forEach (({url, comments, likes,description})=> {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__img').alt = description;

  similarPicturesFragment.append(pictureElement);

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(url,likes, comments,description);
  });
  return pictureElement;
});

picture.append(similarPicturesFragment);
