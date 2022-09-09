import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const container = document.body;

const commentsModel = new CommentsModel();
const filmsModel = new FilmsModel(commentsModel);
const filmsPresenter = new FilmsPresenter(container, filmsModel, commentsModel);

filmsPresenter.init();
