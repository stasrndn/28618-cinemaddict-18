import { createElement } from '../render.js';
import dayjs from 'dayjs';

/**
 * Шаблон блока с постером фильма
 * @param poster
 * @returns {string}
 */
const createFilmDetailsPosterTemplate = (poster) => (
  `${poster.length ? `<img class="film-details__poster-img" src="${poster}" alt="">` : ''}`
);

/**
 * Шаблон блока с рейтингом фильма
 * @param totalRating
 * @returns {string}
 */
const createFilmDetailsTotalRatingTemplate = (totalRating) => (
  `<div class="film-details__rating">
    <p class="film-details__total-rating">${totalRating}</p>
  </div>`
);

/**
 * Шаблон блока с названием фильма
 * @param title
 * @returns {string}
 */
const createFilmDetailsTitleTemplate = (title) => (
  `${title.length
    ? `<h3 class="film-details__title">${title}</h3>`
    : ''}`
);

/**
 * Шаблон блока с оригинальным названием фильма
 * @param alternativeTitle
 * @returns {string}
 */
const createFilmDetailsAlternativeTitleTemplate = (alternativeTitle) => (
  `${alternativeTitle.length
    ? `<p class="film-details__title-original">Original: ${alternativeTitle}</p>`
    : ''}`
);

/**
 * Шаблон блока с режиссёром фильма
 * @param director
 * @returns {string}
 */
const createFilmDetailsDirectorTemplate = (director) => (
  `${director.length
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
  `${writers.length
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
  `${actors.length
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
  `${release.date.length
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
  `${runtime.length
    ? `<tr class="film-details__row">
          <td class="film-details__term">Runtime</td>
          <td class="film-details__cell">${runtime}</td>
       </tr>`
    : ''}`
);

/**
 * Шаблон блока с жанрами фильма
 * @param genres
 * @returns {string}
 */
const createFilmDetailsGenresTemplate = (genres) => (
  `${genres.length
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
  `${release.releaseCountry.length
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
  `${description.length
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

/**
 * Шаблон блока заголовка комментариев
 * @param comments
 * @returns {string}
 */
const createFilmDetailsCommentsTitleTemplate = (comments) => (
  `<h3 class="film-details__comments-title">Comments ${comments.length
    ? `<span class="film-details__comments-count">${comments.length}</span>`
    : ''}</h3>`
);

/**
 * Шаблон блока списка комментариев
 * @param comments
 * @returns {string}
 */
const createFilmDetailsCommentsListTemplate = (comments) => (
  `<ul class="film-details__comments-list">
        ${comments.map((item) => {
    const {author, comment, date, emotion} = item;
    return (
      `<li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
                </span>
                <div>
                  <p class="film-details__comment-text">${comment}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${author}</span>
                    <span class="film-details__comment-day">${date}</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>`
    );
  }).join('')}
     </ul>`
);

/**
 * Возвращает комментарии к выбранному фильму
 * @param comments
 * @param filmCommentsIds
 * @returns {*}
 */
const getContentFilmComments = (comments, filmCommentsIds) => {
  let selectedComments = comments.filter((comment) => filmCommentsIds.includes(comment.id));

  selectedComments = selectedComments.map((item) => {
    const {author, comment, date, emotion} = item;
    return ({
      author,
      comment,
      date: dayjs(date).format('YYYY/MM/DD HH:mm'),
      emotion
    });
  });

  return selectedComments;
};

const createFilmDetailsTemplate = (film, comments) => {

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
  } = film.filmInfo;

  const contentFilmComments = getContentFilmComments(comments, film.comments);

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
  const commentsTitleTemplate = createFilmDetailsCommentsTitleTemplate(film.comments);
  const commentsListTemplate = createFilmDetailsCommentsListTemplate(contentFilmComments);

  return (`
    <section class="film-details">
        <div class="film-details__inner">
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
          <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          ${commentsTitleTemplate}
          ${commentsListTemplate}
          <form class="film-details__new-comment" action="" method="get">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </form>
        </section>
      </div>
    </div>
    </section>
  `);
};

export default class FilmDetailsView {
  constructor(film, comments) {
    this.film = film;
    this.comments = comments;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this.film, this.comments);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
