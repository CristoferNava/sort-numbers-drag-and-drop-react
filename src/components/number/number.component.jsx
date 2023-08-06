// Styles
import "./number.styles.css";

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

export default Number;
