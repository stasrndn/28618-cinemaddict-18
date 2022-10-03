import AbstractView from '../framework/view/abstract-view.js';
import {isFilterItemClick} from '../utils/common.js';
import {getFilterType} from '../utils/filter.js';

/**
 * Формирует шаблон элемента фильтра
 * @param filter
 * @param currentFilterType
 * @returns {string}
 */
const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (`
    <a
      href="#${type}"
      class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}"
      data-filter-type="${type}"
    >
        ${name} ${type !== 'all' ? `<span class="main-navigation__item-count">${count}</span>` : ''}
    </a>
  `);
};

/**
 * Формирует шаблон фильтра
 * @param filterItems
 * @param currentFilterType
 * @returns {string}
 */
const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `
    <nav class="main-navigation">
      ${filterItemsTemplate}
    </nav>
  `;
};

export default class FilterView extends AbstractView {
  /**
   * Отфильтрованные фильмы
   * @type {null}
   */
  #filters = null;

  /**
   * Текущий фильтр
   * @type {null}
   */
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  /**
   * Установить обработчик на клик по ссылке в фильтре
   * @param callback
   */
  setFilterTypeClickHandler = (callback) => {
    this._callback.filterTypeClick = callback;
    this.element.addEventListener('click', this.filterTypeClickHandler);
  };

  /**
   * Обработчик на клик по ссылке в фильтре
   * @param evt
   */
  filterTypeClickHandler = (evt) => {
    if (!isFilterItemClick(evt)) {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeClick(getFilterType(evt));
  };
}
