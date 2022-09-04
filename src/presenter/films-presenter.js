import HeaderProfileView from '../view/header-profile-view.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortFilterView from '../view/sort-filter-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsListShowMoreButtonView from '../view/films-list-show-more-button-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import { render, RenderPosition } from '../render.js';
import FilmDetailsView from '../view/film-details-view';

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

    const allMoviesListContainer = allMoviesList.getElement().querySelector('.films-list__container');
    const topRatedListContainer = topRatedList.getElement().querySelector('.films-list__container');
    const mostCommentedListContainer = mostCommentedList.getElement().querySelector('.films-list__container');

    allMoviesTitle.getElement().classList.add('visually-hidden');
    allMoviesTitle.getElement().textContent = 'All movies. Upcoming';

    topRatedList.getElement().classList.add('films-list--extra');
    topRatedTitle.getElement().textContent = 'Top rated';

    mostCommentedList.getElement().classList.add('films-list--extra');
    mostCommentedTitle.getElement().textContent = 'Most commented';

    render(mainNavigation, this.mainContainer);
    render(sortFilter, this.mainContainer);
    render(films, this.mainContainer);

    render(allMoviesList, films.getElement());
    render(allMoviesTitle, allMoviesList.getElement(), RenderPosition.AFTERBEGIN);

    /**
     * Обработчик клика по карточке фильма
     * @param evt
     */
    const onClickFilmCard = (evt) => {
      const isControlButton = evt.target.classList.contains('film-card__controls-item');

      if (!isControlButton) {
        let filmCardDetail = document.querySelector('.film-details');

        this.#removeNode(filmCardDetail);

        const film = this.films[evt.currentTarget.dataset.id - 1];

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
      filmCard.getElement().addEventListener('click', onClickFilmCard);
    }

    render(allMoviesMoreButton, allMoviesList.getElement());
    render(topRatedList, films.getElement());
    render(topRatedTitle, topRatedList.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 2; i < 4; i++) {
      const filmCard = new FilmCardView(this.films[i]);

      render(filmCard, topRatedListContainer);
      filmCard.getElement().addEventListener('click', onClickFilmCard);
    }

    render(mostCommentedList, films.getElement());
    render(mostCommentedTitle, mostCommentedList.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 1; i < 3; i++) {
      const filmCard = new FilmCardView(this.films[i]);

      render(filmCard, mostCommentedListContainer);
      filmCard.getElement().addEventListener('click', onClickFilmCard);
    }
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
