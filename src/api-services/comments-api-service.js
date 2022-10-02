import ApiService from '../framework/api-service.js';
import {Method} from '../const.js';

export default class CommentsApiService extends ApiService {
  /**
   * Получение комментариев к фильму
   * @param film
   * @returns {Promise<Response>}
   */
  get = (film) => this
    ._load({url: `comments/${film.id}`})
    .then(ApiService.parseResponse).catch(() => null);

  /**
   * Удаление комментария по его id
   * @param comment
   * @returns {Promise<Response>}
   */
  deleteComment = async (comment) => await this._load({
    url: `comments/${comment.id}`,
    method: Method.DELETE,
  });

  /**
   * Добавляет комментарий к фильму
   * @param comment
   * @param film
   * @returns {Promise<JSON>}
   */
  addComment = async (comment, film) => {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  };
}
