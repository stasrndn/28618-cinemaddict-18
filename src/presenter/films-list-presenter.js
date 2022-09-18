import FilmsListView from '../view/films-list-view';
import FilmsListTitleView from '../view/films-list-title-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardPresenter from './film-card-presenter';
import FilmsListShowMoreButtonView from '../view/films-list-show-more-button-view';
import {FILM_COUNT_PER_STEP} from '../const';
import {render} from '../framework/render';

export default class FilmsListPresenter {
  /**
   * Контейнер для отображения списка фильмов
   * @type {null}
   */
  #filmsContainer = null;

  /**
   * Массив для хранения списка фильмов
   * @type {[]}
   */
  #filmsData = [];

  /**
   * Массив для хранения комментариев
   * @type {[]}
   */
  #commentsData = [];

  /**
   * Компонент оболочки списка фильмов
   * @type {null}
   */
  #filmsListComponent = null;

  /**
   * Компонент контейнера для показа фильмов
   * @type {null}
   */
  #filmsListContainerComponent = null;

  /**
   * Компонент кнопки "Показать ещё"
   * @type {null}
   */
  #filmsListShowMoreButtonComponent = null;

  /**
   * Конструктор films-list презентера
   * @param container
   * @param filmsData
   * @param commentsData
   */
  constructor(container, filmsData, commentsData) {
    this.#filmsContainer = container;
    this.#filmsData = filmsData;
    this.#commentsData = commentsData;
  }

  init = () => {
    this.#renderFilmsListComponent();
    this.#renderFilmsListTitleComponent();
    this.#renderFilmsListContainerComponent();

    this.#renderFilmList();
  };

  /**
   * Отрисовка компонента оболочки списка фильма
   */
  #renderFilmsListComponent = () => {
    this.#filmsListComponent = new FilmsListView();
    render(this.#filmsListComponent, this.#filmsContainer);
  };

  /**
   * Отрисовка компонента заголовка списка
   */
  #renderFilmsListTitleComponent = () => {
    const filmsListTitleComponent = new FilmsListTitleView();
    render(filmsListTitleComponent, this.#filmsListComponent.element);
  };

  /**
   * Отрисовка компонента контейнера для показа фильмов
   */
  #renderFilmsListContainerComponent = () => {
    this.#filmsListContainerComponent = new FilmsListContainerView();
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
  };

  /**
   * Отрисовка компонента кнопки "Показать ещё"
   */
  #renderFilmsListShowMoreButtonComponent = () => {
    this.#filmsListShowMoreButtonComponent = new FilmsListShowMoreButtonView();
    render(this.#filmsListShowMoreButtonComponent, this.#filmsListComponent.element);
  };

  /**
   * Отрисовка карточки фильма
   * @param film
   */
  #renderFilm = (film) => {
    const filmCardPresenter = new FilmCardPresenter(this.#filmsListContainerComponent.element);
    filmCardPresenter.init(film, this.#commentsData);
  };

  /**
   * Отрисовка порции карточек фильмов
   * @param from
   * @param to
   */
  #renderFilms = (from, to) => {
    this.#filmsData
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  };

  /**
   * Отрисовка списка фильмов
   */
  #renderFilmList = () => {
    this.#renderFilms(0, Math.min(this.#filmsData.length, FILM_COUNT_PER_STEP));

    if (this.#filmsData.length > FILM_COUNT_PER_STEP) {
      this.#renderFilmsListShowMoreButtonComponent();
    }
  };
}
