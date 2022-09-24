import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {EMOTIONS_LIST} from '../const';
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
 * Шаблон элемента в блоке эмоций в форме добавления комментария
 * @param item
 * @param emotion
 * @returns {string}
 */
const createFilmDetailsEmojiListItemTemplate = (item, emotion) => (
  `
    <input
      class="film-details__emoji-item visually-hidden"
      name="comment-emoji"
      type="radio"
      id="emoji-${item}"
      value="${item}"
      ${item === emotion ? 'checked' : ''}
    >
    <label
      class="film-details__emoji-label"
      for="emoji-${item}"
    >
      <img
        src="./images/emoji/${item}.png"
        width="30" height="30"
        alt="emoji"
      >
    </label>
  `
);

/**
 * Шаблон блока эмоций в форме добавления комментария
 * @param emotion
 * @returns {string}
 */
const createFilmDetailsEmojiListTemplate = (emotion) => {
  const filmDetailsEmojiListTemplate = EMOTIONS_LIST
    .map((item) => createFilmDetailsEmojiListItemTemplate(item, emotion))
    .join('');

  return `
    <div class="film-details__emoji-list">
      ${filmDetailsEmojiListTemplate}
    </div>
  `;
};

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

const createFilmDetailsTemplate = (film, comments, state) => {

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

  const {watchlist, alreadyWatched, favorite} = film.userDetails;

  const contentFilmComments = getContentFilmComments(comments, film.comments);

  const emotion = state.emotion ?? null;

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
  const emojiListTemplate = createFilmDetailsEmojiListTemplate(emotion);

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
          <button type="button" class="film-details__control-button ${watchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">
            ${watchlist ? 'Added' : 'Add'} to watchlist
          </button>
          <button type="button" class="film-details__control-button ${alreadyWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">
            ${alreadyWatched ? 'Already watched' : 'Not Viewed'}
          </button>
          <button type="button" class="film-details__control-button ${favorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">
            ${favorite ? 'Added' : 'Add'} to favorites
          </button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          ${commentsTitleTemplate}
          ${commentsListTemplate}
          <form class="film-details__new-comment" action="" method="get">
            <div class="film-details__add-emoji-label">
              ${emotion !== null ? `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">` : ''}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            ${emojiListTemplate}
          </form>
        </section>
      </div>
    </div>
    </section>
  `);
};

export default class FilmDetailsView extends AbstractStatefulView {
  /**
   * Данные фильма
   * @type {null}
   */
  #film = null;

  /**
   * Общий список комментариев
   * @type {null}
   */
  #comments = null;

  /**
   * Кнопка закрытия всплывающего окна
   * @type {null}
   */
  #closeButton = null;

  /**
   * Кнопка "Добавить к просмотру"
   * @type {null}
   */
  #watchListButton = null;

  /**
   * Кнопка "Отметить просмотренным"
   * @type {null}
   */
  #watchedButton = null;

  /**
   * Кнопка "Добавить в избранное"
   * @type {null}
   */
  #favoriteButton = null;

  /**
   * Форма добавления нового комментария
   * @type {null}
   */
  #newCommentElement = null;

  /**
   * Область добавления эмоции в форме комментария
   * @type {null}
   */
  #addEmojiElement = null;

  /**
   * Поле ввода текста комментария
   * @type {null}
   */
  #commentInputElement = null;

  /**
   * Радиокнопки эмоций
   * @type {null}
   */
  #emojiItems = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;

    this.#closeButton = this.element.querySelector('.film-details__close-btn');
    this.#watchListButton = this.element.querySelector('#watchlist');
    this.#watchedButton = this.element.querySelector('#watched');
    this.#favoriteButton = this.element.querySelector('#favorite');

    this.#setFormCommentElements();
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this.#film, this.#comments, this._state);
  }

  /**
   * Установить обработчик по клику на кнопке закрытия
   * @param callback
   */
  setCloseButtonClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;
    this.#closeButton.addEventListener('click', this.#closeButtonClickHandler);
  };

  /**
   * Установить обработчик на кнопку "Добавить к просмотру"
   * @param callback
   */
  setAddToWatchlistButtonClickHandler = (callback) => {
    this._callback.addToWatchlistButtonClick = callback;
    this.#watchListButton.addEventListener('click', this.#addToWatchlistButtonClickHandler);
  };

  /**
   * Установить обработчик на кнопку "Просмотрен"
   * @param callback
   */
  setMarkAsWatchedButtonClickHandler = (callback) => {
    this._callback.markAsWatchedButtonClick = callback;
    this.#watchedButton.addEventListener('click', this.#markAsWatchedButtonClickHandler);
  };

  /**
   * Установить обработчик на кнопку "Добавить в избранное"
   * @param callback
   */
  setMarkAsFavoriteButtonClickHandler = (callback) => {
    this._callback.markAsFavoriteButtonClick = callback;
    this.#favoriteButton.addEventListener('click', this.#markAsFavoriteButtonClickHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setFilmDetailsPosition(this._state.position);
  };

  /**
   * Установить позицию скролла после перерисовки
   * @param position
   */
  #setFilmDetailsPosition = (position) => {
    this.element.scrollTo(position.x, position.y);
  };

  /**
   * Вызов обработчика клика по кнопке
   * @param evt
   */
  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeButtonClick();
  };

  /**
   * Вызов обработчика клика на кнопке "Добавить к просмотру"
   * @param evt
   */
  #addToWatchlistButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchlistButtonClick();
  };

  /**
   * Вызов обработчика клика на кнопке "Просмотрен"
   * @param evt
   */
  #markAsWatchedButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.markAsWatchedButtonClick();
  };

  /**
   * Вызов обработчика клика на кнопке "Добавить в избранное"
   * @param evt
   */
  #markAsFavoriteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.markAsFavoriteButtonClick();
  };

  /**
   * Получение элементов формы комментариев
   */
  #setFormCommentElements = () => {
    this.#newCommentElement = this.element.querySelector('.film-details__new-comment');
    this.#addEmojiElement = this.#newCommentElement.querySelector('.film-details__add-emoji-label');
    this.#commentInputElement = this.#newCommentElement.querySelector('.film-details__comment-input');
    this.#emojiItems = this.#newCommentElement.querySelectorAll('.film-details__emoji-item');
  };

  /**
   * Установка внутренних обработчиков
   */
  #setInnerHandlers = () => {
    this.#setEmojiItemsHandler();
  };

  /**
   * Обработчик по клику на эмоцию в форме
   * @param evt
   */
  #emojiItemChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      emotion: evt.target.value,
      position: {x: 0, y: this.element.scrollTop},
    });
  };

  /**
   * Установщик обработчика на изменение
   * эмоций
   */
  #setEmojiItemsHandler = () => {
    this.#setFormCommentElements();
    this.#emojiItems.forEach((item) => {
      item.addEventListener('change', this.#emojiItemChangeHandler);
    });
  };
}
