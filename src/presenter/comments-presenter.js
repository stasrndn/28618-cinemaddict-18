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

  /**
   * Блокировщик интерфейса
   * @type {null}
   */
  #uiBlocker = null;

  constructor(popupContainer, commentsModel, uiBlocker) {
    this.#popupContainer = popupContainer;
    this.#commentsModel = commentsModel;
    this.#uiBlocker = uiBlocker;

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
   * Установить статус удаления у комментария
   * @param id
   */
  setDeleting = (id) => {
    this.#commentsComponent.updateElement({
      comments: this.#commentsComponent.comments.map((comment) => {
        if (id === comment.id) {
          return {
            ...comment,
            isDeleting: true,
            isDisabled: true,
          };
        }
        return comment;
      })
    });
  };

  /**
   * Установить статус отмены удаления при ошибке
   * @param id
   */
  setAborting = (id) => {
    this.#commentsComponent.updateElement({
      comments: this.#commentsComponent.comments.map((comment) => {
        if (id === comment.id) {
          return {
            ...comment,
            isDeleting: false,
            isDisabled: false,
          };
        }
        return comment;
      })
    });

    this.#commentsComponent.shakeComment(id);
  };

  /**
   * Установить статус отправления комментария
   */
  setAdding = () => {
    this.#commentsComponent.updateElement({
      isSaving: true,
      isDisabled: true,
    });
  };

  /**
   * Удаления статуса отправления нового комментария
   */
  setAddingAborting = () => {
    this.#commentsComponent.updateElement({
      isSaving: false,
      isDisabled: false,
    });

    this.#commentsComponent.shakeFormNewComment();
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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.DELETE_COMMENT:
        try {
          this.setDeleting(update.id);
          await this.#commentsModel.deleteComment(updateType, update);
        } catch (e) {
          this.setAborting(update.id);
        }
        break;
      case UserAction.ADD_COMMENT:
        try {
          this.setAdding();
          update.film = this.#film;
          await this.#commentsModel.addComment(updateType, update);
        } catch (e) {
          this.setAddingAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
