import { showAlert} from './util.js';
const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Routes = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Methods = {
  GET: 'GET',
  POST: 'POST',
};

const getData = (onSuccess) => {
  fetch(`${BASE_URL}${Routes.GET_DATA}`)
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      showAlert(`Ошибка! Код:${response.status}`);
    }
    )
    .then((photos) => {
      onSuccess(photos);
    });
};

const sendData = (onSuccess, onFail, body, finalSubmit) => {
  fetch(`${BASE_URL}${Routes.SEND_DATA}`,
    {
      method: Methods.POST,
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    })
    .finally(() => {
      finalSubmit();
    });
};


export {getData, sendData};
