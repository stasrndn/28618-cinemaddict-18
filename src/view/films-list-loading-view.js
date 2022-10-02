import AbstractView from '../framework/view/abstract-view.js';

/**
 * Шаблон с информацией о загрузке
 * @returns {string}
 */
const createFilmsListLoadingViewTemplate = () => '<h2 class="films-list__title">Loading...</h2>';

export default class FilmsListLoadingView extends AbstractView {
  get template() {
    return createFilmsListLoadingViewTemplate();
  }
}
