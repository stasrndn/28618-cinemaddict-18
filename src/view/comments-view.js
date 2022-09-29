import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {EMOTIONS_LIST} from '../const.js';
import dayjs from 'dayjs';

/**
 * Шаблон элемента в блоке эмоций в форме добавления комментария
 * @param emotion
 * @param selectedEmotion
 * @returns {string}
 */
const createEmojiListItemTemplate = (emotion, selectedEmotion) => (
  `
    <input
      class="film-details__emoji-item visually-hidden"
      name="comment-emoji"
      type="radio"
      id="emoji-${emotion}"
      value="${emotion}"
      ${emotion === selectedEmotion ? 'checked' : ''}
    >
    <label
      class="film-details__emoji-label"
      for="emoji-${emotion}"
    >
      <img
        src="./images/emoji/${emotion}.png"
        width="30"
        height="30"
        alt="emoji"
      >
    </label>
  `
);

/**
 * Шаблон блока эмоций в форме добавления комментария
 * @returns {string}
 */
const createEmojiListTemplate = (selectedEmotion) => {
  const emojiListTemplate = EMOTIONS_LIST
    .map((emotion) => createEmojiListItemTemplate(emotion, selectedEmotion))
    .join('');

  return `
    <div class="film-details__emoji-list">
        ${emojiListTemplate}
    </div>
  `;
};

/**
 * Шаблон заголовка блока с комментариями
 * @param comments
 * @returns {string}
 */
const createCommentsTitleTemplate = (comments) => (
  `<h3 class="film-details__comments-title">
    Comments ${comments.length ? `<span class="film-details__comments-count">${comments.length}</span>` : ''}
  </h3>`
);

/**
 * Шаблон элемента списка комментаев
 * @param comment
 * @returns {string}
 */
const createCommentsListItemTemplate = (comment) => (
  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${dayjs(comment.date).format('YYYY/MM/DD HH:mm')}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
   </li>`
);

/**
 * Шаблон списка комментариев
 * @param comments
 * @returns {string|string}
 */
const createCommentsListTemplate = (comments) => {
  const hasComments = comments.length;
  const commentsListItemsTemplate = hasComments ? comments
    .map((comment) => createCommentsListItemTemplate(comment))
    .join('') : '';

  return hasComments ? `
    <ul class="film-details__comments-list">
      ${commentsListItemsTemplate}
    </ul>
  ` : '';
};

/**
 * Шаблон блока комментариев
 * @param state
 * @returns {string}
 */
const createCommentsTemplate = (state) => {
  const commentsTitleTemplate = createCommentsTitleTemplate(state.comments);
  const commentsListTemplate = createCommentsListTemplate(state.comments);
  const emojiListTemplate = createEmojiListTemplate(state.emotion);

  return (`
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        ${commentsTitleTemplate}
        ${commentsListTemplate}

        <form class="film-details__new-comment" action="" method="get">
          <div class="film-details__add-emoji-label">
            ${state.emotion ? `<img src="./images/emoji/${state.emotion}.png" width="55" height="55" alt="emoji-${state.emotion}">` : ''}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          ${emojiListTemplate}
        </form>
      </section>
    </div>
  `);
};

export default class CommentsView extends AbstractStatefulView {
  constructor(comments) {
    super();
    this._state = CommentsView.parseCommentsToState(comments);
    this.#setInnerHandlers();
  }

  get template() {
    return createCommentsTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  /**
   * Установка внутренних обработчиков
   */
  #setInnerHandlers = () => {
    this.#handleEmojiItems();
  };

  /**
   * Обработчик по клику на эмоцию в форме
   * @param evt
   */
  #handleEmojiItemChange = (evt) => {
    evt.preventDefault();
    this._state.emotion = evt.target.value;
    this.updateElement(this._state);
  };

  /**
   * Установщик обработчика на
   * изменение эмоций
   */
  #handleEmojiItems = () => {
    const newCommentElement = this.element.querySelector('.film-details__new-comment');
    const emojiItems = newCommentElement.querySelectorAll('.film-details__emoji-item');

    emojiItems.forEach((item) => {
      item.addEventListener('change', this.#handleEmojiItemChange);
    });
  };

  static parseCommentsToState = (comments) => ({
    comments: comments
  });
}
