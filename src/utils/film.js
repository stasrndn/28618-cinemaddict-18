import dayjs from 'dayjs';

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
 * Проверяет, находится ли фильм в избранном
 * @param state
 * @returns {*|boolean}
 */
const isFavorite = (state) => state.userDetails.favorite;

export {
  sortByDateRelease,
  sortByRating,
  isWatchlist,
  isAlreadyWatched,
  isFavorite,
};
