import FilmsListView from '../view/films-list-view';
import FilmsListTitleView from '../view/films-list-title-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardPresenter from './film-card-presenter';
import FilmDetailPresenter from './film-detail-presenter';
import FilmsListShowMoreButtonView from '../view/films-list-show-more-button-view';
import {FILM_COUNT_PER_STEP} from '../const';
import {remove, render} from '../framework/render';
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
   * Конструктор films-list презентера
   */
  constructor(container, filmsContainer) {
    this.#container = container;
    this.#filmsContainer = filmsContainer;
  }

  /**
   * Инициализация презентера
   * @param filmsData
   * @param commentsData
   */
  init = (filmsData, commentsData) => {
    this.#filmsData = filmsData;
    this.#commentsData = commentsData;

    this.#renderFilmsListComponent();
    this.#renderFilmsListTitleComponent();
    this.#renderFilmsListContainerComponent();

    this.#renderFilmList();
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
    render(this.#filmsListComponent, this.#filmsContainer);
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
}
