import FilmsView from '../view/films-view';
import {render} from '../framework/render';

export default class FilmsPresenter {
  /**
   * Контейнер контентной области (main)
   * @type {null}
   */
  #container = null;

  /**
   * Компонент для отображения списков фильмов.
   * Является контейнером для всех списков фильмов
   * @type {null}
   */
  #filmsComponent = null;

  constructor(container) {
    this.#container = container;
  }

  /**
   * Инициализация films презентера
   */
  init = () => {
    this.#renderFilmsComponent();
  };

  /**
   * Отрисовка компонента
   * отображения всех списков фильмов
   */
  #renderFilmsComponent = () => {
    this.#filmsComponent = new FilmsView();
    render(this.#filmsComponent, this.#container);
  };

  /**
   * Геттер для получения компонента
   * @returns {null}
   */
  get filmsComponent() {
    return this.#filmsComponent;
  }
}
