/* global $ */
import DOM from './DOM';

function showScreen(selector) {
  $(`${DOM.screens}.active`).removeClass('active').addClass('hide');
  $(selector).removeClass('hide').addClass('active');
}

export default {
  goTo(screen) {
    showScreen(screen);
  },
};
