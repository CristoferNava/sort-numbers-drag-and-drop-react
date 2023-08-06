// Library
import { useContext } from "react";

// Contexts
import { GameContext } from "../../context/game-context";

const CheckoutBtn = () => {
  const { numbersCards, setNumbersCards, squares } = useContext(GameContext);
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
    <button className="checkout-btn" onClick={checkGame}>
      Revisar
    </button>
  );
};

export default CheckoutBtn;
