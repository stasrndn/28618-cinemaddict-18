import {UserType} from '../const.js';

/**
 * Определить тип пользователя
 * @param countWatchedFilms
 * @returns {string|null}
 */
const getUserType = (countWatchedFilms) => {
  if (countWatchedFilms > 0 && countWatchedFilms <= 10) {
    return UserType.NOVICE;
  } else if (countWatchedFilms > 10 && countWatchedFilms <= 20) {
    return UserType.FAN;
  } else if (countWatchedFilms >= 21) {
    return UserType.MOVIE_BUFF;
  }

  return null;
};

export {
  getUserType,
};
