import FilmCardView from '../view/film-card-view';
import {remove, render, replace} from '../framework/render';

export default class FilmCardPresenter {
  /**
   * Контейнер для отображения фильма
   * @type {null}
   */
  #filmsListContainer = null;

  /**
   * Обработчик клика по карточке фильма
   * @type {null}
   */
  #filmCardClickHandler = null;

  /**
   * Обработчик изменения фильма
   * @type {null}
   */
  #filmChangeHandler = null;

  /**
   * Компонент карточки фильма
   * @type {null}
   */
  #filmCardComponent = null;

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

  constructor(filmsListContainer, filmCardClickHandler, filmChangeHandler) {
    this.#filmsListContainer = filmsListContainer;
    this.#filmCardClickHandler = filmCardClickHandler;
    this.#filmChangeHandler = filmChangeHandler;
  }

  /**
   * Инициализация film-card презентера
   * @param film
   * @param comments
   */
  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;

    this.#filmCardComponent = new FilmCardView(film);

    this.#filmCardComponent.setFilmCardClickHandler(this.#onClickFilmCard);
    this.#filmCardComponent.setAddToWatchlistButtonClickHandler(this.#onClickAddToWatchlistButton);
    this.#filmCardComponent.setMarkAsWatchedButtonClickHandler(this.#onClickMarkAsWatchedButton);
    this.#filmCardComponent.setMarkAsFavoriteButtonClickHandler(this.#onClickMarkAsFavoriteButton);

    render(this.#filmCardComponent, this.#filmsListContainer);
  };

  /**
   * Перерисовывает карточку фильма
   * @param updatedFilm
   */
  rerender = (updatedFilm) => {
    const updatedFilmCardComponent = new FilmCardView(updatedFilm);

    updatedFilmCardComponent.setFilmCardClickHandler(this.#onClickFilmCard);
    updatedFilmCardComponent.setAddToWatchlistButtonClickHandler(this.#onClickAddToWatchlistButton);
    updatedFilmCardComponent.setMarkAsWatchedButtonClickHandler(this.#onClickMarkAsWatchedButton);
    updatedFilmCardComponent.setMarkAsFavoriteButtonClickHandler(this.#onClickMarkAsFavoriteButton);

    replace(updatedFilmCardComponent, this.#filmCardComponent);

    this.#filmCardComponent = updatedFilmCardComponent;
  };

  /**
   * Удаляет компонент:
   * - удаление экземпляра
   * - удаление представления из DOM-дерева
   */
  destroy = () => {
    remove(this.#filmCardComponent);
  };

  /**
   * Обработчик клика на карточке фильма
   */
  #onClickFilmCard = () => {
    this.#filmCardClickHandler(this.#film, this.#comments);
  };

  /**
   * Обработчик клика на кнопке "Добавить в список просмотра"
   */
  #onClickAddToWatchlistButton = () => {
    this.#film.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#filmChangeHandler(this.#film);
  };

  /**
   * Обработчик клика на кнопке "Пометить просмотренным"
   */
  #onClickMarkAsWatchedButton = () => {
    this.#film.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#filmChangeHandler(this.#film);
  };

  /**
   * Обработчик клика на кнопке "Добавить в избранное"
   */
  #onClickMarkAsFavoriteButton = () => {
    this.#film.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#filmChangeHandler(this.#film);
  };
}
