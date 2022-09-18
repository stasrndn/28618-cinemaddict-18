import HeaderPresenter from './presenter/header-presenter';
import MainPresenter from './presenter/main-presenter';
import FooterPresenter from './presenter/footer-presenter';

import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const container = document.body;

const commentsModel = new CommentsModel();
const filmsModel = new FilmsModel(commentsModel);

const headerPresenter = new HeaderPresenter(container);
const mainPresenter = new MainPresenter(container, filmsModel, commentsModel);
const footerPresenter = new FooterPresenter(container);

headerPresenter.init();
mainPresenter.init();
footerPresenter.init();
