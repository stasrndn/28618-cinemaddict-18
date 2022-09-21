import FilmsPresenter from './films-presenter';
import FilmsListPresenter from './films-list-presenter';
import FilmsEmptyPresenter from './films-empty-presenter';

export default class MainPresenter {
  /**
   * Контейнеры документа (body, main, films)
   * @type {null}
   */
  #containers = null;

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
   * Конструктор main презентера
   * @param containers
   * @param filmsModel
   * @param commentsModel
   */
  constructor(containers, filmsModel, commentsModel) {
    this.#mainContainer = containers.mainContainer;

    this.#containers = {
      container: containers.container,
      mainContainer: this.#mainContainer,
      filmsContainer: null,
    };

    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  /**
   * Инициализация main презентера
   */
  init = () => {
    if (![...this.#filmsModel.films].length) {
      this.#showEmptyMessage();
    } else {
      const filmsPresenter = new FilmsPresenter(this.#mainContainer);
      filmsPresenter.init();

      this.#containers.filmsContainer = filmsPresenter.filmsComponent;

      this.#renderAllFilms();
      this.#renderTopRatedFilms();
      this.#renderMostCommentedFilms();
    }
  };

  /**
   * Показывает сообщение об отсутствующих фильмах
   */
  #showEmptyMessage = () => {
    const filmsListEmptyPresenter = new FilmsEmptyPresenter(this.#mainContainer);
    filmsListEmptyPresenter.init();
  };

  /**
   * Отрисовка всех фильмов
   */
  #renderAllFilms = () => {
    const filmsListPresenter = new FilmsListPresenter(this.#containers);
    const config = {
      isMain: true,
      title: '',
    };

    filmsListPresenter.setConfig(config);
    filmsListPresenter.init(this.#filmsModel, this.#commentsModel);
  };

  /**
   * Временная реализация вывода
   * фильмов с наибольшим рейтингом
   */
  #renderTopRatedFilms = () => {
    const filmsListPresenter = new FilmsListPresenter(this.#containers);
    const config = {
      isMain: false,
      title: 'Top rated',
    };

    filmsListPresenter.setConfig(config);
    filmsListPresenter.init(this.#filmsModel, this.#commentsModel);
  };

  /**
   * Временная реализация вывода
   * фильмов с наибольшим количеством комментариев
   */
  #renderMostCommentedFilms = () => {
    const filmsListPresenter = new FilmsListPresenter(this.#containers);
    const config = {
      isMain: false,
      title: 'Most commented',
    };

    filmsListPresenter.setConfig(config);
    filmsListPresenter.init(this.#filmsModel, this.#commentsModel);
  };
}
