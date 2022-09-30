import Observable from '../framework/observable';
import {generateComment} from '../mock/comment.js';
import {MAX_COMMENTS_COUNT} from '../const.js';

/**
 * Модель рыба для комментариев к фильмам
 */
export default class CommentsModel extends Observable {
  #comments = Array.from({length: MAX_COMMENTS_COUNT}, generateComment);

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
  addComment = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  };

  /**
   * Метод для удаления комментария из модели
   * @param updateType
   * @param update
   */
  deleteComment = (updateType, update) => {
    const index = this.comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1)
    ];

    this._notify(updateType, this.comments);
  };
}
