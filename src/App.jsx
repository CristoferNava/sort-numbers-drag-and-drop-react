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

// Library
import { useContext } from "react";

// Contexts
import { GameContext } from "./GameContext";

// Components
import NumbersContainer from "./components/numbers-containers/numbers-containers.component";
import SquaresContainer from "./components/squares-container/squares-container.component";

import "./App.css";

function App() {
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

      <NumbersContainer />
      <SquaresContainer />

      <button className="checkout-btn" onClick={checkGame}>
        Revisar
      </button>
    </main>
  );
}

export default App;
