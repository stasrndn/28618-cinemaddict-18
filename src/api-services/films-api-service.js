import ApiService from '../framework/api-service.js';
import {Method} from '../const.js';

export default class FilmsApiService extends ApiService {
  /**
   * Получение фильмов с сервера
   * @returns {Promise<Response>}
   */
  get = () => this
    ._load({url: 'movies'})
    .then(ApiService.parseResponse);

  /**
   * Запрос на обновление фильма на сервере
   * @param film
   * @returns {Promise<JSON>}
   */
  update = async (film) => {
    const response = await this._load({
      url: `moviess/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  };

  /**
   * Адаптация данных о фильме для сервера
   * @param film
   * @returns {*&{film_info: (*&{alternative_title: *, age_rating: (number|*), total_rating: (number|*)}), user_details: (*&{already_watched: (*|boolean), watching_date: (null|*)})}}
   */
  #adaptToServer = (film) => {
    const adaptedFilm = {};

    adaptedFilm['film_info'] = film.filmInfo;
    adaptedFilm['film_info']['age_rating'] = film.filmInfo.ageRating;
    adaptedFilm['film_info']['alternative_title'] = film.filmInfo.alternativeTitle;
    adaptedFilm['film_info']['total_rating'] = film.filmInfo.totalRating;
    adaptedFilm['film_info']['release']['release_country'] = film.filmInfo.release.releaseCountry;

    adaptedFilm['user_details'] = film.userDetails;
    adaptedFilm['user_details']['already_watched'] = film.userDetails.alreadyWatched;
    adaptedFilm['user_details']['watching_date'] = film.userDetails.watchingDate;

    adaptedFilm['comments'] = film.comments;
    adaptedFilm['id'] = film.id;

    delete adaptedFilm['film_info']['ageRating'];
    delete adaptedFilm['film_info']['alternativeTitle'];
    delete adaptedFilm['film_info']['totalRating'];
    delete adaptedFilm['film_info']['release']['releaseCountry'];

    delete adaptedFilm['user_details']['alreadyWatched'];
    delete adaptedFilm['user_details']['watchingDate'];

    return adaptedFilm;
  };
}
