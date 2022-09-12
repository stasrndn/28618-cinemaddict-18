import HeaderProfileView from '../view/header-profile-view.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortFilterView from '../view/sort-filter-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsListShowMoreButtonView from '../view/films-list-show-more-button-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import FilmDetailsView from '../view/film-details-view';
import {isEscapeKey} from '../utils.js';
import { render, remove } from '../framework/render.js';
import {FILM_COUNT_PER_STEP} from '../const';
import FilmsListEmptyView from '../view/films-list-empty-view';

export default class FilmsPresenter {
  #container = null;
  #headerContainer = null;
  #mainContainer = null;
  #footerContainer = null;

  #filmsModel = null;
  #commentsModel = null;

  #mainNavigationComponent = new MainNavigationView();
  #sortFilterComponent = new SortFilterView();
  #filmsComponent = new FilmsView();

  #allMoviesListComponent = new FilmsListView();
  #allMoviesListContainerComponent = new FilmsListContainerView();
  #allMoviesTitleComponent = new FilmsListTitleView();
  #allMoviesMoreButtonComponent = new FilmsListShowMoreButtonView();

  #topRatedListComponent = new FilmsListView();
  #topRatedListContainerComponent = new FilmsListContainerView();
  #topRatedTitleComponent = new FilmsListTitleView();

  #mostCommentedListComponent = new FilmsListView();
  #mostCommentedListContainerComponent = new FilmsListContainerView();
  #mostCommentedTitleComponent = new FilmsListTitleView();

  #filmsListEmptyComponent = null;

  #filmDetailComponent = null;

  #films = [];
  #comments = [];

  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];

    if (!this.#films.length) {
      this.#filmsListEmptyComponent = new FilmsListEmptyView();
    }

    this.#initContainers();

    this.#renderHeader();
    this.#renderContent();
    this.#renderFooter();
  }

  #renderHeader() {
    const headerProfileView = new HeaderProfileView();
    render(headerProfileView, this.#headerContainer);
  }

  #onClickAllMoviesMoreButtonComponent = () => {
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(this.#renderFilmCard(film), this.#allMoviesListContainerComponent.element));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#allMoviesMoreButtonComponent);
    }
  };

  #renderContent() {
    this.#initComponents();

    render(this.#mainNavigationComponent, this.#mainContainer);

    if (this.#films.length) {
      render(this.#sortFilterComponent, this.#mainContainer);
    }

    render(this.#filmsComponent, this.#mainContainer);

    render(this.#allMoviesListComponent, this.#filmsComponent.element);

    if (!this.#films.length) {
      render(this.#filmsListEmptyComponent, this.#allMoviesListComponent.element);
      return;
    }

    render(this.#allMoviesTitleComponent, this.#allMoviesListComponent.element);

    this.#renderAllFilmsCards();

    render(this.#allMoviesListContainerComponent, this.#allMoviesListComponent.element);

    this.#allMoviesMoreButtonComponent.setClickHandler(this.#onClickAllMoviesMoreButtonComponent);
    render(this.#allMoviesMoreButtonComponent, this.#allMoviesListComponent.element);

    render(this.#topRatedListComponent, this.#filmsComponent.element);
    render(this.#topRatedListContainerComponent, this.#topRatedListComponent.element);
    render(this.#topRatedTitleComponent, this.#topRatedListComponent.element);

    this.#renderTopRatedFilmsCards();

    render(this.#mostCommentedListComponent, this.#filmsComponent.element);
    render(this.#mostCommentedListContainerComponent, this.#mostCommentedListComponent.element);
    render(this.#mostCommentedTitleComponent, this.#mostCommentedListComponent.element);

    this.#renderMostCommentedFilmsCards();

    this.#container.addEventListener('keydown', this.#onContainerKeydown);
  }

  #initContainers() {
    this.#mainContainer = this.#container.querySelector('.main');
    this.#headerContainer = this.#container.querySelector('.header');
    this.#footerContainer = this.#container.querySelector('.footer');
  }

  #initComponents() {
    if (!this.#films.length) {
      return;
    }

    this.#allMoviesTitleComponent.element.classList.add('visually-hidden');
    this.#allMoviesTitleComponent.element.textContent = 'All movies. Upcoming';

    this.#topRatedListComponent.element.classList.add('films-list--extra');
    this.#topRatedTitleComponent.element.textContent = 'Top rated';

    this.#mostCommentedListComponent.element.classList.add('films-list--extra');
    this.#mostCommentedTitleComponent.element.textContent = 'Most commented';
  }

  #renderAllFilmsCards() {
    for (let i = 0; i < Math.min(this.#films.length, FILM_COUNT_PER_STEP); i++) {
      const filmComponent = this.#renderFilmCard(this.#films[i]);
      render(filmComponent, this.#allMoviesListContainerComponent.element);
    }
  }

  #renderTopRatedFilmsCards() {
    for (let i = 1; i < 3; i++) {
      const filmComponent = this.#renderFilmCard(this.#films[i]);
      render(filmComponent, this.#topRatedListContainerComponent.element);
    }
  }

  #renderMostCommentedFilmsCards() {
    for (let i = 3; i < 5; i++) {
      const filmComponent = this.#renderFilmCard(this.#films[i]);
      render(filmComponent, this.#mostCommentedListContainerComponent.element);
    }
  }

  #renderFilmCard(film) {
    const filmComponent = new FilmCardView(film);

    const onClickAddToWatchlistButton = () => {
    };

    const onClickMarkAsWatchedButton = () => {
    };

    const onClickMarkAsFavoriteButton = () => {
    };

    const onClickFilmComponent = () => {
      this.#renderFilmCardDetail(film);
      this.#container.classList.add('hide-overflow');
    };

    filmComponent.setFilmCardClickHandler(onClickFilmComponent);
    filmComponent.setAddToWatchlistButtonClickHandler(onClickAddToWatchlistButton);
    filmComponent.setMarkAsWatchedButtonClickHandler(onClickMarkAsWatchedButton);
    filmComponent.setMarkAsFavoriteButtonClickHandler(onClickMarkAsFavoriteButton);

    return filmComponent;
  }

  #renderFilmCardDetail(film) {
    this.#removeFilmCardDetail();

    this.#filmDetailComponent = new FilmDetailsView(film, this.#comments);

    const onClickCloseButton = () => {
      this.#removeFilmCardDetail();
    };

    this.#filmDetailComponent.setCloseButtonClickHandler(onClickCloseButton);

    render(this.#filmDetailComponent, this.#container);
  }

  #removeFilmCardDetail() {
    if (this.#filmDetailComponent !== null) {
      this.#container.classList.remove('hide-overflow');
      this.#container.querySelector('.film-details').remove();
      this.#filmDetailComponent = null;
    }
  }

  #renderFooter() {
    this.#footerContainer = this.#container.querySelector('.footer');

    const footerStatistics = new FooterStatisticsView();
    const footerStatisticsContainer = this.#footerContainer.querySelector('.footer__statistics');

    render(footerStatistics, footerStatisticsContainer);

    const footerStatisticsInside = footerStatisticsContainer.querySelector('p');
    footerStatisticsInside.textContent = `${this.#films.length} movies inside`;
  }

  #onContainerKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      this.#removeFilmCardDetail();
    }
  };
}
