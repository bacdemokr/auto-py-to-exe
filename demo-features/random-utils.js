// 랜덤한 기능 간단하게 하나 추가해봐
// PM → Dev. 2026-10-19T00:39:20.908Z

// Usage: const { getRandomInt, pickRandom } = require('./random-utils');

function getRandomInt(min, max) {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError('min and max must be integers.');
  }

  if (min > max) {
    throw new RangeError('min must be less than or equal to max.');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(items) {
  if (!Array.isArray(items)) {
    throw new TypeError('items must be an array.');
  }

  if (items.length === 0) {
    throw new RangeError('items must not be empty.');
  }

  return items[getRandomInt(0, items.length - 1)];
}

module.exports = {
  getRandomInt,
  pickRandom
};

if (require.main === module) {
  console.log('Random integer:', getRandomInt(1, 10));
  console.log('Random item:', pickRandom(['apple', 'banana', 'cherry']));
}
