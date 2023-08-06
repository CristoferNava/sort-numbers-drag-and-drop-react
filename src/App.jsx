// 1. Build the layout
// 2. Build the basic drag and drop functionality (drag numbers to squares)
// 3. Implement swap to replace a number in an square
// 4. Swap elements between squares
// 5. Return a placed number in a square to the numbers container
// 6. Move an element already placed into a square to an empty square
// 7. Add styles when checking the game
// 9. Genera the order of the numbers randmoly
// 10. Make a component for the numbers container
// 11. Make a component for the squares container
// 12. Implement the context API to avoid passing so many props to the components
// 13. Move each component to its directory

import { useState, useContext } from "react";
import { GameContext } from "./GameContext";

import "./App.css";

/*
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
*/

function App() {
  /*
  const [numbersCards, setNumbersCards] = useState(generateNumbersCards());
  const [numbers, setNumbers] = useState(generateNumbers(numbersCards));
  const [squares, setSquares] = useState(
    new Array([...numbers.values()].length).fill(null)
  );
  */
  const {
    numbersCards,
    setNumbersCards,
    numbers,
    setNumbers,
    squares,
    setSquares,
  } = useContext(GameContext);

  const checkGame = () => {
    // Check if there are empty squares
    for (const square of squares) {
      if (square == null) {
        alert("Faltan números por acomodar");
        return;
      }
    }

    // Check that the numbers are in the correct position
    for (let idx = 0; idx < squares.length; idx++) {
      if (squares[idx] === idx) {
        console.log(`${idx} is in the correct position`);
        numbersCards.get(idx).state = "correct";
      } else {
        console.log(`${idx} is in the incorrect position`);
        numbersCards.get(idx).state = "incorrect";
      }
    }
    setNumbersCards(new Map(numbersCards));
  };

  return (
    <main className="main">
      <h1 className="main-title">Ordena los números</h1>

      <NumbersContainer
      /*
        numbersCards={numbersCards}
        setNumbersCards={setNumbersCards}
        numbers={numbers}
        setNumbers={setNumbers}
        squares={squares}
        setSquares={setSquares}
        */
      />

      <SquaresContainer
      /*
        numbersCards={numbersCards}
        setNumbersCards={setNumbersCards}
        numbers={numbers}
        setNumbers={setNumbers}
        squares={squares}
        setSquares={setSquares}
        */
      />

      <button className="checkout-btn" onClick={checkGame}>
        Revisar
      </button>
    </main>
  );
}

const NumbersContainer = (/*{
  
  numbersCards,
  setNumbersCards,
  numbers,
  setNumbers,
  squares,
  setSquares,
  
}*/) => {
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

const SquaresContainer = (/*{
  numbersCards,
  setNumbersCards,
  numbers,
  setNumbers,
  squares,
  setSquares,
}*/) => {
  const {
    numbersCards,
    setNumbersCards,
    numbers,
    setNumbers,
    squares,
    setSquares,
  } = useContext(GameContext);
  return (
    <div className="squares-container">
      {squares.map((squareVal, idx) => {
        if (squareVal != null) {
          return (
            <Square
              key={idx}
              id={idx}
              /*
              squares={squares}
              setSquares={setSquares}
              numbers={numbers}
              setNumbers={setNumbers}
              numbersCards={numbersCards}
              setNumbersCards={setNumbersCards}
              */
            >
              <Number
                value={squareVal}
                state={numbersCards.get(squareVal).state}
              />
            </Square>
          );
        }
        return (
          <Square
            key={idx}
            id={idx}
            /*
            numbersCards={numbersCards}
            setNumbersCards={setNumbersCards}
            numbers={numbers}
            setNumbers={setNumbers}
            squares={squares}
            setSquares={setSquares}
            */
          />
        );
      })}
    </div>
  );
};

const Number = ({ value, state }) => {
  const dragStart = (event, number) => {
    event.dataTransfer.setData("text/plain", number);
  };

  return (
    <div
      className={`number ${state}`}
      draggable={true}
      onDragStart={(e) => dragStart(e, value)}
    >
      {value}
    </div>
  );
};

const Square = ({
  id,
  children,
  /*
  numbersCards,
  setNumbersCards,
  numbers,
  setNumbers,
  squares,
  setSquares,
  */
}) => {
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

export default App;
