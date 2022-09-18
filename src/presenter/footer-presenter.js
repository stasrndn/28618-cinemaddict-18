import FooterStatisticsView from '../view/footer-statistics-view';
import {render} from '../framework/render';

export default class FooterPresenter {
  /**
   * Контейнер подвала документа (footer)
   * @type {null}
   */
  #footerContainer = null;

  constructor(container) {
    this.#footerContainer = container.querySelector('.footer');
  }

  /**
   * Инициализация презентера
   */
  init = () => {
    const footerStatisticsComponent = new FooterStatisticsView();
    render(footerStatisticsComponent, this.#footerContainer);
  };
}
