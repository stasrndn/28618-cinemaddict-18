import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const siteHeaderContainer = document.querySelector('.header');
const siteMainContainer = document.querySelector('.main');
const siteFooterContainer = document.querySelector('.footer');

const Containers = {
  header: siteHeaderContainer,
  main: siteMainContainer,
  footer: siteFooterContainer,
};

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
/*const filmsPresenter = new FilmsPresenter(Containers, filmsModel, commentsModel);

filmsPresenter.renderHeader();
filmsPresenter.renderContent();
filmsPresenter.renderFooter();*/
