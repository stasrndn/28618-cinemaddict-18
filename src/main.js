import HeaderPresenter from './presenter/header-presenter.js';
import FooterPresenter from './presenter/footer-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import FilmsEmptyPresenter from './presenter/films-empty-presenter.js';

import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');

const commentsModel = new CommentsModel();
const filmsModel = new FilmsModel(commentsModel);
const filterModel = new FilterModel();

const headerPresenter = new HeaderPresenter(siteBodyElement, {filmsModel});
const filterPresenter = new FilterPresenter(siteMainElement, {filmsModel, filterModel});
const filmsListPresenter = new FilmsListPresenter({siteBodyElement, siteMainElement}, {filmsModel, commentsModel, filterModel});
const filmsEmptyPresenter = new FilmsEmptyPresenter(siteMainElement, {filmsModel});
const footerPresenter = new FooterPresenter(siteBodyElement, {filmsModel});

headerPresenter.init();
filterPresenter.init();
filmsListPresenter.init();
filmsEmptyPresenter.init();
footerPresenter.init();
