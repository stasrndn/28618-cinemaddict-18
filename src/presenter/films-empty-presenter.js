import FilmsListEmptyView from '../view/films-list-empty-view';
import {render} from '../framework/render';

export default class FilmsEmptyPresenter {
  /**
   * Контейнер контентной области (main)
   * @type {null}
   */
  #container = null;

  constructor(container) {
    this.#container = container;
  }

  init = () => {
    this.#renderFilmsListEmptyComponent();
  };

  #renderFilmsListEmptyComponent = () => {
    const filmsListEmptyComponent = new FilmsListEmptyView();
    render(filmsListEmptyComponent, this.#container);
  };
}
