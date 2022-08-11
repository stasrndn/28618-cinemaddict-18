import FilmsPresenter from './presenter/films-presenter.js';

const siteHeaderContainer = document.querySelector('.header');
const siteMainContainer = document.querySelector('.main');
const siteFooterContainer = document.querySelector('.footer');

const Containers = {
  header: siteHeaderContainer,
  main: siteMainContainer,
  footer: siteFooterContainer,
};

const filmsPresenter = new FilmsPresenter(Containers);

filmsPresenter.renderHeader();
filmsPresenter.renderContent();
filmsPresenter.renderFooter();
