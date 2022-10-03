import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {isAlreadyWatched, isFavorite, isWatchlist} from '../utils/film.js';
import {MAX_LENGTH_DESCRIPTION_FILM, UpdateType, UserAction} from '../const.js';
import {isControlButton} from '../utils/common.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

/**
 * Шаблон блока комментариев карточки
 * @param comments
 * @returns {string}
 */
const createFilmCardCommentsTemplate = (comments) => (
  `<span class="film-card__comments">${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}</span>`
);

/**
 * Шаблон блока описания карточки
 * @param description
 * @returns {string}
 */
const createFilmCardDescriptionTemplate = (description) => (
  `<p class="film-card__description">
    ${description.length > MAX_LENGTH_DESCRIPTION_FILM
    ? `${description.substring(0, MAX_LENGTH_DESCRIPTION_FILM)}...`
    : `${description}`}
  </p>`
);

/**
 * Шаблон блока с постером карточки
 * @param poster
 * @returns {string}
 */
const createFilmCardPosterTemplate = (poster) => (
  `${poster.length ? `<img src="${poster}" alt="" class="film-card__poster">` : ''}`
);

/**
 * Шаблон блока с годом релиза фильма
 * @param release
 * @returns {string}
 */
const createFilmCardYearReleaseTemplate = (release) => (
  `${release.date !== ''
    ? `<span class="film-card__year">${dayjs(release.date).format('YYYY')}</span>`
    : ''
  }`
);

/**
 * Шаблон блока с продолжительностью фильма
 * @param runtime
 * @returns {`${string|string}`}
 */
const createFilmCardRuntimeTemplate = (runtime) => (
  `${runtime.length !== ''
    ? `<span class="film-card__duration">${dayjs.duration(runtime, 'm').format('H[h] mm[m]')}</span>`
    : ''}`
);

const createFilmCardGenreTemplate = (genre) => (
  `${genre.length
    ? `<span class="film-card__genre">${genre.join(', ')}</span>`
    : ''}`
);

/**
 * Шаблон карточки фильма
 * @param state
 * @returns {string}
 */
const createFilmCardTemplate = (state) => {
  const {title, totalRating, description, poster, release, runtime, genre} = state.filmInfo;

  const posterTemplate = createFilmCardPosterTemplate(poster);
  const descriptionTemplate = createFilmCardDescriptionTemplate(description);
  const commentsTemplate = createFilmCardCommentsTemplate(state.comments);
  const yearReleaseTemplate = createFilmCardYearReleaseTemplate(release);
  const runtimeTemplate = createFilmCardRuntimeTemplate(runtime);
  const genreTemplate = createFilmCardGenreTemplate(genre);

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating ? `${totalRating}` : ''}</p>
        <p class="film-card__info">
          ${yearReleaseTemplate}
          ${runtimeTemplate}
          ${genreTemplate}
        </p>
        ${posterTemplate}
        ${descriptionTemplate}
        ${commentsTemplate}
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item ${isWatchlist(state) ? 'film-card__controls-item--active' : ''} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item ${isAlreadyWatched(state) ? 'film-card__controls-item--active' : ''} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item ${isFavorite(state) ? 'film-card__controls-item--active' : ''} film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmView extends AbstractStatefulView {
  constructor(film) {
    super();
    this._state = FilmView.parseFilmToState(film);
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmCardTemplate(this._state);
  }

  /**
   * Установить обработчик клика на карточке фильма
   * @param callback
   */
  setHandleFilmClick = (callback) => {
    this._callback.handleFilmClick = callback;
  };

  /**
   * Установить обработчик изменения фильма
   * @param callback
   */
  setHandleViewAction = (callback) => {
    this._callback.handleViewAction = callback;
  };

  /**
   * Потрусить панель управления
   */
  shakeControls = () => {
    const controlsPanel = this.element.querySelector('.film-card__controls');
    this.shakeAbsolute.call({element: controlsPanel});
  };

  /**
   * Восстановление внутренних обработчиков
   * @private
   */
  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  /**
   * Установка внутренних обработчиков
   */
  #setInnerHandlers = () => {
    const addToWatchlistButton = this.element.querySelector('.film-card__controls-item.film-card__controls-item--add-to-watchlist');
    const markAsWatchedButton = this.element.querySelector('.film-card__controls-item.film-card__controls-item--mark-as-watched');
    const markAsFavoriteButton = this.element.querySelector('.film-card__controls-item.film-card__controls-item--favorite');

    addToWatchlistButton.addEventListener('click', this.#addToWatchlistButtonClickHandler);
    markAsWatchedButton.addEventListener('click', this.#markAsWatchedButtonClickHandler);
    markAsFavoriteButton.addEventListener('click', this.#markAsFavoriteButtonClickHandler);

    this.element.addEventListener('click', this.#handleFilmClick);
  };

  /**
   * Обработчик кнопки "Добавить к просмотру"
   * @param evt
   */
  #addToWatchlistButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.watchlist = !this._state.userDetails.watchlist;
    this.#callFilmChangeHandler();
  };

  /**
   * Обработчик кнопки "Пометить просмотренным"
   * @param evt
   */
  #markAsWatchedButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.alreadyWatched = !this._state.userDetails.alreadyWatched;
    this.#callFilmChangeHandler();
  };

  /**
   * Обработчик кнопки "Добавить в избранное"
   * @param evt
   */
  #markAsFavoriteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.favorite = !this._state.userDetails.favorite;
    this.#callFilmChangeHandler();
  };

  /**
   * Обработчик клика по карточке фильма
   * @param evt
   */
  #handleFilmClick = (evt) => {
    evt.preventDefault();
    if (!isControlButton(evt)) {
      this._callback.handleFilmClick(FilmView.parseStateToFilm(this._state));
    }
  };

  /**
   * Вызвать обработчик изменения фильма
   */
  #callFilmChangeHandler = () => {
    this._callback.handleViewAction(UserAction.UPDATE_FILM, UpdateType.MINOR, FilmView.parseStateToFilm(this._state));
  };

  /**
   * Преобразовать данные в state | состояние
   * @param film
   */
  static parseFilmToState = (film) => ({...film});

  /**
   * Преобразовать стейт обратно в данные
   * @param state
   */
  static parseStateToFilm = (state) => ({...state});
}
