import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const';
import {isLinkClicked} from '../utils';

const createSortFilterTemplate = (sortType) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button ${sortType === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${sortType === SortType.DATE ? 'sort__button--active' : ''}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${sortType === SortType.RATING ? 'sort__button--active' : ''}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`
);

export default class SortFilterView extends AbstractView {
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
