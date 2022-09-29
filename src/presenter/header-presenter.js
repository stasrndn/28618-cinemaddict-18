import HeaderProfileView from '../view/header-profile-view.js';
import {render} from '../framework/render.js';

export default class HeaderPresenter {
  /**
   * Контейнер заголовка документа (header)
   * @type {null}
   */
  #headerContainer = null;

  /**
   * Модели приложения
   * @type {null}
   */
  #models = null;

  constructor(container, models) {
    this.#headerContainer = container.querySelector('.header');
    this.#models = models;
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
