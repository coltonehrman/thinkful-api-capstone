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

    results.forEach((result) => {
      $placeResults.append(
        `<li class="${DOM.placeResult.slice(1)}" data-place-id="${result.id}">
          ${result.name}
        </li>`,
      );
    });

    $placeResults.show();
  },
  clear() {
    $(DOM.placeSearch).val('');
    clearResults();
  },
};
