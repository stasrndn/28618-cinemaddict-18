import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListTitleTemplate = (hidden, titleText) => (
  `<h2 class="films-list__title ${hidden ? 'visually-hidden' : ''}">${titleText}</h2>`
);

export default class FilmsListTitleView extends AbstractView {
  /**
   * Настройка показа заголовка
   * @type {null}
   */
  #hidden = null;

  /**
   * Текст заголовка
   * @type {null}
   */
  #titleText = null;

  constructor(hidden = false, titleText = '') {
    super();
    this.#hidden = hidden;
    this.#titleText = titleText;
  }

  get template() {
    return createFilmsListTitleTemplate(this.#hidden, this.#titleText);
  }

}
