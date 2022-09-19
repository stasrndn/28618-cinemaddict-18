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

  constructor(container) {
    this.#container = container;
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
    this.#filmDetailsComponent.setCloseButtonClickHandler(this.#onClickCloseButton);

    render(this.#filmDetailsComponent, this.#container);
  };

  /**
   * Обработчик клика по кнопке "Закрыть окно" (крестик)
   */
  #onClickCloseButton = () => {
    this.destroy();
  };
}
