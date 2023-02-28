const MIN_ID_NUMBER = 1;
const MAX_ID_NUMBER = 25;
const MAX_AVATAR_NUMBER = 6;
const MIN_LIKE_NUMBER = 15;
const MAX_LIKE_NUMBER = 200;
const MAX_COMMENT_NUMBER = 1000;
const MAX_ARRAY_LENGHT = 25;
//Массив имен
const usersNames = ['Дмитрий','Воланд','Рафаэль', 'Евпатий', 'Ярик', 'Хуан'];
//массив описания  фото
const descriptionPhoto = ['Прекрасный летний день', 'Бодрое утро', 'Морозно', 'Долгожданный отпуск', 'Рабочий день','Я устал'];

//сообщение
const messageUsers = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',];
//рандомное значение
const getRandom = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//добавляем метод для генерации массива для возврата случайного элемента
const getRandomArrayElement = (elements) => elements [getRandom(0, elements.length - 1)];

// получаем случайное неповторяющееся число.
const getId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandom(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandom(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};
const generatePhotoId = getId(MIN_ID_NUMBER, MAX_ID_NUMBER);
const generateId = getId(MIN_ID_NUMBER, MAX_ID_NUMBER);

const createComments = () => ({
  name: getRandomArrayElement(usersNames),
  avatar: `img/avatar-${ getRandom(MIN_ID_NUMBER, MAX_AVATAR_NUMBER) }.svg`,
  message : getRandomArrayElement(messageUsers),
  id: getRandom(MIN_ID_NUMBER, MAX_COMMENT_NUMBER),
});

const createPhoto = () => ({
  id: generateId(),
  url: `photos/${ generatePhotoId() }.jpg`,
  description: getRandomArrayElement(descriptionPhoto),
  likes: getRandom(MIN_LIKE_NUMBER, MAX_LIKE_NUMBER),
  comments: createComments()
});
Array.from({length: MAX_ARRAY_LENGHT},createPhoto);

/*console.log(createPhoto());
console.log(createComments());
*/
