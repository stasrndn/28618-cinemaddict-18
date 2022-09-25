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

export {
  sortByDateRelease,
  sortByRating,
};
