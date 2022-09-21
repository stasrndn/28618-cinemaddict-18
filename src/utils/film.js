import dayjs from 'dayjs';

/**
 * Сортировка фильмов по дате релиза
 * @param filmA
 * @param filmB
 */
const sortByDateRelease = (filmA, filmB) => {
  if (dayjs(filmA.filmInfo.release.date).isBefore(filmB.filmInfo.release.date)) {
    return -1;
  }

  if (dayjs(filmA.filmInfo.release.date).isAfter(dayjs(filmB.filmInfo.release.date))) {
    return 1;
  }

  return 0;
};

/**
 * Сортировка списка фильмов по рейтингу
 * @param filmA
 * @param filmB
 * @returns {number}
 */
const sortByRating = (filmA, filmB) => {
  if (filmA.filmInfo.totalRating > filmB.filmInfo.totalRating) {
    return -1;
  }

  if (filmA.filmInfo.totalRating < filmB.filmInfo.totalRating) {
    return 1;
  }

  return 0;
};

export {
  sortByDateRelease,
  sortByRating,
};
