/* global google $ */
import { render } from 'mustache';
import { DOM } from '../controllers/UIController';

export default class Attraction {
  constructor(place) {
    this.place = place;
    this.$element = this.createElement();
    this.createRating();
    this.map = null;
    this.marker = null;
  }

  createMap() {
    if (!this.map) {
      const coords = new google.maps.LatLng(
        this.place.coords.lat,
        this.place.coords.lng,
      );
      const map = new google.maps.Map(this.$element.find('.map').get(0), {
        zoom: 15,
        center: coords,
      });
      const marker = new google.maps.Marker({
        position: coords,
        map,
      });
      this.map = map;
      this.marker = marker;

      google.maps.event.addListener(map, 'idle', () => {
        map.setCenter(coords);
        google.maps.event.trigger(map, 'resize');
      });
    }

    this.showMap();
  }

  showMap() {
    const $map = this.$element.find('.map');

    $map.css({
      position: 'absolute',
    });
  }

  createRating() {
    const currentRating = this.$element.find(DOM.attractionRating).data('current-rating');
    this.$element.find(DOM.attractionRating).barrating('show', {
      theme: 'fontawesome-stars-o',
      showSelectedRating: false,
      initialRating: currentRating / 2,
      readonly: true,
    });
  }

  createElement() {
    const template = $('#attraction-template').text();
    const html = render(template, {
      photo: this.place.photo,
      category: this.place.category,
      name: this.place.name,
      address: this.place.address.split(', ').join('<br>'),
      price: this.place.price,
      rating: this.place.rating,
    });

    return $(html);
  }
}
