import CommentsView from '../view/comments-view.js';
import {remove, render, replace} from '../framework/render.js';

export default class CommentsPresenter {
  /**
   * Контейнер всплывающего окна
   * @type {null}
   */
  #popupContainer = null;

  /**
   * Комментарии
   * @type {null}
   */
  #comments = null;

  /**
   * Выбранный фильм
   * @type {null}
   */
  #film = null;

  /**
   * Компонент комментариев
   * @type {null}
   */
  #commentsComponent = null;

  /**
   * Обработчик изменения модели
   * @type {null}
   */
  #handleViewAction = null;

  constructor(popupContainer, handleViewAction) {
    this.#popupContainer = popupContainer;
    this.#handleViewAction = handleViewAction;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;

    const prevCommentsComponent = this.#commentsComponent;

    this.#commentsComponent = new CommentsView(this.#getRelatedComments());
    this.#commentsComponent.setHandleViewAction(this.#handleViewAction);

    if (prevCommentsComponent === null) {
      render(this.#commentsComponent, this.#popupContainer);
      return;
    }

    replace(this.#commentsComponent, prevCommentsComponent);
    remove(prevCommentsComponent);
  };

  /**
   * Удаление компонента
   */
  destroy = () => {
    if (this.#commentsComponent !== null) {
      this.#commentsComponent = null;
    }
  };

  /**
   * Получить комментарии, отфильтрованные по id
   * @returns {*[]}
   */
  #getRelatedComments = () => this.#comments.filter((comment) => this.#film.comments.includes(comment.id));
}
