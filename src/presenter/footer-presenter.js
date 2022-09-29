import FooterStatisticsView from '../view/footer-statistics-view.js';
import {render} from '../framework/render.js';

export default class FooterPresenter {
  /**
   * Контейнер подвала документа (footer)
   * @type {null}
   */
  #footerContainer = null;

  /**
   * Модели приложения
   * @type {null}
   */
  #models = null;

  constructor(container, models) {
    this.#footerContainer = container.querySelector('.footer');
    this.#models = models;
  }

  /**
   * Инициализация презентера
   */
  init = () => {
    const filmsCount = this.#models.filmsModel.films.length;
    const footerStatisticsComponent = new FooterStatisticsView(filmsCount);
    render(footerStatisticsComponent, this.#footerContainer);
  };
}
