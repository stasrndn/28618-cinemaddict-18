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

export {
  MAX_FILMS_COUNT,
  MAX_COMMENTS_COUNT,
  MAX_FILM_COMMENT_COUNT,
  MAX_LENGTH_DESCRIPTION_FILM,
  MAX_PAST_COMMENT_YEAR,
  ESCAPE_KEY,
  ESC_KEY,
  ID_VALID_SYMBOLS,
  ID_SIZE,
  FILM_COUNT_PER_STEP,
};
