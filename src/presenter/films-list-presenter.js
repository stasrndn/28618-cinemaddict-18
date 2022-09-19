import FilmsListView from '../view/films-list-view';
import FilmsListTitleView from '../view/films-list-title-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardPresenter from './film-card-presenter';
import FilmDetailPresenter from './film-detail-presenter';
import FilmsListShowMoreButtonView from '../view/films-list-show-more-button-view';
import {FILM_COUNT_PER_STEP} from '../const';
import {render} from '../framework/render';
import {isEscapeKey} from '../utils';

export default class FilmsListPresenter {
  /**
   * Контейнер документа (body)
   * @type {null}
   */
  #container = null;

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
   * Презентер открытого всплывающего окна
   * @type {null}
   */
  #detailPresenter = null;

  /**
   * Конструктор films-list презентера
   */
  constructor(container, filmsContainer) {
    this.#container = container;
    this.#filmsContainer = filmsContainer;
  }

  init = (filmsData, commentsData) => {
    this.#filmsData = filmsData;
    this.#commentsData = commentsData;

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
    const filmCardPresenter = new FilmCardPresenter(this.#filmsListContainerComponent.element, this.#handleFilmCardClick);
    filmCardPresenter.init(film, this.#commentsData);
  };

  /**
   * Обработчик клика по карточке фильма
   * @param film
   * @param comments
   */
  #handleFilmCardClick = (film, comments) => {
    this.#clearDetailPresenter();

    const filmDetailPresenter = new FilmDetailPresenter(this.#container);
    filmDetailPresenter.init(film, comments);

    this.#container.addEventListener('keydown', this.#onEscapeKeydown);
    this.#container.classList.add('hide-overflow');
    this.#detailPresenter = filmDetailPresenter;
  };

  /**
   * Удаляет открытое всплывающее окно
   */
  #clearDetailPresenter = () => {
    if (this.#detailPresenter !== null) {
      this.#detailPresenter.destroy();

      this.#container.removeEventListener('keydown', this.#onEscapeKeydown);
      this.#container.classList.remove('hide-overflow');
    }
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

  /**
   * Обработчик нажатия кнопки Escape
   * @param evt
   */
  #onEscapeKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#clearDetailPresenter();
    }
  };
}
