import {getRandomFloat, getRandomInteger} from '../utils.js';
import {MAX_COMMENTS_COUNT, MAX_FILM_COMMENT_COUNT} from '../const';

const TotalRating = {
  MIN: 0.1,
  MAX: 10.0,
};

const AgeRating = {
  MIN: 0,
  MAX: 18,
};

const NumberOffers = {
  MIN: 1,
  MAX: 5,
};

const posters = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const runtimes = [
  '1h 33m',
  '0h 16m',
  '0h 54m',
  '1h 21m',
  '1h 55m',
  '1h 25m',
  '1h 59m',
];

const genres = [
  ['Comedy', 'Drama', ],
  ['Cartoon', ],
  ['Western', ],
  ['Comedy', ],
  ['Musical', ],
  ['Mystery', ],
  ['Drama', ],
];

const titles = [
  'Made for Each Other',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Sagebrush Trail',
  'Santa Claus Conquers the Martians',
  'The Dance of Life',
  'The Great Flamarion',
  'The Man with the Golden Arm',
];

const alternativeTitles = [
  'Made for Each Other Alternative',
  'Popeye the Sailor Meets Sindbad the Sailor Alternative',
  'Sagebrush Trail Alternative',
  'Santa Claus Conquers the Martians Alternative',
  'The Dance of Life Alternative',
  'The Great Flamarion Alternative',
  'The Man with the Golden Arm Alternative',
];

const releases = [
  {
    date: '10 February 1939',
    releaseCountry: 'United States',
  },
  {
    date: '27 November 1936',
    releaseCountry: 'United States',
  },
  {
    date: '15 December 1933',
    releaseCountry: 'United States',
  },
  {
    date: '14 November 1964',
    releaseCountry: 'United States',
  },
  {
    date: '16 August 1929',
    releaseCountry: 'United States',
  },
  {
    date: '13 January 1945',
    releaseCountry: 'United States',
  },
  {
    date: '15 December 1955',
    releaseCountry: 'United States',
  },
];

const directors = [
  'Mabrur Rashid Bannah',
  'Dave Fleischer',
  'Armand Schaefer',
  'Nicholas Webster',
  'John Cromwell',
  'Anthony Mann',
  'Otto Preminger',
];

const writers = [
  ['Rose Franken', 'Jo Swerling',],
  ['Joe Stultz', 'Bill Turner', 'Jack Ward', ' I. Sparber',],
  ['Lindsley Parsons', 'Lindsley Parsons',],
  ['Glenville Mareth',],
  ['Benjamin Glazer', 'Julian Johnson',],
  ['Heinz Herald', 'Richard Weil', 'Anne Wigton',],
  ['Nelson Algren',],
];

const actors = [
  ['James Stewart', 'Carole Lombard', 'Charles Coburn', 'Lucile Watson', 'Eddie Quillan',],
  ['Jack Mercer', 'Mae Questel', 'Gus Wickie',],
  ['John Bran', 'Sally Blake', 'Joseph Conlon', 'Outlaw Gang Leader',],
  ['John Call', 'Leonard Hicks', 'Vincent Beck', 'Victor Stiles', 'Donna Conforti', 'Chris Month', 'Leila Martin',],
  ['Nancy Carroll', 'Dorothy Revier', 'Charles D. Brown', 'May Boley',],
  ['Great Flamarion', 'Connie Wallace', 'Eddie Wheeler',],
  ['Frank Sinatra', 'Eleanor Parker', 'Kim Novak',]
];

const descriptions = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula ' +
  'feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis ' +
  'sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, ' +
  'eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. ' +
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

/**
 * Генерирует id фильма
 * @type {{getNext(): number}}
 */
const generateId = (() => {
  let id = 0;

  return {
    getNext() {
      id++;
      return id;
    }
  };
})();

/**
 * Возвращает заголовки фильма по id
 * @returns {{alternativeTitle: string, title: string}}
 */
const generateTitles = (id) => {
  const index = --id;

  return {
    title: titles[index],
    alternativeTitle: alternativeTitles[index],
  };
};

/**
 * Возвращает режиссёра фильма по id
 * @param id
 * @returns {string}
 */
const generateDirector = (id) => {
  const index = --id;

  return directors[index];
};

/**
 * Возвращает сценаристов фильма по id фильма
 * @param id
 * @returns {string[]}
 */
const generateWriters = (id) => {
  const index = --id;

  return writers[index];
};

/**
 * Возвращает актёров фильма по id фильма
 * @param id
 * @returns {string[]}
 */
const generateActors = (id) => {
  const index = --id;

  return actors[index];
};

/**
 * Возвращает жанр фильма по id фильма
 * @param id
 * @returns {string}
 */
const generateGenre = (id) => {
  const index = --id;

  return genres[index];
};

/**
 * Возвращает продолжительность фильма по id фильма
 * @param id
 * @returns {string}
 */
const generateRuntime = (id) => {
  const index = --id;

  return runtimes[index];
};

/**
 * Генерирует рандомный постер
 * @returns {string}
 */
const generatePoster = (id) => {
  const index = --id;
  return (posters[index].length ? `./images/posters/${posters[index]}` : '');
};

/**
 * Генерирует рандомный рейтинг
 * @returns {number}
 */
const generateTotalRating = () => {
  const minTotalRating = TotalRating.MIN;
  const maxTotalRating = TotalRating.MAX;

  return getRandomFloat(minTotalRating, maxTotalRating);
};

/**
 * Генерирует дату и страну релиза фильма
 * @param id
 * @returns {{date: string, releaseCountry: string}}
 */
const generateReleaseInfo = (id) => {
  const index = --id;

  return releases[index];
};

/**
 * Генерирует рандомный возрастной рейтинг
 * @returns {number}
 */
const generateAgeRating = () => {
  const minAgeRating = AgeRating.MIN;
  const maxAgeRating = AgeRating.MAX;

  return getRandomInteger(minAgeRating, maxAgeRating);
};

/**
 * Генерирует описание к фильму из случайного количества предложений
 * @returns {string}
 */
const generateDescription = () => {
  const finalIndex = getRandomInteger(NumberOffers.MIN, NumberOffers.MAX);
  const description = descriptions.split('.').slice(0, finalIndex);

  return description.join('.');
};

/**
 * Генерирует случайный набор id комментариев
 * @returns {*[]}
 */
const generateComments = () => {
  const comments = [];
  const randomCount = getRandomInteger(1, MAX_FILM_COMMENT_COUNT);
  for (let i = 0; i < randomCount; i++) {
    const randomId = getRandomInteger(1, MAX_COMMENTS_COUNT);

    if (!comments.includes(randomId)) {
      comments.push(randomId);
    }
  }

  return comments;
};

export const generateFilm = () => {

  const id = generateId.getNext();
  const {title, alternativeTitle} = generateTitles(id);

  return {
    id: id,
    comments: generateComments(),
    filmInfo: {
      title,
      alternativeTitle,
      totalRating: generateTotalRating(),
      poster: generatePoster(id),
      ageRating: generateAgeRating(),
      director: generateDirector(id),
      writers: generateWriters(id),
      actors: generateActors(id),
      release: generateReleaseInfo(id),
      runtime: generateRuntime(id),
      genre: generateGenre(id),
      description: generateDescription(),
    },
  };
};
