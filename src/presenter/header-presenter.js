import HeaderProfileView from '../view/header-profile-view.js';
import {render} from '../framework/render.js';

export default class HeaderPresenter {
  /**
   * Контейнер заголовка документа (header)
   * @type {null}
   */
  #headerContainer = null;

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
    this.#headerContainer = container.querySelector('.header');
    this.#models.filmsModel = models.filmsModel;
  }

  /**
   * Инициализация презентера
   */
  init = () => {
    if (!this.#models.filmsModel.films.length) {
      return;
    }

    const headerProfileComponent = new HeaderProfileView();
    render(headerProfileComponent, this.#headerContainer);
  };
}
