import MainNavigationView from '../view/main-navigation-view';
import SortFilterView from '../view/sort-filter-view';
import FilmsListEmptyView from '../view/films-list-empty-view';
import FilmsView from '../view/films-view';
import FilmsListPresenter from './films-list-presenter';
import {render} from '../framework/render';

export default class MainPresenter {
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
   * Модель фильмов
   * @type {null}
   */
  #filmsModel = null;

  /**
   * Модель комментариев к фильмам
   * @type {null}
   */
  #commentsModel = null;

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
   * Компонент главной навигации
   * @type {null}
   */
  #mainNavigationComponent = null;

  /**
   * Компонент блока сортировки
   * @type {null}
   */
  #sortFilterComponent = null;

  /**
   * Компонент для отображения списков фильмов.
   * Является контейнером для всех списков фильмов
   * @type {null}
   */
  #filmsComponent = null;

  /**
   * Конструктор main презентера
   * @param container
   * @param filmsModel
   * @param commentsModel
   */
  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#mainContainer = this.#container.querySelector('.main');

    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  /**
   * Инициализация main презентера
   */
  init = () => {
    this.#filmsData = [...this.#filmsModel.films];
    this.#commentsData = [...this.#commentsModel.comments];

    this.#renderMainNavigationComponent();

    if (!this.#filmsData.length) {
      const filmsListEmptyComponent = new FilmsListEmptyView();
      render(filmsListEmptyComponent, this.#mainContainer);

      return;
    }

    this.#renderSortFilterComponent();
    this.#renderFilmsComponent();

    this.#renderAllFilms();
  };

  /**
   * Отрисовка компонента главной навигации
   */
  #renderMainNavigationComponent = () => {
    this.#mainNavigationComponent = new MainNavigationView();
    render(this.#mainNavigationComponent, this.#mainContainer);
  };

  /**
   * Отрисовка компонента блока сортировки
   */
  #renderSortFilterComponent = () => {
    this.#sortFilterComponent = new SortFilterView();
    render(this.#sortFilterComponent, this.#mainContainer);
  };

  /**
   * Отрисовка компонента отображения всех списков фильмов
   */
  #renderFilmsComponent = () => {
    this.#filmsComponent = new FilmsView();
    render(this.#filmsComponent, this.#mainContainer);
  };

  /**
   * Отрисовка всех фильмов
   */
  #renderAllFilms = () => {
    const filmsListPresenter = new FilmsListPresenter(this.#container, this.#filmsComponent.element);
    filmsListPresenter.init(this.#filmsData, this.#commentsData);
  };
}
