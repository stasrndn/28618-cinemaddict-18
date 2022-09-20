import FilmDetailsView from '../view/film-details-view';
import {render, replace} from '../framework/render';
import FilmCardView from '../view/film-card-view';

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
   * Обработчик изменения фильма
   * @type {null}
   */
  #filmChangeHandler = null;

  constructor(container, filmChangeHandler) {
    this.#container = container;
    this.#filmChangeHandler = filmChangeHandler;
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
   * Перерисовывает содержимое всплывающего окна
   * @param updatedFilm
   */
  rerender = (updatedFilm) => {
    const updatedFilmCardComponent = new FilmDetailsView(updatedFilm, this.#comments);

    updatedFilmCardComponent.setCloseButtonClickHandler(this.#onClickCloseButton);
    updatedFilmCardComponent.setAddToWatchlistButtonClickHandler(this.#onClickAddToWatchlistButton);
    updatedFilmCardComponent.setMarkAsWatchedButtonClickHandler(this.#onClickMarkAsWatchedButton);
    updatedFilmCardComponent.setMarkAsFavoriteButtonClickHandler(this.#onClickMarkAsFavoriteButton);

    replace(updatedFilmCardComponent, this.#filmDetailsComponent);

    this.#filmDetailsComponent = updatedFilmCardComponent;
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
    this.#filmDetailsComponent.setAddToWatchlistButtonClickHandler(this.#onClickAddToWatchlistButton);
    this.#filmDetailsComponent.setMarkAsWatchedButtonClickHandler(this.#onClickMarkAsWatchedButton);
    this.#filmDetailsComponent.setMarkAsFavoriteButtonClickHandler(this.#onClickMarkAsFavoriteButton);

    render(this.#filmDetailsComponent, this.#container);
  };

  /**
   * Обработчик клика по кнопке "Закрыть окно" (крестик)
   */
  #onClickCloseButton = () => {
    this.destroy();
  };

  #onClickAddToWatchlistButton = () => {
    this.#film.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#filmChangeHandler(this.#film);
  };

  #onClickMarkAsWatchedButton = () => {
    this.#film.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#filmChangeHandler(this.#film);
  };

  #onClickMarkAsFavoriteButton = () => {
    this.#film.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#filmChangeHandler(this.#film);
  };
}
