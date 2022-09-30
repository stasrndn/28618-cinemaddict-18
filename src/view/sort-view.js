import AbstractView from '../framework/view/abstract-view.js';
import {SORT_TYPES} from '../const.js';
import {isLinkClicked} from '../utils.js';

/**
 * Формирование разметки пункта сортировки
 * @param sortType
 * @param item
 * @return {string}
 */
const createSortFilterItemTemplate = (sortType, item) => (
  `<li>
    <a href="#"
       class="sort__button ${sortType === item.type ? 'sort__button--active' : ''}"
       data-sort-type="${item.type}"
    >
      ${item.name}
    </a>
   </li>
  `
);

/**
 * Формирование разметки списка пунктов сортировки
 * @param sortType
 * @returns {string}
 */
const createSortFilterTemplate = (sortType) => {
  const sortFilterItemsTemplate = SORT_TYPES
    .map((item) => createSortFilterItemTemplate(sortType, item))
    .join('');

  return `
    <ul class="sort">
      ${sortFilterItemsTemplate}
    </ul>
  `;
};

export default class SortView extends AbstractView {
  /**
   * Текущий тип сортировки
   * @type {null}
   */
  #currentSortType = null;

  constructor(sortType) {
    super();
    this.#currentSortType = sortType;
  }

  get template() {
    return createSortFilterTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  /**
   * Обработчик клика
   * по ссылке в компоненте
   * @param evt
   */
  #sortTypeChangeHandler = (evt) => {
    if (!isLinkClicked(evt)) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
