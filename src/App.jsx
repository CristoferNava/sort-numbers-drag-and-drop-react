// 1. Build the layout

import { useState } from "react";

import "./App.css";

function App() {
  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5]);
  const [squares, setSquares] = useState(new Array(numbers.length).fill(null));

  return (
    <main className="main">
      <h1 className="main-title">Ordena los números</h1>

      <div className="numbers-container">
        {numbers.map((number) => {
          return <Number key={number} value={number} />;
        })}
      </div>

      <div className="squares-container">
        {squares.map((square, idx) => {
          return <Square key={idx} />;
        })}
      </div>
    </main>
  );
}

const Number = ({ value }) => {
  return <div className="number">{value}</div>;
};

const Square = () => {
  return <div className="square"></div>;
};

export default App;
