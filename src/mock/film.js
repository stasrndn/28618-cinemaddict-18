import {getRandomFloat, getRandomInteger, generateId} from '../utils.js';
import {MAX_COMMENTS_COUNT, MAX_FILM_COMMENT_COUNT} from '../const.js';

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
 * Генерирует рандомный постер
 * @returns {string}
 */
const generatePoster = (index) => (posters[index].length ? `./images/posters/${posters[index]}` : '');

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
 * @returns {[]}
 */
const generateCommentsId = (comments) => {
  const result = [];
  const randomNumberComments = getRandomInteger(1, MAX_FILM_COMMENT_COUNT);

  for (let i = 0; i < randomNumberComments; i++) {
    const randomIndexComment = getRandomInteger(0, MAX_COMMENTS_COUNT - 1);
    const commentId = comments[randomIndexComment].id;

    if (!result.includes(commentId)) {
      result.push(commentId);
    }
  }

  return result;
};

export const generateFilm = (comments, _, index) => ({
  id: generateId(),
  comments: generateCommentsId(comments),
  filmInfo: {
    title: titles[index],
    alternativeTitle: alternativeTitles[index],
    totalRating: getRandomFloat(TotalRating.MIN, TotalRating.MAX),
    poster: generatePoster(index),
    ageRating: getRandomInteger(AgeRating.MIN, AgeRating.MAX),
    director: directors[index],
    writers: writers[index],
    actors: actors[index],
    release: releases[index],
    runtime: runtimes[index],
    genre: genres[index],
    description: generateDescription(),
  },
});
