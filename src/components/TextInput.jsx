import PropTypes from "prop-types";

const TextInput = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  onChange,
  value,
  classes,
  error,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`block w-full px-3 rounded-md py-3 text-gray-900 shadow-md placeholder:text-gray-500 focus:outline-none focus:ring-primary transition ease-in-out sm:text-sm sm:leading-6 ${classes}`}
      />
      {error && (
        <strong className="text-red-600 font-semibold text-[12px] max-[640px]:text-[14px]">
          *{error}*
        </strong>
      )}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.string,
  error: PropTypes.string,
};

export default TextInput;
