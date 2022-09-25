import FilmDetailsView from '../view/film-details-view';
import {render} from '../framework/render';

export default class FilmDetailPresenter {
  /**
   * Контейнер документа (body)
   * @type {null}
   */
  #container = null;

  /**
   * Объект с данными фильма
   * @type {null}
   */
  #film = null;

  /**
   * Массив с комментариями
   * @type {null}
   */
  #comments = null;

  /**
   * Компонент всплывающего окна с фильмом
   * @type {null}
   */
  #filmDetailsComponent = null;

  /**
   * Колбек изменения фильма
   * @type {null}
   */
  #filmChangeHandler = null;

  /**
   * Колбек удаления презентера
   * всплывающего окна
   * @type {null}
   */
  #filmDetailDeleteHandler = null;

  constructor(container, filmChangeHandler, filmDetailDeleteHandler) {
    this.#container = container;
    this.#filmChangeHandler = filmChangeHandler;
    this.#filmDetailDeleteHandler = filmDetailDeleteHandler;
  }

  /**
   * Инициализация film detail презентера
   * @param film
   * @param comments
   */
  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;

    this.#renderFilmDetailsComponent();
  };

  /**
   * Удаление всплывающего окна с фильмом
   */
  destroy = () => {
    if (this.#filmDetailsComponent !== null) {
      this.#container.querySelector('.film-details').remove();
      this.#filmDetailsComponent = null;
    }
  };

  /**
   * Отрисовка компонента всплывающего окна с фильмом
   */
  #renderFilmDetailsComponent = () => {
    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments);
    this.#filmDetailsComponent.setFilmChangeHandler(this.#filmChangeHandler);
    this.#filmDetailsComponent.setFilmDetailDeleteHandler(this.#filmDetailDeleteHandler);

    render(this.#filmDetailsComponent, this.#container);
  };
}
