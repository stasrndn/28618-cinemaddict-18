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
const isEscapeKey = (evt) => evt.key === 'Escape';

/**
 * Генерирует случайный идентификатор
 * @param alphabet - допустимые символы идентификатора
 * @param size - длина идентификатора
 * @returns {string}
 */
const generateId = (alphabet = '1234567890', size = 10) => {
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
  generateId,
};
