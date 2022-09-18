import FilmCardView from '../view/film-card-view';
import FilmDetailPresenter from './film-detail-presenter';
import MainPresenter from './main-presenter';
import {render} from '../framework/render';

export default class FilmCardPresenter {
  /**
   * Контейнер для отображения фильма
   * @type {null}
   */
  #filmsListContainer = null;

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

  constructor(filmsListContainer) {
    this.#filmsListContainer = filmsListContainer;
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
   * Обработчик клика на карточке фильма
   */
  #onClickFilmCard = () => {
    MainPresenter.filmDetailPresenter?.destroy();

    const filmDetailPresenter = new FilmDetailPresenter();
    filmDetailPresenter.init(this.#film, this.#comments);
  };

  /**
   * Обработчик клика на кнопке "Добавить в список просмотра"
   */
  #onClickAddToWatchlistButton = () => {
    console.log('onClickAddToWatchlistButton');
  };

  /**
   * Обработчик клика на кнопке "Пометить просмотренным"
   */
  #onClickMarkAsWatchedButton = () => {
    console.log('onClickMarkAsWatchedButton');
  };

  /**
   * Обработчик клика на кнопке "Добавить в избранное"
   */
  #onClickMarkAsFavoriteButton = () => {
    console.log('onClickMarkAsFavoriteButton');
  };
}
