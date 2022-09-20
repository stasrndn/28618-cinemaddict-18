import HeaderProfileView from '../view/header-profile-view';
import {render} from '../framework/render';

export default class HeaderPresenter {
  /**
   * Контейнер заголовка документа (header)
   * @type {null}
   */
  #headerContainer = null;

  constructor(container) {
    this.#headerContainer = container.querySelector('.header');
  }

  /**
   * Инициализация презентера
   */
  init = () => {
    const headerProfileComponent = new HeaderProfileView();
    render(headerProfileComponent, this.#headerContainer);
  };
}
