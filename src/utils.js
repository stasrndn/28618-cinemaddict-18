import {ESC_KEY, ESCAPE_KEY, TAG_HREF, TAG_SPAN, ID_SIZE, ID_VALID_SYMBOLS, ENTER_KEY} from './const.js';
import {customAlphabet} from 'nanoid';

/**
 * Генерирует случайное целое число
 * @param a - целое число
 * @param b - целое число
 * @returns {number}
 */
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

/**
 * Генерирует случайное дробное число
 * @param a - дробное число
 * @param b - дробное число
 * @param digits - требуемое количество знаков после точки
 * @returns {number}
 */
const getRandomFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

/**
 * Возвращает true, если нажата клавиша Escape
 * @param evt
 * @returns {boolean}
 */
const isEscapeKey = (evt) => (evt.key === ESCAPE_KEY || evt.key === ESC_KEY);

/**
 * Возвращает true, если был произведен клик по ссылке
 * @param evt
 * @returns {boolean}
 */
const isLinkClicked = (evt) => (evt.target.tagName === TAG_HREF);

/**
 * Возвращает true, если был произведен клик
 * по элементу в фильтре
 * @param evt
 * @returns {boolean}
 */
const isFilterItemClick = (evt) => ((evt.target.tagName === TAG_HREF) || (evt.target.tagName === TAG_SPAN));

/**
 * Проверяет, что нажата одна из кнопок
 * на карточке фильма
 * @param evt
 * @returns {boolean}
 */
const isControlButton = (evt) => evt.target.classList.contains('film-card__controls-item');

/**
 * Проверяет, что нажаты клавиши Ctrl + Enter
 * @param evt
 * @returns {boolean}
 */
const isCtrlEnterPressed = (evt) => ((evt.ctrlKey || evt.metaKey) && evt.key === ENTER_KEY);

/**
 * Генерирует случайный идентификатор
 * @param alphabet - допустимые символы идентификатора
 * @param size - длина идентификатора
 * @returns {string}
 */
const generateId = (alphabet = ID_VALID_SYMBOLS, size = ID_SIZE) => {
  const nanoid = customAlphabet(alphabet, size);
  return nanoid();
};

/**
 * Выбирает случайный элемент массива
 * @param array
 * @returns {*}
 */
const getRandomElementFromArray = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

export {
  getRandomElementFromArray,
  getRandomInteger,
  getRandomFloat,
  isEscapeKey,
  isCtrlEnterPressed,
  isLinkClicked,
  isFilterItemClick,
  isControlButton,
  generateId,
};
