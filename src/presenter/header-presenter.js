import HeaderProfileView from '../view/header-profile-view.js';
import {remove, render, replace} from '../framework/render.js';

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

  /**
   * Компонент профиля
   * @type {null}
   */
  #headerProfileComponent = null;

  constructor(container, models) {
    this.#headerContainer = container.querySelector('.header');

    this.#models.filmsModel = models.filmsModel;
    this.#models.filmsModel.addObserver(this.#handleModelEvent);
  }

  /**
   * Инициализация презентера
   */
  init = () => {
    if (!this.#models.filmsModel.films.length) {
      return;
    }

    const prevHeaderProfileComponent = this.#headerProfileComponent;

    this.#headerProfileComponent = new HeaderProfileView();

    if (prevHeaderProfileComponent === null) {
      render(this.#headerProfileComponent, this.#headerContainer);
      return;
    }

    replace(this.#headerProfileComponent, prevHeaderProfileComponent);
    remove(prevHeaderProfileComponent);
  };

  /**
   * Обработчик на изменение в модели фильмов
   */
  #handleModelEvent = () => {
    this.init();
  };
}
