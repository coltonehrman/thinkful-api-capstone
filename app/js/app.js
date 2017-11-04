/* global $ document */
import { autocomplete, getLatLong } from './lib/google';
import UIController, { DOM } from './controllers/UIController';
import AttractionsController from './controllers/AttractionsController';

function setupEventListeners() {
  const $placeSearch = $(DOM.placeSearch);

  $placeSearch.on('keyup', () => {
    const search = $placeSearch.val().trim();

    if (search === '') {
      UIController.Search.clearResults();
    } else {
      autocomplete(search)
        .then(UIController.Search.displayResults)
        .catch(UIController.Search.clearResults);
    }
  });

  $(document).on('click', DOM.placeResult, (e) => {
    const $place = $(e.target);
    const name = $place.text().trim();
    const placeId = $place.data('place-id').trim();

    UIController.Search.clear();
    UIController.Place.setLogo(name);
    UIController.Place.reset();
    UIController.Screen.goTo(DOM.placeScreen);

    getLatLong(placeId).then((loc) => {
      AttractionsController.findAttractions(loc).then((attractions) => {
        UIController.Place.displayAttractions(attractions);
      });
    });
  });

  $(document).on('click', DOM.category, (e) => {
    const $categories = $(DOM.category);
    const $target = $(e.target);
    const category = $target.text();

    $categories.removeClass('active');
    $target.addClass('active');
    UIController.Place.displayAttractionsByFilter(category);
  });

  $(DOM.backButton).on('click', () => {
    UIController.Screen.goTo(DOM.homeScreen);
    UIController.Place.reset();
    UIController.Search.focus();
  });

  $(document).on('click', DOM.googleMapActivator, (e) => {
    const $attraction = $(e.target).parents(DOM.place);
    UIController.Place.showMap($attraction);
  });

  $(document).on('click', DOM.revealClose, (e) => {
    const $attraction = $(e.target).parents(DOM.place);
    UIController.Place.closeMap($attraction);
  });
}

function init() {
  UIController.Screen.goTo(DOM.homeScreen);
  UIController.Search.focus();
  setupEventListeners();
}

$(init);
