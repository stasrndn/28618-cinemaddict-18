import {generateFilm} from '../mock/film.js';
import {MAX_FILMS_COUNT} from '../const.js';

/**
 * Модель рыба для списка фильмов
 */
export default class FilmsModel {
  #films = [];
  #comments = [];
  #commentsModel = null;

  constructor(commentsModel) {
    this.#commentsModel = commentsModel;
    this.#comments = [...this.#commentsModel.getComments()];
    this.#films = Array.from({length: MAX_FILMS_COUNT}, generateFilm.bind(this, this.#comments));
  }

  getFilms = () => this.#films;

  getFilmById = (id) => this.#films.find((film) => film.id === id);
}
