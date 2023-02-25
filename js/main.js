//рандомное значение
const getRandom = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//массив фото
const ID = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,21,22,23,24,25];
const URL = ['photos/1.jpg','photos/2.jpg','photos/3.jpg','photos/4.jpg','photos/5.jpg','photos/6.jpg','photos/7.jpg','photos/8.jpg','photos/9.jpg','photos/10.jpg','photos/11.jpg','photos/12.jpg',
  'photos/13.jpg','photos/14.jpg','photos/15.jpg','photos/16.jpg','photos/17.jpg','photos/18.jpg','photos/19.jpg','photos/20.jpg','photos/21.jpg','photos/22.jpg',
  'photos/23.jpg','photos/24.jpg','photos/25.jpg'];
//Массив имен
const usersNames = ['Дмитрий','Воланд','Рафаэль', 'Евпатий', 'Ярик', 'Хуан'];
//массив описания  фото
const descriptionPhoto = ['Прекрасный летний день', 'Бодрое утро', 'Морозно', 'Долгожданный отпуск', 'Рабочий день','Я устал'];
//аватар
const avatarUsers = ['img/avatar-1.svg','img/avatar-2.svg','img/avatar-3.svg','img/avatar-4.svg','img/avatar-5.svg','img/avatar-6.svg',];
//сообщение
const messageUsers = ['Всё отлично!','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',];
//добавляем метод для генерации массива
const getRandomArrayElement = (elements) => elements [getRandom(0, elements.length - 1)];
function*generateId(){
  let id = 1;
  while(true){
    yield id;
    id++;
  }
}
const commentsID = generateId();


const createComments = () => ({
  name: getRandomArrayElement(usersNames),
  avatar: getRandomArrayElement(avatarUsers),
  message:getRandomArrayElement(messageUsers),
  id: commentsID.next().value,
});
createComments();
const createPhoto = () => ({
  id: getRandomArrayElement(ID),
  url: getRandomArrayElement(URL),
  desсription: getRandomArrayElement(descriptionPhoto),
  comments: Array.from({
    length:getRandom(1, 6)
  },createComments),
});
const photos = Array.from({length: 25},createPhoto);
console.log(createPhoto());
console.log(createComments());
console.log(photos);
