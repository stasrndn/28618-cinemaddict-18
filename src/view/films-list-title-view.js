import { createElement } from '../render.js';

const createFilmsListTitleTemplate = () => '<h2 class="films-list__title"></h2>';

export default class FilmsListTitleView {
  getTemplate() {
    return createFilmsListTitleTemplate();
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
