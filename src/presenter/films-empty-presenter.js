import FilmsListEmptyView from '../view/films-list-empty-view.js';
import {render} from '../framework/render.js';

export default class FilmsEmptyPresenter {
  /**
   * Контейнер контентной области (main)
   * @type {null}
   */
  #container = null;

  /**
   * Модели
   * @type {null}
   */
  #models = null;

  constructor(container, models) {
    this.#container = container;
    this.#models = models;
  }

  init = () => {
    const filmsCount = this.#models.filmsModel.films.length;

    if (filmsCount) {
      return;
    }

    const filmsListEmptyComponent = new FilmsListEmptyView();
    render(filmsListEmptyComponent, this.#container);
  };
}
