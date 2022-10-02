import FilmsListLoadingView from '../view/films-list-loading-view.js';
import {remove, render} from '../framework/render.js';

export default class FilmsListLoadingPresenter {
  /**
   * Контейнер контентной области (main)
   * @type {null}
   */
  #container = null;

  /**
   * Компонент загрузчика
   * @type {null}
   */
  #filmsListLoadingComponent = null;

  constructor(container) {
    this.#container = container;
  }

  init = () => {
    this.#filmsListLoadingComponent = new FilmsListLoadingView();
    render(this.#filmsListLoadingComponent, this.#container);
  };

  destroy = () => {
    if (this.#filmsListLoadingComponent !== null) {
      remove(this.#filmsListLoadingComponent);
    }
  };
}
