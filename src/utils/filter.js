import {FilterType, TAG_SPAN} from '../const.js';
import {isWatchlist, isAlreadyWatched, isFavorite} from './film.js';

/**
 * Фильтрация фильмов по различным условиям
 * @type {{}}
 */
const filter = {
  [FilterType.ALL]: (films) => [...films],
  [FilterType.WATCHLIST]: (films) => films.filter((film) => isWatchlist(film)),
  [FilterType.HISTORY]: (films) => films.filter((film) => isAlreadyWatched(film)),
  [FilterType.FAVORITES]: (films) => films.filter((film) => isFavorite(film)),
};

/**
 * Получить тип фильтра из дата-атрибута
 * @param evt
 * @returns {string}
 */
const getFilterType = (evt) => {
  if (evt.target.tagName === TAG_SPAN) {
    return evt.target.parentElement.dataset.filterType;
  }

  return evt.target.dataset.filterType;
};

export {
  filter,
  getFilterType,
};
