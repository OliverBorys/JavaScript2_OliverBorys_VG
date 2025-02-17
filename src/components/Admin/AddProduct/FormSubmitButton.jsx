import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SubmitButton = ({ text, disabled }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!disabled) {
      setTimeout(() => {
        navigate("/admin"); // Redirect to /admin after clicking
      }, 500);
    }
  };

  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={disabled}
      className={`p-2 font-medium rounded-md block mx-auto transition-all ${
        disabled
          ? "bg-gray-400 text-gray-900 cursor-not-allowed"
          : "border border-blue-500 bg-white text-blue-500 hover:bg-blue-500 hover:text-white transition-all text-center rounded"
      }`}
    >
      {text}
    </button>
  );
};

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SubmitButton;
