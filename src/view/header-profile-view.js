import AbstractView from '../framework/view/abstract-view.js';
import {getUserType} from '../utils/user.js';

const createHeaderProfileTemplate = (userType) => (
  `<section class="header__profile profile">
    ${userType !== null ? `
      <p class="profile__rating">${userType}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    ` : ''}
   </section>`
);

export default class HeaderProfileView extends AbstractView {
  #userType = null;

  constructor(countWatchedFilms) {
    super();
    this.#userType = getUserType(countWatchedFilms);
  }

  get template() {
    return createHeaderProfileTemplate(this.#userType);
  }

}
