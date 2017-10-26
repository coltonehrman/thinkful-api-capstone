/* global $ */
import state from '../../modules/state';
import DOM from './DOM';
import Attraction from '../../components/Attraction';

let progressVisible = true;

function toggleProgress() {
  if (progressVisible) {
    progressVisible = false;
    $(DOM.progressBar).hide();
  } else {
    progressVisible = true;
    $(DOM.progressBar).show();
  }
}

function setLogo(text) {
  $(DOM.headerLogo).text(text);
}

function appendAttractions(attractions) {
  const $attractions = $(DOM.attractions);
  attractions.forEach(attraction => (
    $attractions.append(attraction.$element)
  ));
}

function clearCategories() {
  $(DOM.categories).remove();
}

function clearPlaces() {
  $(DOM.placeResults).empty();
}

export default {
  setLogo,
  toggleProgress,
  displayAttractions(attractions) {
    const attractionCategories = attractions.map(attraction => attraction.category);
    const categories = attractionCategories.filter((cat, i) =>
      attractionCategories.indexOf(cat) === i,
    );

    clearCategories();

    categories.forEach(cat => $(DOM.categoryContainer).append(
      `<a class="${DOM.categories.slice(1)} waves-effect btn-flat btn">${cat}</a>`,
    ));

    state.attractions = attractions.map(attraction => new Attraction(attraction)).sort((a, b) => {
      if (typeof a.place.photo !== 'undefined') {
        if (typeof b.place.photo !== 'undefined') {
          return 0;
        }
        return -1;
      }
      return 1;
    });

    appendAttractions(state.attractions);
  },
  displayPlacesByFilter(category) {
    const $placeResults = $(DOM.placeResults);
    const placesToShow = state.places.filter(place =>
      place.place.category === category,
    );

    if ($placeResults.children().length >= 1) {
      $placeResults.empty();
    }

    appendAttractions(placesToShow);
  },
  getMap($place) {
    return state.places.find(place => place.$element.is($place)).map;
  },
  showMap($place) {
    state.places.find(place => place.$element.is($place)).createMap();
  },
  reset() {
    toggleProgress();
    clearCategories();
    clearPlaces();
  },
};
