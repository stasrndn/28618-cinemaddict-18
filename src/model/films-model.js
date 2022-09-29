import Observable from '../framework/observable.js';
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

  /**
   * Метод для обновления фильма
   * @param updateType
   * @param update
   */
  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}
