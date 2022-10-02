import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

/**
 * Модель рыба для списка фильмов
 */
export default class FilmsModel extends Observable {
  #films = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  /**
   * Загрузка данных с сервера
   * @returns {Promise<void>}
   */
  init = async () => {
    try {
      const films = await this.#apiService.get();
      this.#films = films.map(this.#adaptToClient);
    } catch {
      this.#films = [];
    }
    this._notify(UpdateType.INIT, null);
  };

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
  updateFilm = async (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    try {
      const response = await this.#apiService.update(update);
      const updatedFilm = this.#adaptToClient(response);

      this.#films = [
        ...this.#films.slice(0, index),
        updatedFilm,
        ...this.#films.slice(index + 1),
      ];

      this._notify(updateType, updatedFilm);
    } catch {
      throw new Error('Can\'t update film');
    }
  };

  /**
   * Адаптация структуры объекта фильма для фронта
   * @param film
   * @returns {*&{filmInfo: (*&{alternativeTitle, totalRating, ageRating}), userDetails: (*&{watchingDate, alreadyWatched})}}
   */
  #adaptToClient = (film) => {
    const adaptedFilm = {};

    adaptedFilm.filmInfo = film.film_info;
    adaptedFilm.filmInfo.ageRating = adaptedFilm.filmInfo.age_rating;
    adaptedFilm.filmInfo.alternativeTitle = adaptedFilm.filmInfo.alternative_title;
    adaptedFilm.filmInfo.release.releaseCountry = adaptedFilm.filmInfo.release.release_country;
    adaptedFilm.filmInfo.totalRating = adaptedFilm.filmInfo.total_rating;

    adaptedFilm.userDetails = film.user_details;
    adaptedFilm.userDetails.alreadyWatched = adaptedFilm.userDetails.already_watched;
    adaptedFilm.userDetails.watchingDate = adaptedFilm.userDetails.watching_date;

    adaptedFilm.comments = film.comments;
    adaptedFilm.id = film.id;

    delete adaptedFilm.filmInfo.age_rating;
    delete adaptedFilm.filmInfo.alternative_title;
    delete adaptedFilm.filmInfo.release.release_country;
    delete adaptedFilm.filmInfo.total_rating;

    delete adaptedFilm.userDetails.already_watched;
    delete adaptedFilm.userDetails.watching_date;

    return adaptedFilm;
  };
}


