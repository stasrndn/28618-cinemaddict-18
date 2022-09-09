import HeaderProfileView from '../view/header-profile-view.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortFilterView from '../view/sort-filter-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsListShowMoreButtonView from '../view/films-list-show-more-button-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import FilmDetailsView from '../view/film-details-view';
import {isEscapeKey} from '../utils.js';
import { render, RenderPosition } from '../render.js';

export default class FilmsPresenter {
  #container = null;
  #headerContainer = null;
  #mainContainer = null;
  #footerContainer = null;
  #allMoviesListContainer = null;
  #topRatedListContainer = null;
  #mostCommentedListContainer = null;

  #filmsModel = null;
  #commentsModel = null;

  #mainNavigationComponent = new MainNavigationView();
  #sortFilterComponent = new SortFilterView();
  #filmsComponent = new FilmsView();

  #allMoviesListComponent = new FilmsListView();
  #allMoviesTitleComponent = new FilmsListTitleView();
  #allMoviesMoreButtonComponent = new FilmsListShowMoreButtonView();

  #topRatedListComponent = new FilmsListView();
  #topRatedTitleComponent = new FilmsListTitleView();

  #mostCommentedListComponent = new FilmsListView();
  #mostCommentedTitleComponent = new FilmsListTitleView();

  #filmDetailComponent = null;

  #films = [];
  #comments = [];

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];

    this.#initContainers();

    this.#renderHeader();
    this.#renderContent();
    this.#renderFooter();
  }

  #renderHeader() {
    const headerProfileView = new HeaderProfileView();
    render(headerProfileView, this.#headerContainer);
  }

  #renderContent() {
    this.#initComponents();

    render(this.#mainNavigationComponent, this.#mainContainer);
    render(this.#sortFilterComponent, this.#mainContainer);
    render(this.#filmsComponent, this.#mainContainer);

    render(this.#allMoviesListComponent, this.#filmsComponent.element);
    render(this.#allMoviesTitleComponent, this.#allMoviesListComponent.element, RenderPosition.AFTERBEGIN);

    this.#renderFilmsCards();

    this.#container.addEventListener('keydown', this.#onContainerKeydown);
  }

  #initContainers() {
    this.#mainContainer = this.#container.querySelector('.main');
    this.#headerContainer = this.#container.querySelector('.header');
    this.#footerContainer = this.#container.querySelector('.footer');
    this.#allMoviesListContainer = this.#allMoviesListComponent.element.querySelector('.films-list__container');
    this.#topRatedListContainer = this.#topRatedListComponent.element.querySelector('.films-list__container');
    this.#mostCommentedListContainer = this.#mostCommentedListComponent.element.querySelector('.films-list__container');
  }

  #initComponents() {
    this.#allMoviesTitleComponent.element.classList.add('visually-hidden');
    this.#allMoviesTitleComponent.element.textContent = 'All movies. Upcoming';

    this.#topRatedListComponent.element.classList.add('films-list--extra');
    this.#topRatedTitleComponent.element.textContent = 'Top rated';

    this.#mostCommentedListComponent.element.classList.add('films-list--extra');
    this.#mostCommentedTitleComponent.element.textContent = 'Most commented';
  }

  #renderFilmsCards() {
    for (let i = 0; i < this.#films.length; i++) {
      this.#renderFilmCard(this.#films[i]);
    }
  }

  #renderFilmCard(film) {
    const filmComponent = new FilmCardView(film);

    const addToWatchlistButton = filmComponent.element.querySelector('.film-card__controls-item.film-card__controls-item--add-to-watchlist');
    const markAsWatchedButton = filmComponent.element.querySelector('.film-card__controls-item.film-card__controls-item--mark-as-watched');
    const markAsFavoriteButton = filmComponent.element.querySelector('.film-card__controls-item.film-card__controls-item--favorite');

    const onClickAddToWatchlistButton = () => {
    };

    const onClickMarkAsWatchedButton = () => {
    };

    const onClickMarkAsFavoriteButton = () => {
    };

    const onClickFilmComponent = (evt) => {
      const isControlButton = evt.target.classList.contains('film-card__controls-item');

      if (!isControlButton) {
        this.#renderFilmCardDetail(film);
      }
    };

    filmComponent.element.addEventListener('click', onClickFilmComponent);

    addToWatchlistButton.addEventListener('click', onClickAddToWatchlistButton);
    markAsWatchedButton.addEventListener('click', onClickMarkAsWatchedButton);
    markAsFavoriteButton.addEventListener('click', onClickMarkAsFavoriteButton);

    render(filmComponent, this.#allMoviesListContainer);
  }

  #renderFilmCardDetail(film) {
    this.#removeFilmCardDetail();

    this.#filmDetailComponent = new FilmDetailsView(film, this.#comments);
    this.#container.classList.add('hide-overflow');

    const onClickCloseButton = (evt) => {
      evt.preventDefault();
      this.#removeFilmCardDetail();
    };

    const closeButton = this.#filmDetailComponent.element.querySelector('.film-details__close-btn');
    closeButton.addEventListener('click', onClickCloseButton);

    render(this.#filmDetailComponent, this.#container);
  }

  #removeFilmCardDetail() {
    if (this.#filmDetailComponent !== null) {
      this.#container.classList.remove('hide-overflow');
      this.#container.lastChild.remove();
      this.#filmDetailComponent = null;
    }
  }

  #renderFooter() {
    this.#footerContainer = this.#container.querySelector('.footer');

    const footerStatistics = new FooterStatisticsView();
    const footerStatisticsContainer = this.#footerContainer.querySelector('.footer__statistics');

    render(footerStatistics, footerStatisticsContainer);
  }

  #onContainerKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      if (this.#filmDetailComponent !== null) {
        this.#removeFilmCardDetail();
      }
    }
  };
}
