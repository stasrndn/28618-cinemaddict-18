import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

/**
 * Модель рыба для комментариев к фильмам
 */
export default class CommentsModel extends Observable {
  #apiService = null;
  #comments = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  init = async (film) => {
    try {
      this.#comments = await this.#apiService.get(film);
      this._notify(UpdateType.INIT, this.comments);
    } catch {
      this.#comments = [];
    }
  };

  /**
   * Метод для получения комментариев
   * @returns {unknown[]}
   */
  get comments() {
    return this.#comments;
  }

  /**
   * Метод для добавления комментария
   * @param updateType
   * @param update
   */
  addComment = async (updateType, update) => {
    try {
      const film = update.film;
      delete update.film;

      const {comments} = await this.#apiService.addComment(update, film);
      this.#comments = comments;
      this._notify(updateType, comments);
    } catch (e) {
      throw new Error('Can\'t add comment');
    }
  };

  /**
   * Метод для удаления комментария из модели
   * @param updateType
   * @param update
   */
  deleteComment = async (updateType, update) => {
    const index = this.comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#apiService.deleteComment(update);

      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1)
      ];

      this._notify(updateType, this.comments);
    } catch {
      throw new Error('Can\'t delete comment');
    }
  };
}
