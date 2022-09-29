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
   * Метод для получения по их id
   * @param entities - массив id комментариев
   * @returns {*[]}
   */
  getCommentsById = (entities) => this.comments.filter((comment) => entities.includes(comment.id));
}
