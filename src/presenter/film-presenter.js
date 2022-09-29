import FilmView from '../view/film-view.js';
import {remove, render, replace} from '../framework/render.js';

export default class FilmPresenter {
  /**
   * Контейнер для отображения фильма
   * @type {null}
   */
  #filmsListContainer = null;

  /**
   * Компонент карточки фильма
   * @type {null}
   */
  #filmComponent = null;

  /**
   * Обработчик клика по карточке фильма
   * @type {null}
   */
  #handleFilmClick = null;

  /**
   * Обработчик изменения фильма
   * @type {null}
   */
  #handleViewAction = null;

  constructor(filmsListContainer, handleFilmClick, handleViewAction) {
    this.#filmsListContainer = filmsListContainer;
    this.#handleFilmClick = handleFilmClick;
    this.#handleViewAction = handleViewAction;
  }

  /**
   * Инициализация film-card презентера
   * @param film
   */
  init = (film) => {
    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmView(film);
    this.#filmComponent.setHandleFilmClick(this.#handleFilmClick);
    this.#filmComponent.setHandleViewAction(this.#handleViewAction);

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmsListContainer);
      return;
    }

    replace(this.#filmComponent, prevFilmComponent);
    remove(prevFilmComponent);
  };

  /**
   * Удаляет компонент:
   * - удаление экземпляра
   * - удаление представления из DOM-дерева
   */
  destroy = () => {
    remove(this.#filmComponent);
  };
}
