import {getRandomElementFromArray, generateId} from '../utils.js';
import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import {MAX_PAST_COMMENT_YEAR} from '../const.js';

dayjs.extend(dayjsRandom);

const emotions = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const authors = [
  'Melissa',
  'Judson',
  'Gregg',
  'Jay',
  'Margie',
  'Zane',
  'Melba',
  'Keenan',
  'Rudy',
  'Megane',
];

const comments = [
  'Voluptatibus dolores ea esse. Eveniet aut sit quis praesentium quibusdam minima.',
  'Adipisci ut est voluptatum et vel itaque amet.',
  'Et ea nihil velit officiis cupiditate quas ut voluptates. Eum aut accusantium pariatur sed voluptates maiores aut. Optio commodi nulla repellendus autem.',
  'Maxime illum cumque excepturi.',
  'Aperiam doloremque et repellendus asperiores dolore ipsa itaque. Consequatur voluptatem numquam aliquam recusandae in velit sequi.',
  'Quo libero vitae perspiciatis recusandae ea rerum. Qui vero deleniti earum possimus odit qui veniam numquam. Consequatur voluptatem et quo rerum sit aut.',
  'Suscipit magnam nobis ut minus deserunt quia nisi aut maxime.',
  'Sequi necessitatibus voluptatem asperiores nesciunt. Rem saepe totam.',
  'Quia aut iste recusandae.',
  'Porro dolor unde ut vel veritatis dolore non ipsa.',
];

/**
 * Генерирует случайную дату в диапазоне
 * текущая дата - 5 лет
 * @returns {Date}
 */
const generateDate = () => {
  const pastTime = dayjs().subtract(MAX_PAST_COMMENT_YEAR, 'years');
  return dayjs.between(pastTime, dayjs()).format('YYYY/MM/DD HH:mm');
};

export const generateComment = () => ({
  id: generateId(),
  author: getRandomElementFromArray(authors),
  comment: getRandomElementFromArray(comments),
  date: generateDate(),
  emotion: getRandomElementFromArray(emotions),
});
