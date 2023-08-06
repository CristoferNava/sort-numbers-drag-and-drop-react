// Library
import { useContext } from "react";

// Contexts
import { GameContext } from "../../GameContext";

// Components
import Number from "../number/number.component";
import Square from "../square/square.component";

const SquaresContainer = () => {
  const { numbersCards, squares } = useContext(GameContext);
  return (
    <div className="squares-container">
      {squares.map((squareVal, idx) => {
        if (squareVal != null) {
          return (
            <Square key={idx} id={idx}>
              <Number
                value={squareVal}
                state={numbersCards.get(squareVal).state}
              />
            </Square>
          );
        }
        return <Square key={idx} id={idx} />;
      })}
    </div>
  );
};

export default SquaresContainer;
