import dayjs from 'dayjs';
import {MAX_CARDS_COUNT_FILMS_EXTRA} from '../const';

/**
 * Сортировка фильмов по дате релиза
 * @param filmA
 * @param filmB
 */
const sortByDateRelease = (filmA, filmB) => dayjs(filmA.filmInfo.release.date).isBefore(filmB.filmInfo.release.date) ? -1 : 1;

/**
 * Сортировка списка фильмов по рейтингу
 * @param filmA
 * @param filmB
 * @returns {number}
 */
const sortByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

/**
 * Сортировка фильмов по количеству комментариев
 * @param filmA
 * @param filmB
 * @returns {number}
 */
const sortByCommentsCount = (filmA, filmB) => filmB.comments.length - filmA.comments.length;

/**
 * Находится ли фильм в списке "К просмотру"
 * @param state
 * @returns {*|boolean}
 */
const isWatchlist = (state) => state.userDetails.watchlist;

/**
 * Проверяет, просмотрен ли уже фильм
 * @param state
 * @returns {*|boolean}
 */
const isAlreadyWatched = (state) => state.userDetails.alreadyWatched;

/**
 * Отфильтровать фильмы по рейтингу
 * и возвратить максимум 2 карточки фильма
 * @param films
 * @returns {*}
 */
const filterFilmsByRating = (films) =>
  films
    .filter((film) => film?.filmInfo.totalRating > 0)
    .sort(sortByRating)
    .slice(0, MAX_CARDS_COUNT_FILMS_EXTRA);

/**
 * Отфильтровать фильмы по количеству комментариев
 * и возвратить максимум 2 карточки фильма
 * @param films
 * @returns {*}
 */
const filterFilmsByCommentsCount = (films) =>
  films
    .filter((film) => film.comments.length > 0)
    .sort(sortByCommentsCount)
    .slice(0, MAX_CARDS_COUNT_FILMS_EXTRA);

/**
 * Проверяет, находится ли фильм в избранном
 * @param state
 * @returns {*|boolean}
 */
const isFavorite = (state) => state.userDetails.favorite;

export {
  sortByDateRelease,
  sortByRating,
  sortByCommentsCount,
  isWatchlist,
  isAlreadyWatched,
  isFavorite,
  filterFilmsByRating,
  filterFilmsByCommentsCount,
};
