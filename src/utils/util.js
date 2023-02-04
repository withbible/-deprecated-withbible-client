const MAX_ILLUST_NUMBER = 9;

export function getRandomNumber() {
  const max = MAX_ILLUST_NUMBER;
  const min = 1;

  return Math.floor(Math.random() * max + min);
}

export function getIllustNumbers(length) {
  const result = [];

  for (let i = 0; i < length; i += 1) {
    result.push(getRandomNumber());
  }

  return result;
}

export function getTotalStep(length) {
  return length - 1;
}

export function findHistory({ iteratee, key, target }) {
  return iteratee?.find((each) => each[key] === target);
}
