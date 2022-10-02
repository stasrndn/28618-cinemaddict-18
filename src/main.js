import HeaderPresenter from './presenter/header-presenter.js';
import FooterPresenter from './presenter/footer-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import FilmsEmptyPresenter from './presenter/films-empty-presenter.js';
import FilmsListLoadingPresenter from './presenter/films-list-loading-presenter.js';

import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';

import FilmsApiService from './api-services/films-api-service.js';
import CommentsApiService from './api-services/comments-api-service.js';

const AUTHORIZATION = 'Basic rRt6Oo3q3jznIpMT';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict';

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');

const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const headerPresenter = new HeaderPresenter(siteBodyElement, {filmsModel});
const filterPresenter = new FilterPresenter(siteMainElement, {filmsModel, filterModel});
const filmsListPresenter = new FilmsListPresenter({siteBodyElement, siteMainElement}, {filmsModel, commentsModel, filterModel});
const filmsEmptyPresenter = new FilmsEmptyPresenter(siteMainElement, {filmsModel});
const filmsListLoadingPresenter = new FilmsListLoadingPresenter(siteMainElement);
const footerPresenter = new FooterPresenter(siteBodyElement, {filmsModel});

headerPresenter.init();
filterPresenter.init();
footerPresenter.init();
filmsListPresenter.init();
filmsListLoadingPresenter.init();

filmsModel.init().finally(() => {
  filmsListLoadingPresenter.destroy();
  filmsEmptyPresenter.init();
});
