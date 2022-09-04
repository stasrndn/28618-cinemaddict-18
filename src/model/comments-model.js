import {generateComment} from '../mock/comment.js';
import {MAX_COMMENTS_COUNT} from '../const.js';

/**
 * Модель рыба для комментариев к фильмам
 */
export default class CommentsModel {
  #comments = Array.from({length: MAX_COMMENTS_COUNT}, generateComment);

  /**
   * Возвращает все комментарии
   * @returns {[]}
   */
  getComments = () => this.#comments;
}
