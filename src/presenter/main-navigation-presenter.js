import MainNavigationView from '../view/main-navigation-view';
import {render} from '../framework/render';

export default class MainNavigationPresenter {
  /**
   * Контейнер контентной области (main)
   * @type {null}
   */
  #container = null;

  constructor(container) {
    this.#container = container;
  }

  init = () => {
    this.#renderMainNavigationComponent();
  };

  #renderMainNavigationComponent = () => {
    const mainNavigationComponent = new MainNavigationView();
    render(mainNavigationComponent, this.#container);
  };
}
