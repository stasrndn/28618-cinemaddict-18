import {createElement} from '../render.js';

const createFilmsListTemplate = () => (`
    <section class="films-list">
      <div class="films-list__container"></div>
    </section>`
);

export default class FilmsListView {
  getTemplate() {
    return createFilmsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
