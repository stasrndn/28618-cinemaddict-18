import {ESC_KEY, ESCAPE_KEY, TAG_HREF, TAG_SPAN, ENTER_KEY} from '../const.js';

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

export {
  isEscapeKey,
  isCtrlEnterPressed,
  isLinkClicked,
  isFilterItemClick,
  isControlButton,
};
