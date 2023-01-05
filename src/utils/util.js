export function getRandomNumber() {
  const max = 9;
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
