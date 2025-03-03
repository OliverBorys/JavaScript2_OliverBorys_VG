import PropTypes from "prop-types";

const FormTextarea = ({ label, name, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-700 font-medium ml-2 mb-1">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="border p-2 w-full rounded-md outline-none focus:bg-[#fdf5eb]"
        rows="4"
      ></textarea>
    </div>
  );
};

FormTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormTextarea;
