import MainNavigationPresenter from './main-navigation-presenter';
import SortPresenter from './sort-presenter';
import FilmsPresenter from './films-presenter';
import FilmsListPresenter from './films-list-presenter';
import FilmsEmptyPresenter from './films-empty-presenter';

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
   * Компонент для отображения списков фильмов.
   * Является контейнером для всех списков фильмов
   * @type {null}
   */
  #filmsComponent = null;

  /**
   * Конструктор main презентера
   * @param containers
   * @param filmsModel
   * @param commentsModel
   */
  constructor(containers, filmsModel, commentsModel) {
    this.#container = containers.container;
    this.#mainContainer = containers.mainContainer;

    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  /**
   * Инициализация main презентера
   */
  init = () => {
    this.#filmsData = [...this.#filmsModel.films];
    this.#commentsData = [...this.#commentsModel.comments];

    this.#initPresenters();

    this.#renderAllFilms();
    this.#renderTopRatedFilms();
    this.#renderMostCommentedFilms();
  };

  /**
   * Инициализация соседних презентеров
   */
  #initPresenters = () => {
    if (!this.#filmsData.length) {
      const filmsListEmptyPresenter = new FilmsEmptyPresenter(this.#mainContainer);
      filmsListEmptyPresenter.init();

      return;
    }

    const mainNavigationPresenter = new MainNavigationPresenter(this.#mainContainer);
    mainNavigationPresenter.init();

    const sortPresenter = new SortPresenter(this.#mainContainer);
    sortPresenter.init();

    const filmsPresenter = new FilmsPresenter(this.#mainContainer);
    filmsPresenter.init();
    this.#filmsComponent = filmsPresenter.filmsComponent;
  };

  /**
   * Отрисовка всех фильмов
   */
  #renderAllFilms = () => {
    const filmsListPresenter = new FilmsListPresenter(this.#container, this.#filmsComponent.element);
    const config = {
      isMain: true,
      title: '',
    };

    filmsListPresenter.setConfig(config);
    filmsListPresenter.init(this.#filmsData, this.#commentsData);
  };

  /**
   * Временная реализация вывода
   * фильмов с наибольшим рейтингом
   */
  #renderTopRatedFilms = () => {
    const filmsListPresenter = new FilmsListPresenter(this.#container, this.#filmsComponent.element);
    const config = {
      isMain: false,
      title: 'Top rated',
    };

    filmsListPresenter.setConfig(config);
    filmsListPresenter.init(this.#filmsData, this.#commentsData);
  };

  /**
   * Временная реализация вывода
   * фильмов с наибольшим количеством комментариев
   */
  #renderMostCommentedFilms = () => {
    const filmsListPresenter = new FilmsListPresenter(this.#container, this.#filmsComponent.element);
    const config = {
      isMain: false,
      title: 'Most commented',
    };

    filmsListPresenter.setConfig(config);
    filmsListPresenter.init(this.#filmsData, this.#commentsData);
  };
}
