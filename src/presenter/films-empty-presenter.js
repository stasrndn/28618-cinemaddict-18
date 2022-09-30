import FilmsListEmptyView from '../view/films-list-empty-view.js';
import {render} from '../framework/render.js';

export default class FilmsEmptyPresenter {
  /**
   * Контейнер контентной области (main)
   * @type {null}
   */
  #container = null;

  /**
   * Модели данных
   * @type {{filmsModel: null, filterModel: null, commentsModel: null}}
   */
  #models = {
    filmsModel: null,
    filterModel: null,
    commentsModel: null,
  };

  constructor(container, models) {
    this.#container = container;
    this.#models.filmsModel = models.filmsModel;
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
