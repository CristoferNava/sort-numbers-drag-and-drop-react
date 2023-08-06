// Library
import { useContext } from "react";

// Contexts
import { GameContext } from "../../context/game-context";

// Styles
import "./checkout-btn.styles.css";

const CheckoutBtn = () => {
  const { numbersCards, setNumbersCards, squares, setShowMessage } =
    useContext(GameContext);
  const checkGame = () => {
    // Check if there are empty squares
    for (const square of squares) {
      if (square == null) {
        setShowMessage({
          message: "¡Faltan números por agregar!",
          status: "message--warning",
        });
        return;
      }
    }

    let won = true;
    // Check that the numbers are in the correct position
    for (let idx = 0; idx < squares.length; idx++) {
      if (squares[idx] === idx) {
        console.log(`${idx} is in the correct position`);
        numbersCards.get(idx).state = "correct";
      } else {
        console.log(`${idx} is in the incorrect position`);
        won = false;
        numbersCards.get(idx).state = "incorrect";
      }
    }
    setShowMessage({
      message: "¡Números acomodados incorrectamente!",
      status: "message--error",
    });
    setNumbersCards(new Map(numbersCards));

    // Check for game won
    if (won) {
      setShowMessage({
        message: "¡Ganaste!",
        status: "message--success",
      });
    }
  };

  return (
    <button className="checkout-btn" onClick={checkGame}>
      Revisar
    </button>
  );
};

export default CheckoutBtn;
