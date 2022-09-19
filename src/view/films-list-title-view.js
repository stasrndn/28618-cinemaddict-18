import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListTitleTemplate = (config) => (
  `<h2 class="films-list__title ${!config.title.length ? 'visually-hidden' : ''}">${config.title}</h2>`
);

export default class FilmsListTitleView extends AbstractView {
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
    return createFilmsListTitleTemplate(this.#config);
  }

}
