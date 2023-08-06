// Styles
import "./checkout-message.styles.css";

const CheckoutMessage = ({ message, status }) => {
  return <div className={`checkout-message ${status}`}>{message}</div>;
};

export default CheckoutMessage;
