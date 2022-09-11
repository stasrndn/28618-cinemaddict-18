import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import {MAX_LENGTH_DESCRIPTION_FILM} from '../const';

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
    ? `<span class="film-card__duration">${runtime}</span>`
    : ''}`
);

const createFilmCardGenreTemplate = (genre) => (
  `${genre.length
    ? `<span class="film-card__genre">${genre.join(', ')}</span>`
    : ''}`
);

/**
 * Шаблон карточки фильма
 * @param film
 * @returns {string}
 */
const createFilmCardTemplate = (film) => {

  const {id} = film;
  const {title, totalRating, description, poster, release, runtime, genre} = film.filmInfo;

  const posterTemplate = createFilmCardPosterTemplate(poster);
  const descriptionTemplate = createFilmCardDescriptionTemplate(description);
  const commentsTemplate = createFilmCardCommentsTemplate(film.comments);
  const yearReleaseTemplate = createFilmCardYearReleaseTemplate(release);
  const runtimeTemplate = createFilmCardRuntimeTemplate(runtime);
  const genreTemplate = createFilmCardGenreTemplate(genre);

  return (
    `<article class="film-card" data-id="${id}">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
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
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }
}
