import FilterView from '../view/filter-view.js';
import {FilterType, UpdateType} from '../const.js';
import {filter} from '../utils/filter.js';
import {remove, render, replace} from '../framework/render.js';

export default class FilterPresenter {
  /**
   * Контейнер контентной области (main)
   * @type {null}
   */
  #container = null;

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
   * Компонент фильтра
   * @type {null}
   */
  #filterComponent = null;

  constructor(container, models) {
    this.#container = container;
    this.#models.filmsModel = models.filmsModel;
    this.#models.filterModel = models.filterModel;

    this.#models.filmsModel.addObserver(this.#handleModelEvent);
    this.#models.filterModel.addObserver(this.#handleModelEvent);
  }

  /**
   * Геттер для получения отфильтрованных фильмов
   * @returns {[{name: string, count, type: string},{name: string, count, type: string},{name: string, count, type: string},{name: string, count, type: string}]}
   */
  get filters() {
    const films = this.#models.filmsModel.films;

    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }

  /**
   * Инициализация презентера фильтра
   */
  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#models.filterModel.filter);
    this.#filterComponent.setFilterTypeClickHandler(this.#handleFilterTypeClick);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  /**
   * Обработчик на обновление модели фильтра
   */
  #handleModelEvent = () => {
    this.init();
  };

  /**
   * Обработчик клика по ссылке в фильтре
   * @param filterType
   */
  #handleFilterTypeClick = (filterType) => {
    if (this.#models.filterModel.filter === filterType) {
      return;
    }

    this.#models.filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
