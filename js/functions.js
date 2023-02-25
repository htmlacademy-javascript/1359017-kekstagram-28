//Функция для проверки длины строки.

const checkString = (string, length) => string.length <= length;

checkString('проверяемая строка', 20);


function isPalindrom(str) {
  return str === str.split('').reverse().join('');
}
isPalindrom('довод');//вернет верное значение, если ('кекс')-вернет ложное знвчение


function palindrom2(str){
  const pal = Math.floor(str.length / 2);
  for (let i = 0; i < pal; i++) {
    if(str[i] !== str[str.length - i - 1]) {
      return false;
    }
  }
  return true;
}
palindrom2 ('101');


const extractNumber = (string) => {
  if (typeof string === 'number'){
    return string;
  }
  let result = '';
  for (let i = 0; i < string.length; i++){
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt(result, 10);
};
extractNumber('2023 год');

const myPadStart = (string, minLength, pad) => {
  const actualPad = minLength - string.length;
  if (actualPad <= 0) {
    return string;
  }
  return pad.slice(0, actualPad % pad.length) +
  pad.repeat(actualPad / pad.length) + string;
};
myPadStart('qwerty', 4, '0');
