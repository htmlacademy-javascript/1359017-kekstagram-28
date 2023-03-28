const scalControlSmaller = document.querySelector('.scale__control--smaller');
const scalControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const photoElement = document.querySelector('.img-upload__preview img');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const effectList = document.querySelector('.img-upload__effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const levelSlider = document.querySelector('.effect-level__slider');
const levelValue = document.querySelector('.effect-level__value');

const MIN_ZOOM = 25;
const MAX_ZOOM = 100;
let typeEffect = '';
let typeUnit = '';

const filtersSettings = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    css: 'grayscale',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    css: 'sepia',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    css: 'invert',
    unit: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    css: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    css: 'brightness',
  },
};

noUiSlider.create(levelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const changeSizePhoto = () => {
  photoElement.style.transform = `scale(${parseInt(scaleControlValue.value, 10) / 100})`;
};

const smallerValue = () => {
  scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) - 25}%`;
};

const biggerValue = () => {
  scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) + 25}%`;
};

const updateSlider = (min = 0, max = 100, step = 1) => {
  levelSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: max,
  });
};

const updateFilter = (filter) => {
  typeEffect = filtersSettings?.[filter]?.css ?? '';
  typeUnit = filtersSettings?.[filter]?.unit ?? '';
  photoElement.className = '';

  if (filter !== 'none') {
    sliderContainer.classList.remove('hidden');
    photoElement.classList.add(`effects__preview--${filter}`);
  } else {
    sliderContainer.classList.add('hidden');
    photoElement.style.filter = null;

  }
};

function onScalControlSmallerClick(evt) {
  evt.preventDefault();

  if (parseInt(scaleControlValue.value, 10) > MIN_ZOOM) {
    smallerValue();
    changeSizePhoto();
  }
}

function onScalControlBiggerClick(evt) {
  evt.preventDefault();

  if (parseInt(scaleControlValue.value, 10) < MAX_ZOOM) {
    biggerValue();
    changeSizePhoto();

  }
}

function onFilterChange(evt) {
  if (evt.target.closest('.effects__radio')) {
    const filter = evt.target.value;
    updateFilter(filter);
    updateSlider(filtersSettings?.[filter]?.min, filtersSettings?.[filter]?.max, filtersSettings?.[filter]?.step);
  }
}

function onLevelSliderUpdate() {
  const valueCurrent = levelSlider.noUiSlider.get();
  levelValue.value = valueCurrent;
  photoElement.style.filter = `${typeEffect}(${valueCurrent + typeUnit})`;
}

levelSlider.noUiSlider.on('update', onLevelSliderUpdate);

const resetPhotoStyles = () => {
  scaleControlValue.value = '100%';
  photoElement.className = '';
  photoElement.style = null;
  sliderContainer.classList.add('hidden');
  effectList.querySelector('#effect-none').checked = true;
  hashtagFieldElement.value = '';
  commentFieldElement.value = '';
  typeEffect = '';
  typeUnit = '';


};

const createFilterPhoto = () => {
  scalControlSmaller.addEventListener('click', onScalControlSmallerClick);
  scalControlBigger.addEventListener('click', onScalControlBiggerClick);
  effectList.addEventListener('change', onFilterChange);
};

const disableСreationFilterPhoto = () => {
  scalControlSmaller.removeEventListener('click', onScalControlSmallerClick);
  scalControlBigger.removeEventListener('click', onScalControlBiggerClick);
  effectList.removeEventListener('change', onFilterChange);
};
disableСreationFilterPhoto();
createFilterPhoto();
resetPhotoStyles();
export {disableСreationFilterPhoto, createFilterPhoto, resetPhotoStyles,changeSizePhoto} ;

