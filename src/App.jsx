// 1. Build the layout

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

  console.log(squares);
  return (
    <main className="main">
      <h1 className="main-title">Ordena los números</h1>

      <div className="numbers-container">
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
    const numberToAdd = parseInt(event.dataTransfer.getData("text/plain"));
    console.log(numberToAdd);

    // Add the number to the squareIdx
    squares[squareIdx] = numberToAdd;
    setSquares([...squares]);

    // Remove the number of the numbers
    numbers.delete(numberToAdd);
    setNumbers(new Map(numbers));
  };

  return (
    <div className="square" onDragOver={dragOver} onDrop={(e) => drop(e, id)}>
      {children}
    </div>
  );
};

export default App;
