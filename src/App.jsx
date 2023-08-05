// 1. Build the layout
// 2. Build the basic drag and drop functionality (drag numbers to squares)
// 3. Implement swap to replace a number in an square
// 4. Swap elements between squares
// 5. Return a placed number in a square to the numbers container
// 6. Move an element

import { useState } from "react";

import "./App.css";

function App() {
  const [numbers, setNumbers] = useState(
    new Map([
      [2, 2],
      [1, 1],
      [3, 3],
      [5, 5],
      [4, 4],
    ])
  );
  const [squares, setSquares] = useState(
    new Array([...numbers.values()].length).fill(null)
  );

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
    setNumbers(new Map(numbers));
    setSquares([...squares]);
  };

  return (
    <main className="main">
      <h1 className="main-title">Ordena los números</h1>

      <div className="numbers-container" onDragOver={dragOver} onDrop={drop}>
        {[...numbers.values()].map((number) => {
          return <Number key={number} value={number} />;
        })}
      </div>

      <div className="squares-container">
        {squares.map((squareVal, idx) => {
          if (squareVal != null) {
            return (
              <Square
                key={idx}
                id={idx}
                squares={squares}
                setSquares={setSquares}
                numbers={numbers}
                setNumbers={setNumbers}
              >
                <Number value={squareVal} />
              </Square>
            );
          }
          return (
            <Square
              key={idx}
              id={idx}
              squares={squares}
              setSquares={setSquares}
              numbers={numbers}
              setNumbers={setNumbers}
            />
          );
        })}
      </div>

      <button className="checkout-btn">Revisar</button>
    </main>
  );
}

const Number = ({ value }) => {
  const dragStart = (event, number) => {
    event.dataTransfer.setData("text/plain", number);
  };

  return (
    <div
      className="number"
      draggable={true}
      onDragStart={(e) => dragStart(e, value)}
    >
      {value}
    </div>
  );
};

const Square = ({ id, children, squares, setSquares, numbers, setNumbers }) => {
  const dragOver = (event) => {
    event.preventDefault();
    console.log("You are dragging over me");
  };

  const drop = (event, squareIdx) => {
    console.log("You dropped over me, ", squareIdx);
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

    // Add the number to the squareIdx
    squares[squareIdx] = numberToAdd;
    // Remove the number of the numbers
    numbers.delete(numberToAdd);

    setSquares([...squares]);
    setNumbers(new Map(numbers));
  };

  return (
    <div className="square" onDragOver={dragOver} onDrop={(e) => drop(e, id)}>
      {children}
    </div>
  );
};

export default App;
