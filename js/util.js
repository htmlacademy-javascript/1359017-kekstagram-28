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

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandom, getRandomArrayElement, getId, isEscapeKey};
