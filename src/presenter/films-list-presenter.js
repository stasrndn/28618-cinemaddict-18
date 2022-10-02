import FilmPresenter from './film-presenter.js';
import FilmDetailPresenter from './film-detail-presenter';
import CommentsPresenter from './comments-presenter.js';

import FilmsView from '../view/films-view.js';
import PopupView from '../view/popup-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import SortView from '../view/sort-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';

import {FILM_COUNT_PER_STEP, FilterType, SortType, UpdateType, UserAction} from '../const.js';
import {filter} from '../utils/filter.js';
import {sortByDateRelease, sortByRating} from '../utils/film.js';
import {remove, render} from '../framework/render.js';
import {isEscapeKey} from '../utils';

import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class FilmsListPresenter {
  /**
   * Контейнер HTML документа
   * @type {null}
   */
  #bodyContainer = null;

  /**
   * Контейнер для отрисовки списка фильмов
   * @type {null}
   */
  #boardContainer = null;

  /**
   * Компонент для отрисовки списка фильма
   * @type {null}
   */
  #boardComponent = new FilmsView();

  /**
   * Компонент всплывающего окна
   * @type {PopupView}
   */
  #popupComponent = null;

  /**
   * Компонент списка фильмов
   * @type {FilmsListView}
   */
  #filmListComponent = new FilmsListView();

  /**
   * Компонент заголовка списка фильмов
   * @type {FilmsListTitleView}
   */
  #filmListTitleComponent = new FilmsListTitleView(true, 'All movies. Upcoming');

  /**
   * Компонент-контейнер для отрисовки карточек фильмов
   * @type {FilmsListContainerView}
   */
  #filmListContainerComponent = new FilmsListContainerView();

  /**
   * Компонент кнопки "Показать ещё"
   * @type {null}
   */
  #loadMoreButtonComponent = null;

  /**
   * Компонент сортировки
   * @type {null}
   */
  #sortComponent = null;

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
   * Текущий тип сортировки
   * @type {string}
   */
  #currentSortType = SortType.DEFAULT;

  /**
   * Тип фильтрации
   * @type {string}
   */
  #filterType = FilterType.ALL;

  /**
   * Хранилище карточек фильмов
   * @type {*}
   */
  #filmPresenter = new Map();

  /**
   * Информация о фильме
   * @type {null}
   */
  #filmDetailPresenter = null;

  /**
   * Презентер комментариев
   * @type {null}
   */
  #commentsPresenter = null;

  /**
   * Количество карточек для отрисовки
   * за один шаг
   * @type {number}
   */
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  /**
   * Выбранный фильм для отображения в попапе
   * @type {null}
   */
  #selectedFilm = null;

  #uiBlocker = new UiBlocker(350, 1000);

  constructor(containers, models) {
    this.#bodyContainer = containers.siteBodyElement;
    this.#boardContainer = containers.siteMainElement;

    this.#models.filmsModel = models.filmsModel;
    this.#models.filterModel = models.filterModel;
    this.#models.commentsModel = models.commentsModel;
  }

  /**
   * Метод получения фильмов
   * @returns {*}
   */
  get films() {
    this.#filterType = this.#models.filterModel.filter;
    const films = this.#models.filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortByDateRelease);
      case SortType.RATING:
        return filteredFilms.sort(sortByRating);
    }

    return filteredFilms;
  }

  init = () => {
    this.#renderBoard();
    this.#addModelsObservers();
  };

  /**
   * Добавить наблюдателей к моделям
   */
  #addModelsObservers = () => {
    this.#models.filmsModel.addObserver(this.#handleFilmsModelEvent);
    this.#models.filterModel.addObserver(this.#handleFilmsModelEvent);
  };

  /**
   * Отрисовка компонента сортировки
   */
  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#boardComponent.element);
  };

  /**
   * Обработчик нажатия ссылки в компоненте сортировки
   * @param sortType
   */
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedFilmCount: true});
    this.#renderBoard();
  };

  /**
   * Отрисовка карточки с фильмом
   * @param film
   */
  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListContainerComponent.element, this.#handleFilmClick, this.#handleViewAction);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  /**
   * Отрисовка всех карточек с фильмами
   * @param films
   */
  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  /**
   * Отрисовка кнопки "Показать ещё"
   */
  #renderLoadMoreButton = () => {
    this.#loadMoreButtonComponent = new LoadMoreButtonView();
    this.#loadMoreButtonComponent.setClickHandler(this.#handleLoadMoreButtonClick);

    render(this.#loadMoreButtonComponent, this.#filmListComponent.element);
  };

  /**
   * Обработчик нажатия кнопки "Показать ещё"
   */
  #handleLoadMoreButtonClick = () => {
    const filmsCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmsCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);

    this.#renderFilms(films);
    this.#renderedFilmCount = newRenderedFilmCount;

    if (this.#renderedFilmCount >= filmsCount) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  /**
   * Обработчик клика по карточке фильма
   * @param film
   */
  #handleFilmClick = (film) => {
    this.#selectedFilm = film;

    this.#clearPopup();
    this.#showPopup();
  };

  /**
   * Обработчик нажатия кнопки Escape
   * @param evt
   */
  #handleEscapeKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#clearPopup();
    }
  };

  /**
   * Обработчик изменений в представлениях
   * @param actionType
   * @param updateType
   * @param update
   */
  #handleViewAction = (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#models.filmsModel.updateFilm(updateType, update);
        break;
    }

    this.#uiBlocker.unblock();
  };

  /**
   * Обработчик изменений в модели фильмов
   * @param updateType
   * @param data
   */
  #handleFilmsModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.init();
        break;
    }
  };

  /**
   * Показать попап с фильмом
   */
  #showPopup = () => {
    this.#popupComponent = new PopupView(this.#bodyContainer, this.#handleEscapeKeyDown);
    this.#popupComponent.init();

    render(this.#popupComponent, this.#bodyContainer);

    this.#filmDetailPresenter = new FilmDetailPresenter(this.#popupComponent.innerContainer, this.#handleViewAction, this.#clearPopup);
    this.#filmDetailPresenter.init(this.#selectedFilm, this.#models);

    this.#commentsPresenter = new CommentsPresenter(this.#popupComponent.innerContainer, this.#models.commentsModel, this.#uiBlocker);
    this.#commentsPresenter.init(this.#selectedFilm);
  };

  /**
   * Удаляет открытое всплывающее окно
   */
  #clearPopup = () => {
    if (this.#filmDetailPresenter !== null) {
      this.#filmDetailPresenter.destroy();
      this.#filmDetailPresenter = null;

      this.#commentsPresenter.destroy();
      this.#commentsPresenter = null;

      this.#popupComponent.destroy();

      this.#popupComponent = null;
    }
  };

  /**
   * Удаление компонентов сортировки и списка фильмов
   */
  #clearBoard = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    const filmsCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this.#renderedFilmCount = Math.min(filmsCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  /**
   * Отрисовка сортировки и списка фильмов на доске
   */
  #renderBoard = () => {
    const films = this.films;
    const filmsCount = films.length;

    if (filmsCount === 0) {
      return;
    }

    this.#renderSort();

    render(this.#boardComponent, this.#boardContainer);
    render(this.#filmListComponent, this.#boardComponent.element);
    render(this.#filmListTitleComponent, this.#filmListComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);

    this.#renderFilms(films.slice(0, Math.min(filmsCount, this.#renderedFilmCount)));

    if (filmsCount > this.#renderedFilmCount) {
      this.#renderLoadMoreButton();
    }
  };
}
