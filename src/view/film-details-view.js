import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {UserAction, UpdateType} from '../const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

/**
 * Шаблон блока с постером фильма
 * @param poster
 * @returns {string}
 */
const createFilmDetailsPosterTemplate = (poster) => (
  `${poster?.length ? `<img class="film-details__poster-img" src="${poster}" alt="">` : ''}`
);

/**
 * Шаблон блока с рейтингом фильма
 * @param totalRating
 * @returns {string}
 */
const createFilmDetailsTotalRatingTemplate = (totalRating) => (
  `${totalRating ? `<div class="film-details__rating">
    <p class="film-details__total-rating">${totalRating}</p>
  </div>` : ''}`
);

/**
 * Шаблон блока с названием фильма
 * @param title
 * @returns {string}
 */
const createFilmDetailsTitleTemplate = (title) => (
  `${title?.length
    ? `<h3 class="film-details__title">${title}</h3>`
    : ''}`
);

/**
 * Шаблон блока с оригинальным названием фильма
 * @param alternativeTitle
 * @returns {string}
 */
const createFilmDetailsAlternativeTitleTemplate = (alternativeTitle) => (
  `${alternativeTitle?.length
    ? `<p class="film-details__title-original">Original: ${alternativeTitle}</p>`
    : ''}`
);

/**
 * Шаблон блока с режиссёром фильма
 * @param director
 * @returns {string}
 */
const createFilmDetailsDirectorTemplate = (director) => (
  `${director?.length
    ? `<tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${director}</td>
      </tr>`
    : ''}`
);

/**
 * Шаблон блока со сценаристами
 * @param writers
 * @returns {string}
 */
const createFilmDetailsWritersTemplate = (writers) => (
  `${writers?.length
    ? `<tr class="film-details__row">
          <td class="film-details__term">${writers.length > 1 ? 'Writers' : 'Writer'}</td>
          <td class="film-details__cell">${writers.join(', ')}</td>
        </tr>`
    : ''}`
);

/**
 * Шаблон блока с актёрами
 * @param actors
 * @returns {string}
 */
const createFilmDetailsActorsTemplate = (actors) => (
  `${actors?.length
    ? `<tr class="film-details__row">
          <td class="film-details__term">${actors.length > 1 ? 'Actors' : 'Actor'}</td>
          <td class="film-details__cell">${actors.join(', ')}</td>
        </tr>`
    : ''}`
);

/**
 * Шаблон блока с датой релиза фильма
 * @param release
 * @returns {string}
 */
const createFilmDetailsReleaseDateTemplate = (release) => (
  `${release.date?.length
    ? `<tr class="film-details__row">
          <td class="film-details__term">Release Date</td>
          <td class="film-details__cell">${dayjs(release.date).format('DD MMMM YYYY')}</td>
       </tr>`
    : ''}`
);

/**
 * Шаблон блока с продолжительностью фильма
 * @param runtime
 * @returns {string}
 */
const createFilmDetailsRuntimeTemplate = (runtime) => (
  `${runtime
    ? `<tr class="film-details__row">
          <td class="film-details__term">Runtime</td>
          <td class="film-details__cell">
            ${dayjs.duration(runtime, 'm').format('H[h] mm[m]')}
          </td>
       </tr>`
    : ''}`
);

/**
 * Шаблон блока с жанрами фильма
 * @param genres
 * @returns {string}
 */
const createFilmDetailsGenresTemplate = (genres) => (
  `${genres?.length
    ? `<tr class="film-details__row">
        <td class="film-details__term">${genres.length > 1 ? 'Genres' : 'Genre'}</td>
        <td class="film-details__cell">
          ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('')}
       </tr>`
    : ''}`
);

/**
 * Шаблон блока страны происхождения фильма
 * @param release
 * @returns {string}
 */
const createFilmDetailsCountryTemplate = (release) => (
  `${release.releaseCountry?.length
    ? `<tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${release.releaseCountry}</td>
      </tr>`
    : ''}`
);

/**
 * Шаблон блока с описанием фильма
 * @param description
 * @returns {string}
 */
const createFilmDetailsDescriptionTemplate = (description) => (
  `${description?.length
    ? `<p class="film-details__film-description">${description}</p>`
    : ''}`
);

/**
 * Шаблон блока с возрастными ограничениями
 * @param ageRating
 * @returns {string}
 */
const createFilmDetailsAgeRatingTemplate = (ageRating) => (
  `${ageRating !== null
    ? `<p class="film-details__age">${ageRating}+</p>`
    : ''}`
);

const createFilmDetailsTemplate = (state) => {
  const {
    poster,
    totalRating,
    title,
    alternativeTitle,
    director,
    writers,
    actors,
    release,
    runtime,
    genre,
    description,
    ageRating,
  } = state.filmInfo;

  const isWatchlist = state.userDetails.watchlist;
  const isAlreadyWatched = state.userDetails.alreadyWatched;
  const isFavorite = state.userDetails.favorite;

  const posterTemplate = createFilmDetailsPosterTemplate(poster);
  const totalRatingTemplate = createFilmDetailsTotalRatingTemplate(totalRating);
  const titleTemplate = createFilmDetailsTitleTemplate(title);
  const alternativeTitleTemplate = createFilmDetailsAlternativeTitleTemplate(alternativeTitle);
  const directorTemplate = createFilmDetailsDirectorTemplate(director);
  const writersTemplate = createFilmDetailsWritersTemplate(writers);
  const actorsTemplate = createFilmDetailsActorsTemplate(actors);
  const releaseDateTemplate = createFilmDetailsReleaseDateTemplate(release);
  const runtimeTemplate = createFilmDetailsRuntimeTemplate(runtime);
  const countryTemplate = createFilmDetailsCountryTemplate(release);
  const genresTemplate = createFilmDetailsGenresTemplate(genre);
  const descriptionTemplate = createFilmDetailsDescriptionTemplate(description);
  const ageRatingTemplate = createFilmDetailsAgeRatingTemplate(ageRating);

  return (`
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          ${posterTemplate}
          ${ageRatingTemplate}
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              ${titleTemplate}
              ${alternativeTitleTemplate}
            </div>
            ${totalRatingTemplate}
          </div>

          <table class="film-details__table">
            ${directorTemplate}
            ${writersTemplate}
            ${actorsTemplate}
            ${releaseDateTemplate}
            ${runtimeTemplate}
            ${countryTemplate}
            ${genresTemplate}
          </table>
          ${descriptionTemplate}
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button ${isWatchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">
          ${isWatchlist ? 'Added' : 'Add'} to watchlist
        </button>
        <button type="button" class="film-details__control-button ${isAlreadyWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">
          ${isAlreadyWatched ? 'Already watched' : 'Not Viewed'}
        </button>
        <button type="button" class="film-details__control-button ${isFavorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">
          ${isFavorite ? 'Added' : 'Add'} to favorites
        </button>
      </section>
    </div>
  `);
};

export default class FilmDetailsView extends AbstractStatefulView {
  constructor(film) {
    super();
    this._state = FilmDetailsView.parseFilmToState(film);

    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  /**
   * Сохранить обработчик на изменение фильма
   * @param callback
   */
  setFilmChangeHandler = (callback) => {
    this._callback.filmChangeHandler = callback;
  };

  /**
   * Сохранить обработчик на закрытие окна
   * @param callback
   */
  setFilmDetailDeleteHandler = (callback) => {
    this._callback.filmDetailDeleteHandler = callback;
  };

  updateData = (film) => {
    this.#freezeCurrentPosition();
    this.updateElement(FilmDetailsView.parseFilmToState(film));
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setElementPosition();
  };

  /**
   * Установка внутренних обработчиков
   */
  #setInnerHandlers = () => {
    this.#setCloseButtonClickHandler();
    this.#setAddToWatchlistButtonClickHandler();
    this.#setMarkAsWatchedButtonClickHandler();
    this.#setMarkAsFavoriteButtonClickHandler();
  };

  /**
   * Установить обработчик по клику на кнопке закрытия
   */
  #setCloseButtonClickHandler = () => {
    const closeButton = this.element.querySelector('.film-details__close-btn');
    closeButton.addEventListener('click', this.#closeButtonClickHandler);
  };

  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filmDetailDeleteHandler();
  };

  /**
   * Установит обработчик на кнопку "Добавить к просмотру"
   */
  #setAddToWatchlistButtonClickHandler = () => {
    const watchListButton = this.element.querySelector('#watchlist');
    watchListButton.addEventListener('click', this.#addToWatchlistButtonClickHandler);
  };

  /**
   * Обработчик кнопки "Добавить к просмотру"
   * @param evt
   */
  #addToWatchlistButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.watchlist = !this._state.userDetails.watchlist;
    this.#freezeCurrentPosition();
    this.#callFilmChangeHandler();
    this.updateElement(this._state);
  };

  /**
   * Установит обработчик на кнопку "Просмотрен"
   */
  #setMarkAsWatchedButtonClickHandler = () => {
    const watchedButton = this.element.querySelector('#watched');
    watchedButton.addEventListener('click', this.#markAsWatchedButtonClickHandler);
  };

  /**
   * Обработчик кнопки "Просмотрен"
   * @param evt
   */
  #markAsWatchedButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.alreadyWatched = !this._state.userDetails.alreadyWatched;
    this.#freezeCurrentPosition();
    this.#callFilmChangeHandler();
    this.updateElement(this._state);
  };

  /**
   * Установит обработчик на кнопку "Добавить в избранное"
   */
  #setMarkAsFavoriteButtonClickHandler = () => {
    const favoriteButton = this.element.querySelector('#favorite');
    favoriteButton.addEventListener('click', this.#markAsFavoriteButtonClickHandler);
  };

  /**
   * Обработчик кнопки "Добавить в избранное"
   * @param evt
   */
  #markAsFavoriteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.favorite = !this._state.userDetails.favorite;
    this.#freezeCurrentPosition();
    this.#callFilmChangeHandler();
    this.updateElement(this._state);
  };

  /**
   * Установить позицию окна позицию окна
   */
  #setElementPosition = () => {
    this.element.scrollTo(this._state.position.x, this._state.position.y);
  };

  /**
   * Запомнить текущую позицию всплывающего окна
   */
  #freezeCurrentPosition = () => {
    this._state.position = {x: 0, y: this.element.scrollTop};
  };

  /**
   * Вызвать обработчик изменения фильма
   */
  #callFilmChangeHandler = () => {
    this._callback.filmChangeHandler(UserAction.UPDATE_FILM, UpdateType.PATCH, FilmDetailsView.parseStateToFilm(this._state));
  };

  /**
   * Преобразовать данные в state | состояние
   * @param film
   * @returns {*&{position: {x: number, y: number}}}
   */
  static parseFilmToState = (film) => ({
    ...film,
    position: {x: 0, y: 0},
    emotion: null,
  });

  /**
   * Преобразовать стейт обратно в данные
   * @param state
   * @returns {*}
   */
  static parseStateToFilm = (state) => {
    const film = {...state};

    delete film.position;
    delete film.emotion;

    return film;
  };
}
