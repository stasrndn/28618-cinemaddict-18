/**
 * Тип фильтра для списка фильмов
 * @type {{ALL: string, WATCHLIST: string, FAVORITES: string, HISTORY: string}}
 */
const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

/**
 * Тип сортировки списка
 * @type {{DATE: string, RATING: string, DEFAULT: string}}
 */
const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

/**
 * Типы сортировки
 * @type {[{name: string, type: string},{name: string, type: string},{name: string, type: string}]}
 */
const SORT_TYPES = [
  {
    name: 'Sort by default',
    type: 'default',
  },
  {
    name: 'Sort by date',
    type: 'date',
  },
  {
    name: 'Sort by rating',
    type: 'rating',
  }
];

/**
 * Список эмоций
 * @type {string[]}
 */
const EMOTIONS_LIST = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

/**
 * Тип обновления элемента интерфейса
 * @type {{MAJOR: string, MINOR: string, PATCH: string}}
 */
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

/**
 * Методы запросов к серверу
 * @type {{POST: string, PUT: string}}
 */
const Method = {
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

/**
 * Действия пользователя
 * @type {{UPDATE_FILM: string, DELETE_FILM: string, ADD_FILM: string}}
 */
const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_FILM: 'ADD_FILM',
  DELETE_FILM: 'DELETE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

/**
 * Звания пользователя
 * @type {{FAN: string, MOVIE_BUFF: string, NOVICE: string}}
 */
const UserType = {
  NOVICE: 'novice',
  FAN: 'fan',
  MOVIE_BUFF: 'movie buff',
};

/**
 * Максимальное количество фильмов,
 * отдаваемых моделью
 * @type {number}
 */
const MAX_FILMS_COUNT = 22;

/**
 * Максимальное количество комментариев,
 * отдаваемых моделью
 * @type {number}
 */
const MAX_COMMENTS_COUNT = 25;

/**
 * Максимальное количество комментариев у фильмов
 * @type {number}
 */
const MAX_FILM_COMMENT_COUNT = 11;

/**
 * Максимальное количество символов описания
 * в карточке фильма
 * @type {number}
 */
const MAX_LENGTH_DESCRIPTION_FILM = 139;

/**
 * Нырнуть в прошлое максимум на 5 лет
 * @type {number}
 */
const MAX_PAST_COMMENT_YEAR = 5;

/**
 * Наименование клавиши Escape
 * @type {string}
 */
const ESCAPE_KEY = 'Escape';

/**
 * Наименование клавиши Enter
 * @type {string}
 */
const ENTER_KEY = 'Enter';

/**
 * Наименование тега ссылки
 * @type {string}
 */
const TAG_HREF = 'A';

/**
 * Наименование тега span
 * @type {string}
 */
const TAG_SPAN = 'SPAN';

/**
 * Наименование клавиши Esc
 * @type {string}
 */
const ESC_KEY = 'Esc';

/**
 * Допустимые символы ID при генерации
 * @type {string}
 */
const ID_VALID_SYMBOLS = '1234567890';

/**
 * Длина генерируемого идентификатора
 * @type {number}
 */
const ID_SIZE = 10;

/**
 * Сколько фильмов отрисовать за один шаг
 * @type {number}
 */
const FILM_COUNT_PER_STEP = 5;

/**
 * Название кнопки во время удаления комментария
 * @type {string}
 */
const DELETE_COMMENT_BUTTON_TEXT = 'Deleting...';

export {
  FilterType,
  SortType,
  SORT_TYPES,
  MAX_FILMS_COUNT,
  MAX_COMMENTS_COUNT,
  MAX_FILM_COMMENT_COUNT,
  MAX_LENGTH_DESCRIPTION_FILM,
  MAX_PAST_COMMENT_YEAR,
  DELETE_COMMENT_BUTTON_TEXT,
  ESCAPE_KEY,
  ENTER_KEY,
  TAG_HREF,
  TAG_SPAN,
  ESC_KEY,
  ID_VALID_SYMBOLS,
  ID_SIZE,
  FILM_COUNT_PER_STEP,
  EMOTIONS_LIST,
  UpdateType,
  UserAction,
  UserType,
  Method,
};
