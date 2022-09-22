import FilmsListView from '../view/films-list-view';
import FilmsListTitleView from '../view/films-list-title-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardPresenter from './film-card-presenter';
import FilmDetailPresenter from './film-detail-presenter';
import FilmsListShowMoreButtonView from '../view/films-list-show-more-button-view';
import MainNavigationPresenter from './main-navigation-presenter';
import SortPresenter from './sort-presenter';
import {FILM_COUNT_PER_STEP, SortType} from '../const';
import {remove, render} from '../framework/render';
import {isEscapeKey} from '../utils';
import {sortByDateRelease, sortByRating} from '../utils/film';

export default class FilmsListPresenter {
  /**
   * Контейнер документа (body)
   * @type {null}
   */
  #container = null;

  /**
   * Контейнер контентной области (main)
   * @type {null}
   */
  #mainContainer = null;

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
   * Массив для хранения исходного порядка фильмов
   * @type {[]}
   */
  #sourcesFilmsData = [];

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
   * Презентер компонента сортировки
   * @type {null}
   */
  #sortPresenter = null;

  /**
   * Конфигурация для настройки компонентов
   * @type {{isMain: boolean, title: string}}
   */
  #config = {
    isMain: false,
    title: ''
  };

  /**
   * Хранилище карточек фильмов
   * @type {*}
   */
  #filmCardPresenter = new Map();

  /**
   * Хранилище инстанса презентера
   * всплывающего окна
   * @type {null}
   */
  #filmDetailPresenter = null;

  /**
   * Счётчик отрисованных фильмов
   * @type {number}
   */
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  /**
   * Текущий тип сортировки
   * @type {string}
   */
  #currentSortType = SortType.DEFAULT;

  /**
   * Конструктор films-list презентера
   */
  constructor(containers) {
    this.#container = containers.container;
    this.#filmsContainer = containers.filmsContainer;
    this.#mainContainer = containers.mainContainer;
  }

  /**
   * Инициализация презентера
   * @param filmsModel
   * @param commentsModel
   */
  init = (filmsModel, commentsModel) => {
    this.#filmsData = [...filmsModel.films];
    this.#sourcesFilmsData = [...filmsModel.films];
    this.#commentsData = [...commentsModel.comments];

    this.#initPresenters();

    this.#renderFilmsListComponent();
    this.#renderFilmsListTitleComponent();
    this.#renderFilmsListContainerComponent();

    this.#renderFilmList();
  };

  /**
   * Инициализация соседних презентеров
   */
  #initPresenters = () => {
    if (this.#config.isMain) {
      this.#sortPresenter = new SortPresenter(this.#mainContainer, this.#handleSortTypeChange);
      this.#sortPresenter.init(this.#currentSortType);

      const mainNavigationPresenter = new MainNavigationPresenter(this.#mainContainer);
      mainNavigationPresenter.init();
    }
  };

  /**
   * Установка конфигурации презентера
   * @param config
   */
  setConfig = (config = {}) => {
    this.#config = Object.keys(config).length ? config : this.#config;
  };

  /**
   * Отрисовка компонента оболочки списка фильма
   */
  #renderFilmsListComponent = () => {
    this.#filmsListComponent = new FilmsListView(this.#config);
    render(this.#filmsListComponent, this.#filmsContainer.element);
  };

  /**
   * Отрисовка компонента заголовка списка
   */
  #renderFilmsListTitleComponent = () => {
    const filmsListTitleComponent = new FilmsListTitleView(this.#config);
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
    this.#filmsListShowMoreButtonComponent.setClickHandler(this.#handleFilmsListShowMoreButton);
    render(this.#filmsListShowMoreButtonComponent, this.#filmsListComponent.element);
  };

  /**
   * Отрисовка карточки фильма
   * @param film
   */
  #renderFilm = (film) => {
    const filmsListContainerComponent = this.#filmsListContainerComponent.element;
    const filmCardPresenter = new FilmCardPresenter(filmsListContainerComponent, this.#handleFilmCardClick, this.#handleFilmChange);
    filmCardPresenter.init(film, this.#commentsData);
    this.#filmCardPresenter.set(film.id, filmCardPresenter);
  };

  /**
   * Обработчик клика по карточке фильма
   * @param film
   * @param comments
   */
  #handleFilmCardClick = (film, comments) => {
    this.#clearDetailPresenter();

    const filmDetailPresenter = new FilmDetailPresenter(this.#container, this.#handleFilmChange);
    filmDetailPresenter.init(film, comments);

    this.#container.addEventListener('keydown', this.#onEscapeKeydown);
    this.#container.classList.add('hide-overflow');
    this.#detailPresenter = filmDetailPresenter;

    this.#filmDetailPresenter = filmDetailPresenter;
  };

  /**
   * Обработчик изменения фильма
   * @param updatedFilm
   */
  #handleFilmChange = (updatedFilm) => {
    this.#filmCardPresenter.get(updatedFilm.id).rerender(updatedFilm);

    if (this.#filmDetailPresenter !== null) {
      this.#filmDetailPresenter.rerender(updatedFilm);
    }
  };

  /**
   * Обработчик кнопки "Показать ещё"
   */
  #handleFilmsListShowMoreButton = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#filmsData.length) {
      remove(this.#filmsListShowMoreButtonComponent);
    }
  };

  /**
   * Обработчик нажатия ссылки в компоненте сортировки
   * @param sortType
   */
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#sortFilms(sortType);
      this.#clearFilmList();
      this.#renderFilmList();

      this.#sortPresenter.rerender(this.#currentSortType);
    }
  };

  /**
   * Удаляет открытое всплывающее окно
   */
  #clearDetailPresenter = () => {
    if (this.#detailPresenter !== null) {
      this.#detailPresenter.destroy();
      this.#filmDetailPresenter = null;

      this.#container.removeEventListener('keydown', this.#onEscapeKeydown);
      this.#container.classList.remove('hide-overflow');
    }
  };

  /**
   * Очистка списка от карточек фильмов
   */
  #clearFilmList = () => {
    this.#filmCardPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#filmsListShowMoreButtonComponent);
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
    if (this.#config.isMain) {
      this.#renderFilms(0, Math.min(this.#filmsData.length, FILM_COUNT_PER_STEP));

      if (this.#filmsData.length > FILM_COUNT_PER_STEP) {
        this.#renderFilmsListShowMoreButtonComponent();
      }
    } else {
      this.#renderFilms(0, 2);
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

  /**
   * Производит сортировку фильмов в массиве
   * @param sortType
   */
  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#filmsData.sort(sortByDateRelease);
        this.#currentSortType = SortType.DATE;
        break;
      case SortType.RATING:
        this.#filmsData.sort(sortByRating);
        this.#currentSortType = SortType.RATING;
        break;
      default:
        this.#filmsData = [...this.#sourcesFilmsData];
        this.#currentSortType = SortType.DEFAULT;
    }
  };
}
