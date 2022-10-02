import FooterStatisticsView from '../view/footer-statistics-view.js';
import {remove, render, replace} from '../framework/render.js';

export default class FooterPresenter {
  /**
   * Контейнер подвала документа (footer)
   * @type {null}
   */
  #footerContainer = null;

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
   * Компонент со статистикой по фильмам
   * @type {null}
   */
  #footerStatisticsComponent = null;

  constructor(container, models) {
    this.#footerContainer = container.querySelector('.footer');

    this.#models.filmsModel = models.filmsModel;
    this.#models.filmsModel.addObserver(this.#handleModelEvent);
  }

  /**
   * Инициализация презентера
   */
  init = () => {
    const filmsCount = this.#models.filmsModel.films.length;
    const prevFooterStatisticsComponent = this.#footerStatisticsComponent;

    this.#footerStatisticsComponent = new FooterStatisticsView(filmsCount);

    if (prevFooterStatisticsComponent === null) {
      render(this.#footerStatisticsComponent, this.#footerContainer);
      return;
    }

    replace(this.#footerStatisticsComponent, prevFooterStatisticsComponent);
    remove(prevFooterStatisticsComponent);
  };

  /**
   * Обработчик на изменение в модели фильмов
   */
  #handleModelEvent = () => {
    this.init();
  };
}
