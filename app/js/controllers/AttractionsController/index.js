import { getAttractions } from '../../lib/attractions';

function parseIcon(size, icon) {
  return `${icon.prefix}bg_${size}${icon.suffix}`;
}

function parsePhoto(size, photo) {
  return `${photo.prefix}${size}${photo.suffix}`;
}

function parseCategory(iconUrl) {
  const category = iconUrl.split('/').slice(-2, -1)[0];
  return category.split('_').map(cat => `${cat[0].toUpperCase()}${cat.slice(1)}`).join(' ');
}

function parseAttraction(attraction) {
  const data = {};

  data.name = attraction.venue.name;

  attraction.venue.categories.forEach((category) => {
    data.icon = parseIcon(32, category.icon);
    data.category = parseCategory(data.icon);
  });

  if (typeof attraction.venue.hours !== 'undefined') {
    data.open = attraction.venue.hours.isOpen;
    data.hours = attraction.venue.hours.status;
  }

  if (typeof attraction.venue.location !== 'undefined') {
    data.address = attraction.venue.location.formattedAddress.join(', ');
    data.coords = {
      lat: attraction.venue.location.lat,
      lng: attraction.venue.location.lng,
    };
  }

  if (attraction.venue.photos.count !== 0) {
    data.photo = parsePhoto('500x300', attraction.venue.photos.groups[0].items[0]);
  }

  if (typeof attraction.venue.price !== 'undefined') {
    data.price = attraction.venue.price.currency.repeat(attraction.venue.price.tier);
  }

  if (typeof attraction.venue.rating !== 'undefined') {
    data.rating = attraction.venue.rating;
  }

  return data;
}

export default {
  findAttractions(coords) {
    return new Promise((resolve) => {
      getAttractions(coords).then((res) => {
        const attractions = [];

        res.groups.forEach((group) => {
          group.items.forEach((attraction) => {
            attractions.push(parseAttraction(attraction));
          });
        });

        resolve(attractions);
      });
    });
  },
};
