import AbstractView from '../framework/view/abstract-view.js';

const createPopupTemplate = () => (
  `<section class="film-details">
    <div class="film-details__inner"></div>
   </section>`
);

export default class PopupView extends AbstractView {
  /**
   * Контейнер всплывающего окна
   * @type {null}
   */
  #bodyContainer = null;

  /**
   * Обработчик нажатия кнопки Escape
   * @type {null}
   */
  #handleEscapeKeyDown = null;

  constructor(bodyContainer, handleEscapeKeyDown) {
    super();
    this.#bodyContainer = bodyContainer;
    this.#handleEscapeKeyDown = handleEscapeKeyDown;
  }

  get template() {
    return createPopupTemplate();
  }

  get innerContainer() {
    return this.element.querySelector('.film-details__inner');
  }

  init = () => {
    this.#bodyContainer.addEventListener('keydown', this.#handleEscapeKeyDown);
    this.#bodyContainer.classList.add('hide-overflow');
  };

  destroy = () => {
    this.#bodyContainer.querySelector('.film-details').remove();
    this.#bodyContainer.classList.remove('hide-overflow');
    this.#bodyContainer.removeEventListener('keydown', this.#handleEscapeKeyDown);
  };
}
