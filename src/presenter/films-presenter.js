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
  constructor(containers, filmsModel, commentsModel) {
    this.headerContainer = containers.header;
    this.mainContainer = containers.main;
    this.footerContainer = containers.footer;
    this.filmsModel = filmsModel;
    this.films = [...this.filmsModel.getFilms()];
    this.commentsModel = commentsModel;
    this.comments = [...this.commentsModel.getComments()];
  }

  renderHeader() {
    const headerProfileView = new HeaderProfileView();

    render(headerProfileView, this.headerContainer);
  }

  renderContent() {
    const mainNavigation = new MainNavigationView();
    const sortFilter = new SortFilterView();
    const films = new FilmsView();

    const allMoviesList = new FilmsListView();
    const allMoviesTitle = new FilmsListTitleView();
    const allMoviesMoreButton = new FilmsListShowMoreButtonView();

    const topRatedList = new FilmsListView();
    const topRatedTitle = new FilmsListTitleView();

    const mostCommentedList = new FilmsListView();
    const mostCommentedTitle = new FilmsListTitleView();

    const allMoviesListContainer = allMoviesList.element.querySelector('.films-list__container');
    const topRatedListContainer = topRatedList.element.querySelector('.films-list__container');
    const mostCommentedListContainer = mostCommentedList.element.querySelector('.films-list__container');

    allMoviesTitle.element.classList.add('visually-hidden');
    allMoviesTitle.element.textContent = 'All movies. Upcoming';

    topRatedList.element.classList.add('films-list--extra');
    topRatedTitle.element.textContent = 'Top rated';

    mostCommentedList.element.classList.add('films-list--extra');
    mostCommentedTitle.element.textContent = 'Most commented';

    render(mainNavigation, this.mainContainer);
    render(sortFilter, this.mainContainer);
    render(films, this.mainContainer);

    render(allMoviesList, films.element);
    render(allMoviesTitle, allMoviesList.element, RenderPosition.AFTERBEGIN);

    /**
     * Обработчик нажатия клавиши Escape
     * @param evt
     */
    const onDocumentKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        const filmCardDetail = document.querySelector('.film-details');

        this.#removeNode(filmCardDetail);
      }
    };

    /**
     * Обработчик клика по карточке фильма
     * @param evt
     */
    const onClickFilmCard = (evt) => {
      const isControlButton = evt.target.classList.contains('film-card__controls-item');

      if (!isControlButton) {
        let filmCardDetail = document.querySelector('.film-details');

        this.#removeNode(filmCardDetail);

        const film = this.filmsModel.getFilmById(evt.currentTarget.dataset.id);

        const filmDetail = new FilmDetailsView(film, this.comments);

        render(filmDetail, this.footerContainer, RenderPosition.AFTEREND);

        filmCardDetail = document.querySelector('.film-details');
        const filmDetailsCloseButton = filmCardDetail.querySelector('.film-details__close-btn');

        const onClickFilmDetailsCloseButton = () => {
          this.#removeNode(filmCardDetail);
        };

        filmDetailsCloseButton.addEventListener('click', onClickFilmDetailsCloseButton);
      }
    };

    for (let i = 0; i < this.films.length; i++) {
      const filmCard = new FilmCardView(this.films[i]);

      render(filmCard, allMoviesListContainer);
      filmCard.element.addEventListener('click', onClickFilmCard);
    }

    render(allMoviesMoreButton, allMoviesList.element);
    render(topRatedList, films.element);
    render(topRatedTitle, topRatedList.element, RenderPosition.AFTERBEGIN);

    for (let i = 2; i < 4; i++) {
      const filmCard = new FilmCardView(this.films[i]);

      render(filmCard, topRatedListContainer);
      filmCard.element.addEventListener('click', onClickFilmCard);
    }

    render(mostCommentedList, films.element);
    render(mostCommentedTitle, mostCommentedList.element, RenderPosition.AFTERBEGIN);

    for (let i = 1; i < 3; i++) {
      const filmCard = new FilmCardView(this.films[i]);

      render(filmCard, mostCommentedListContainer);
      filmCard.element.addEventListener('click', onClickFilmCard);
    }

    document.addEventListener('keydown', onDocumentKeydown);
  }

  renderFooter() {
    const footerStatistics = new FooterStatisticsView();
    const footerStatisticsContainer = this.footerContainer.querySelector('.footer__statistics');

    render(footerStatistics, footerStatisticsContainer);
  }

  #removeNode(node) {
    if (node !== null) {
      node.remove();
    }
  }
}
