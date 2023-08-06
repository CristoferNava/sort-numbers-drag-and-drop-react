// Library
import { useContext } from "react";

// Contexts
import { GameContext } from "../../GameContext";

const Square = ({ id, children }) => {
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

  const drop = (event, squareIdx) => {
    // Check if the square has already a number
    const numberToAdd = parseInt(event.dataTransfer.getData("text/plain"));
    const currentNumberPlaced = squares[squareIdx];
    if (currentNumberPlaced != null) {
      // We have to options:
      //  1) The number comes from the numbers container
      //  2) The number comes from another square
      if (numbers.has(numberToAdd)) {
        numbers.set(currentNumberPlaced, currentNumberPlaced);
      } else {
        // Find in which square idx is the numberToAdd
        for (let idx = 0; idx < squares.length; idx++) {
          if (squares[idx] === numberToAdd) {
            squares[idx] = currentNumberPlaced;
            break;
          }
        }
      }
    }

    // Already in a square and will move to another one
    for (let idx = 0; idx < squares.length; idx++) {
      if (squares[idx] === numberToAdd) {
        squares[idx] = null;
        break;
      }
    }

    // Clean the current class of the numberCard
    // Add the number to the squareIdx

    numbersCards.get(numberToAdd).state = "";

    squares[squareIdx] = numberToAdd;
    // Remove the number of the numbers
    numbers.delete(numberToAdd);

    setSquares([...squares]);
    setNumbers(new Map(numbers));
    setNumbersCards(new Map(numbersCards));
  };

  return (
    <div className="square" onDragOver={dragOver} onDrop={(e) => drop(e, id)}>
      {children}
    </div>
  );
};

export default Square;
