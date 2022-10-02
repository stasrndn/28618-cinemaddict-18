import CommentsView from '../view/comments-view.js';
import {UpdateType, UserAction} from '../const.js';
import {remove, render, replace} from '../framework/render.js';

export default class CommentsPresenter {
  /**
   * Контейнер всплывающего окна
   * @type {null}
   */
  #popupContainer = null;

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
   * Модель комментариев
   * @type {null}
   */
  #commentsModel = null;

  constructor(popupContainer, commentsModel) {
    this.#popupContainer = popupContainer;
    this.#commentsModel = commentsModel;
    this.#commentsModel.addObserver(this.#handleCommentsModelEvent);
  }

  init = (film) => {
    this.#film = film;
    this.#commentsModel.init(film);
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
   * Отрисовка компонента комментариев
   * @param comments
   */
  #renderCommentsComponent = (comments) => {
    const prevCommentsComponent = this.#commentsComponent;
    this.#commentsComponent = new CommentsView(comments);
    this.#commentsComponent.setHandleViewAction(this.#handleViewAction);

    if (prevCommentsComponent === null) {
      render(this.#commentsComponent, this.#popupContainer);
      return;
    }

    replace(this.#commentsComponent, prevCommentsComponent);
    remove(prevCommentsComponent);
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        update.film = this.#film;
        this.#commentsModel.addComment(updateType, update);
        break;
    }
  };

  /**
   * Обработчик изменений в модели комментариев
   * @param updateType
   * @param comments
   */
  #handleCommentsModelEvent = (updateType, comments) => {
    switch (updateType) {
      case UpdateType.INIT:
      case UpdateType.PATCH:
        this.#renderCommentsComponent(comments);
        break;
      case UpdateType.MINOR:
        this.init(this.#film);
        break;
    }
  };
}
