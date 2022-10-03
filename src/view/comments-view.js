import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {isCtrlEnterPressed} from '../utils/common.js';
import {EMOTIONS_LIST, UpdateType, UserAction} from '../const.js';
import dayjs from 'dayjs';
import he from 'he';

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
 * Шаблон элемента списка комментариев
 * @param comment
 * @returns {string}
 */
const createCommentsListItemTemplate = (comment) => (
  `<li class="film-details__comment" data-comment-id="${comment.id}">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${dayjs(comment.date).format('YYYY/MM/DD HH:mm')}</span>
        <button class="film-details__comment-delete" data-comment-id="${comment.id}" ${comment.isDisabled ? 'disabled' : ''}>
          ${comment.isDeleting ? 'Deleting...' : 'Delete'}
        </button>
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
 * Шаблон поля ввода комментария
 * @param state
 * @returns {string}
 */
const createCommentInputTemplate = (state) => {
  const comment = state.comment;
  const isInputDisabled = state.isDisabled;

  return (`
    <label class="film-details__comment-label">
      <textarea
        class="film-details__comment-input"
        placeholder="Select reaction below and write comment here"
        name="comment"
        ${isInputDisabled ? 'disabled' : ''}
      >${comment ?? ''}</textarea>
    </label>
  `);
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
  const commentInputTemplate = createCommentInputTemplate(state);

  return (`
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        ${commentsTitleTemplate}
        ${commentsListTemplate}

        <form class="film-details__new-comment" action="" method="get" ${state.isSaving ? 'disabled' : ''}>
          <div class="film-details__add-emoji-label">
            ${state.emotion ? `<img src="./images/emoji/${state.emotion}.png" width="55" height="55" alt="emoji-${state.emotion}">` : ''}
          </div>
          ${commentInputTemplate}
          ${emojiListTemplate}
        </form>
      </section>
    </div>
  `);
};

export default class CommentsView extends AbstractStatefulView {
  /**
   * Элемент формы отправки комментария
   * @type {null}
   */
  #newCommentElement = null;

  constructor(comments) {
    super();
    this._state = CommentsView.parseCommentsToState(comments);
    this.#setInnerHandlers();
  }

  get template() {
    return createCommentsTemplate(this._state);
  }

  get comments() {
    return this._state.comments;
  }

  /**
   * Добавляет обработчик изменения в представлении
   * @param callback
   */
  setHandleViewAction = (callback) => {
    this._callback.handleViewAction = callback;
  };

  /**
   * Эффект покачивания головой у комментария
   * @param commentId
   */
  shakeComment = (commentId) => {
    const comment = this.element.querySelector(`.film-details__comment[data-comment-id="${commentId}"]`);
    this.shake.call({element: comment});
  };

  /**
   * Эффект покачивания головой
   * у формы добавления комментария
   */
  shakeFormNewComment = () => {
    this.shake.call({element: this.#newCommentElement});
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  /**
   * Установка внутренних обработчиков
   */
  #setInnerHandlers = () => {
    this.#handleEmojiItems();
    this.#handleCommentItems();
    this.#handleCommentField();
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
   * Установка обработчика на
   * изменение эмоций
   */
  #handleEmojiItems = () => {
    this.#newCommentElement = this.element.querySelector('.film-details__new-comment');
    const emojiItems = this.#newCommentElement?.querySelectorAll('.film-details__emoji-item');

    emojiItems.forEach((item) => {
      item.addEventListener('change', this.#handleEmojiItemChange);
    });
  };

  /**
   * Обработчик удаления комментария
   * @param evt
   */
  #handleCommentItemClick = (evt) => {
    evt.preventDefault();
    const commentToBeDeleted = this.#findCommentToBeDeleted(evt.target.dataset.commentId);
    this._callback.handleViewAction(UserAction.DELETE_COMMENT, UpdateType.PATCH, commentToBeDeleted);
  };

  /**
   * Установка обработчиков
   * на кнопки удаления комментариев
   */
  #handleCommentItems = () => {
    const commentItems = this.element.querySelectorAll('.film-details__comment-delete');

    commentItems.forEach((item) => {
      item.addEventListener('click', this.#handleCommentItemClick);
    });
  };

  /**
   * Обработчик поля ввода комментария
   * @param evt
   */
  #handleCommentInput = (evt) => {
    evt.preventDefault();
    this._state.comment = evt.target.value;
  };

  #handleCommentKeydown = (evt) => {
    if (isCtrlEnterPressed(evt)) {
      evt.preventDefault();
      this._callback.handleViewAction(UserAction.ADD_COMMENT, UpdateType.MINOR, this.#parseLocalComment());
    }
  };

  /**
   * Добавление обработчиков
   * на поле добавления комментария
   */
  #handleCommentField = () => {
    const commentInput = this.element.querySelector('.film-details__comment-input');
    commentInput.addEventListener('input', this.#handleCommentInput);
    commentInput.addEventListener('keydown', this.#handleCommentKeydown);
  };

  /**
   * Найти удаляемый объект комментария
   * @param id
   * @returns {*}
   */
  #findCommentToBeDeleted = (id) => {
    const comments = CommentsView.parseStateToComments(this._state);
    const index = comments.findIndex((comment) => comment.id === id);

    return comments[index];
  };

  /**
   * Сборка объекта комментария перед отправкой в презентер
   * @returns {{emotion: (null|*), comment: (Document.comment|null|*)}}
   */
  #parseLocalComment = () => ({
    comment: this._state.comment,
    emotion: this._state.emotion,
  });

  /**
   * Преобразование данных в стейт
   * @param comments
   * @returns {{comments}}
   */
  static parseCommentsToState = (comments) => ({
    comments: comments.map((comment) => ({
      ...comment,
      isDeleting: false,
      isDisabled: false,
    })),
    emotion: null,
    comment: null,
    isSaving: false,
    isDisabled: false,
  });

  /**
   * Преобразование данных из стейта обратно
   * @param state
   * @returns {*[]}
   */
  static parseStateToComments = (state) => [...state.comments];
}
