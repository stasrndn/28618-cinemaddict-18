import SortFilterView from '../view/sort-filter-view';
import {render} from '../framework/render';

export default class SortPresenter {
  /**
   * Контейнер контентной области (main)
   * @type {null}
   */
  #container = null;

  constructor(container) {
    this.#container = container;
  }

  init = () => {
    this.#renderSortFilterComponent();
  };

  #renderSortFilterComponent = () => {
    const sortFilterComponent = new SortFilterView();
    render(sortFilterComponent, this.#container);
  };
}
