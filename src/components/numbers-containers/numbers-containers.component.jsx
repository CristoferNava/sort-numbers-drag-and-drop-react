// Library
import { useContext } from "react";

// Contexts
import { GameContext } from "../../context/game-context";

// Components
import Number from "../number/number.component";

const NumbersContainer = () => {
  const {
    numbersCards,
    setNumbersCards,
    numbers,
    setNumbers,
    squares,
    setSquares,
  } = useContext(GameContext);
  const dragOver = (event) => {
    event.preventDefault();
  };

  const drop = (event) => {
    const numberToAdd = parseInt(event.dataTransfer.getData("text/plain"));
    // Remove it from the squares (in case that is there)
    for (let idx = 0; idx < squares.length; idx++) {
      if (squares[idx] === numberToAdd) {
        squares[idx] = null;
      }
    }

    // Add the numberToAdd to numbers
    numbers.set(numberToAdd, numberToAdd);
    numbersCards.get(numberToAdd).state = "";
    setNumbers(new Map(numbers));
    setSquares([...squares]);
    setNumbersCards(new Map(numbersCards));
  };

  return (
    <div className="numbers-container" onDragOver={dragOver} onDrop={drop}>
      {[...numbers.values()].map((number) => {
        return (
          <Number
            key={number}
            value={number}
            state={numbersCards.get(number).state}
          />
        );
      })}
    </div>
  );
};

export default NumbersContainer;
