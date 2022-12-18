import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calculator from './modules/calculator';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 50000);


  tabs();
  modal('[data-modal]', '.modal', modalTimer);
  timer();
  cards();
  calculator();
  forms(modalTimer);
  slider();
});