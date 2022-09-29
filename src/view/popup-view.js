import AbstractView from '../framework/view/abstract-view.js';

const createPopupTemplate = () => (
  `<section class="film-details">
    <div class="film-details__inner"></div>
   </section>`
);

export default class PopupView extends AbstractView {
  get template() {
    return createPopupTemplate();
  }
}
