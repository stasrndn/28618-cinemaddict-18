import SortFilterView from '../view/sort-filter-view';
import {render, RenderPosition, replace} from '../framework/render';

export default class SortPresenter {
  /**
   * Контейнер контентной области (main)
   * @type {null}
   */
  #container = null;

  /**
   * Компонент сортировки
   * @type {null}
   */
  #sortFilterComponent = null;

  /**
   * Обработчик сортировки фильмов
   * @type {null}
   */
  #sortTypeChangeHandler = null;

  constructor(container, sortTypeChangeHandler) {
    this.#container = container;
    this.#sortTypeChangeHandler = sortTypeChangeHandler;
  }

  init = (sortType) => {
    this.#sortFilterComponent = new SortFilterView(sortType);
    this.#sortFilterComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortFilterComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  /**
   * Перерисовывает компонент сортировки
   * @param sortType
   */
  rerender = (sortType) => {
    const sortFilterComponent = new SortFilterView(sortType);
    sortFilterComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    replace(sortFilterComponent, this.#sortFilterComponent);
    this.#sortFilterComponent = sortFilterComponent;
  };

  /**
   * Проксирует обработчик сортировки
   * @param sortType
   */
  #handleSortTypeChange = (sortType) => {
    this.#sortTypeChangeHandler(sortType);
  };
}
