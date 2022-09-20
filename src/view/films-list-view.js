import AbstractView from '../framework/view/abstract-view';

const createFilmsListTemplate = (config) => (
  `<section class="films-list ${config.isMain ? '' : 'films-list--extra'}"></section>`
);

export default class FilmsListView extends AbstractView {
  /**
   * Конфигурация представления
   * @type {null}
   */
  #config = null;

  constructor(config) {
    super();
    this.#config = config;
  }

  get template() {
    return createFilmsListTemplate(this.#config);
  }

}
