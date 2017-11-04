/* global $ */
import state from '../../modules/state';
import DOM from './DOM';
import Attraction from '../../components/Attraction';

let animations = [];
let currentCategory = 'all';

function setLogo(text) {
  $(DOM.headerLogo).text(text);
}

function appendAttractions(attractions) {
  const $attractions = $(DOM.attractions);
  attractions.forEach((attraction, i) => {
    $attractions.append(attraction.$element);

    animations.push(setTimeout(() => {
      attraction.$element.addClass('show');
    }, 350 * i));
  });
}

function clearCategories() {
  $(DOM.category).remove();
}

function clearAnimations() {
  animations.forEach(clearTimeout);
  animations = [];
}

function clearAttractions() {
  clearAnimations();
  $(DOM.attraction).removeClass('show').remove();
}

export default {
  setLogo,
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
    if (currentCategory === category.toLowerCase()) {
      return;
    }

    currentCategory = category.toLowerCase();

    const attractionsToShow = (currentCategory === 'all') ?
      state.attractions :
      state.attractions.filter(attraction =>
        attraction.place.category === category,
      );

    clearAttractions();
    appendAttractions(attractionsToShow);
  },
  getMap($attraction) {
    return state.attractions.find(attraction => attraction.$element.is($attraction)).map;
  },
  showMap($attraction) {
    state.attractions.find(attraction => attraction.$element.is($attraction)).showMap();
  },
  closeMap($attraction) {
    state.attractions.find(attraction => attraction.$element.is($attraction)).closeMap();
  },
  reset() {
    clearCategories();
    clearAttractions();
  },
};
