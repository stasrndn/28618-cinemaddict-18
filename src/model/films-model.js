import {generateFilm} from '../mock/film.js';
import {MAX_FILMS_COUNT} from '../const.js';

/**
 * Модель рыба для списка фильмов
 */
export default class FilmsModel {
  #films = [];

  constructor(commentsModel) {
    this.#films = Array.from({length: MAX_FILMS_COUNT}, generateFilm.bind(this, commentsModel.comments));
  }

  get films() {
    return this.#films;
  }
}
