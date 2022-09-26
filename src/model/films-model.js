import Observable from '../framework/observable';
import {generateFilm} from '../mock/film.js';
import {MAX_FILMS_COUNT} from '../const.js';

/**
 * Модель рыба для списка фильмов
 */
export default class FilmsModel extends Observable {
  #films = [];

  constructor(commentsModel) {
    super();
    this.#films = Array.from({length: MAX_FILMS_COUNT}, generateFilm.bind(this, commentsModel.comments));
  }

  /**
   * Метод для получения фильмов
   * @returns {*[]}
   */
  get films() {
    return this.#films;
  }

  /**
   * Метод для добавления фильма
   * @param updateType
   * @param update
   */
  addFilm = (updateType, update) => {
    this.#films = [
      update,
      ...this.#films,
    ];

    this._notify(updateType, update);
  };
}
