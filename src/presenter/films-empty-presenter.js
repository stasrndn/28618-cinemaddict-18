import FilmsListEmptyView from '../view/films-list-empty-view.js';
import {render} from '../framework/render.js';

export default class FilmsEmptyPresenter {
  /**
   * Контейнер контентной области (main)
   * @type {null}
   */
  #container = null;

  /**
   * Модель данных фильмов
   * @type {null}
   */
  #filmsModel = null;

  constructor(container, models) {
    this.#container = container;
    this.#filmsModel = models.filmsModel;
  }

  init = () => {
    const filmsCount = this.#filmsModel?.films.length;

    if (filmsCount) {
      return;
    }

    const filmsListEmptyComponent = new FilmsListEmptyView();
    render(filmsListEmptyComponent, this.#container);
  };
}
