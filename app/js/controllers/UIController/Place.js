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
  $(DOM.category).remove();
}

function clearPlaceResults() {
  $(DOM.placeResult).remove();
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

    $(DOM.categories).append(`<li class="${DOM.category.slice(1)} active">All</li>`);

    categories.forEach(cat => $(DOM.categories).append(
      `<li class="${DOM.category.slice(1)}">${cat}</li>`,
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
  displayAttractionsByFilter(category) {
    const $attractions = $(DOM.attraction);
    const attractionsToShow = (category.toLowerCase() === 'all') ?
      state.attractions :
      state.attractions.filter(attraction =>
        attraction.place.category === category,
      );

    $attractions.remove();
    appendAttractions(attractionsToShow);
  },
  getMap($attraction) {
    return state.attractions.find(attraction => attraction.$element.is($attraction)).map;
  },
  showMap($attraction) {
    state.attractions.find(attraction => attraction.$element.is($attraction)).createMap();
  },
  reset() {
    toggleProgress();
    clearCategories();
    clearPlaceResults();
  },
};
