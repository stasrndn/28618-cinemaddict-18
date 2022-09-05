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

export {
  getRandomInteger,
  getRandomFloat,
  isEscapeKey,
};
