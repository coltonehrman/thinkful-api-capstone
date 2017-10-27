/* global $ */
import DOM from './DOM';

function clearResults() {
  $(DOM.placeResult).remove();
  $(DOM.noResults).show();
}

export default {
  clearResults,
  focus() {
    $(DOM.placeSearch).focus();
  },
  displayResults(results) {
    const $placeResults = $(DOM.placeResults);
    $(DOM.noResults).hide();
    $(DOM.placeResult).remove();

    results.slice(0, 5).forEach((result) => {
      $placeResults.append(
        `<li class="${DOM.placeResult.slice(1)}" data-place-id="${result.id}">
          ${result.name}
        </li>`,
      );
    });
  },
  clear() {
    $(DOM.placeSearch).val('');
    clearResults();
  },
};
