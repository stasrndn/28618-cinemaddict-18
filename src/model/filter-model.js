import Observable from '../framework/observable.js';
import {FilterType} from '../const.js';

export default class FilterModel extends Observable {
  #filter = FilterType.ALL;

  /**
   * Метод для получения текущего фильтра
   * @returns {string}
   */
  get filter() {
    return this.#filter;
  }

  /**
   * Метод для установки фильтра
   * @param updateType
   * @param filter
   */
  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}
