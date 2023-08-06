function swap(array, idx1, idx2) {
  const temp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = temp;
}

function shuffleArray(array) {
  for (let i = 1; i <= 25; i++) {
    const idx1 = Math.floor(Math.random() * array.length);
    const idx2 = Math.floor(Math.random() * array.length);
    swap(array, idx1, idx2);
  }
}

function generateNumbersCards() {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  shuffleArray(numbers);
  const numbersCards = new Map();

  for (const number of numbers) {
    numbersCards.set(number, { value: number, state: "" });
  }
  return numbersCards;
}

function generateNumbers(numbersCards) {
  const numbers = new Map();
  for (const number of numbersCards.keys()) {
    numbers.set(number, number);
  }
  return numbers;
}

export { generateNumbersCards, generateNumbers };
