import {createElement} from '../render.js';

const createFilmsListTemplate = () => (`
    <section class="films-list">
      <div class="films-list__container"></div>
    </section>`
);

export default class FilmsListView {
  #element = null;

  get template() {
    return createFilmsListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
