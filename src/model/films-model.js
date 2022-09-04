import {generateFilm} from '../mock/film.js';
import {MAX_FILMS_COUNT} from '../const.js';

/**
 * Модель рыба для списка фильмов
 */
export default class FilmsModel {
  #films = Array.from({length: MAX_FILMS_COUNT}, generateFilm);

  getFilms = () => this.#films;
}
