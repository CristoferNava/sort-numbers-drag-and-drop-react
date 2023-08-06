import { createContext, useState } from "react";
import { generateNumbersCards, generateNumbers } from "../utils";

// const [numbersCards, setNumbersCards] = useState(
//   new Map([
//     [2, { value: 2, state: "" }],
//     [1, { value: 1, state: "" }],
//     [3, { value: 3, state: "" }],
//     [0, { value: 0, state: "" }],
//     [4, { value: 4, state: "" }],
//   ])
// );

// const [numbers, setNumbers] = useState(
//   new Map([
//     [2, 2],
//     [1, 1],
//     [3, 3],
//     [0, 0],
//     [4, 4],
//   ])
// );

const initialValue = {
  numbersCards: new Map(),
  setNumbersCards: () => {},
  numbers: new Map(),
  setNumbers: () => {},
  squares: [],
  setSquares: () => {},
};

export const GameContext = createContext(initialValue);

export const GameContextProvider = ({ children }) => {
  const [numbersCards, setNumbersCards] = useState(generateNumbersCards());
  const [numbers, setNumbers] = useState(generateNumbers(numbersCards));
  const [squares, setSquares] = useState(
    new Array([...numbers.values()].length).fill(null)
  );
  const [showMessage, setShowMessage] = useState({ message: "", status: "" });

  const value = {
    numbersCards,
    setNumbersCards,
    numbers,
    setNumbers,
    squares,
    setSquares,
    showMessage,
    setShowMessage,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
