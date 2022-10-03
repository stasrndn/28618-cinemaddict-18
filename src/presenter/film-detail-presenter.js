import FilmDetailsView from '../view/film-details-view.js';
import {remove, render, replace} from '../framework/render.js';
import {UpdateType} from '../const';

export default class FilmDetailPresenter {
  /**
   * Контейнер всплывающего окна
   * @type {null}
   */
  #popupContainer = null;

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
   * Информация о текущем фильме
   * @type {null}
   */
  #film = null;

  constructor(popupContainer, filmChangeHandler, filmDetailDeleteHandler) {
    this.#popupContainer = popupContainer;
    this.#filmChangeHandler = filmChangeHandler;
    this.#filmDetailDeleteHandler = filmDetailDeleteHandler;
  }

  /**
   * Инициализация film detail презентера
   * @param film
   * @param models
   */
  init = (film, models) => {
    this.#film = film;
    this.#models.filmsModel = models.filmsModel;

    this.#renderFilmDetailsComponent();
  };

  /**
   * Удаление всплывающего окна с фильмом
   */
  destroy = () => {
    if (this.#filmDetailsComponent !== null) {
      this.#filmDetailsComponent = null;
    }
  };

  /**
   * Эффект потряхивания компонента
   */
  shakeControls = () => {
    this.#filmDetailsComponent.shakeControls();
  };

  /**
   * Отрисовать всплывающее окно с фильмом
   */
  #renderFilmDetailsComponent = () => {
    this.#models.filmsModel.addObserver(this.#handleModelEvent);

    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmDetailsComponent = new FilmDetailsView(this.#film);
    this.#filmDetailsComponent.setFilmChangeHandler(this.#filmChangeHandler);
    this.#filmDetailsComponent.setFilmDetailDeleteHandler(this.#filmDetailDeleteHandler);

    if (prevFilmDetailsComponent === null) {
      render(this.#filmDetailsComponent, this.#popupContainer);
      return;
    }

    replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
    remove(prevFilmDetailsComponent);
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmDetailsComponent?.updateData(data);
        break;
    }
  };
}
