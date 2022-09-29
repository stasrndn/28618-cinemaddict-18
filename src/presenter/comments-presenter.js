import CommentsView from '../view/comments-view.js';
import {render} from '../framework/render.js';

export default class CommentsPresenter {
  /**
   * Контейнер всплывающего окна
   * @type {null}
   */
  #popupContainer = null;

  /**
   * Модели данных
   * @type {null}
   */
  #models = null;

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

  constructor(popupContainer, models, film) {
    this.#popupContainer = popupContainer;
    this.#models = models;
    this.#film = film;
  }

  init = () => {
    this.#commentsComponent = new CommentsView(this.#getRelatedComments());
    render(this.#commentsComponent, this.#popupContainer);
  };

  destroy = () => {
    if (this.#commentsComponent !== null) {
      this.#commentsComponent = null;
    }
  };

  /**
   * Получить комментарии, отфильтрованные по id
   * @returns {*[]}
   */
  #getRelatedComments = () => this.#models.commentsModel.getCommentsById(this.#film.comments);
}
