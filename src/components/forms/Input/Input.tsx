import React from "react";
import "./styles.scss";

type Props = {
  onChange: (value: string) => void;
  value?: string;
  label?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  isChecked?: boolean;
  onKeyDown?: (event: React.KeyboardEvent) => void;
};

const Input = ({
  onChange,
  value,
  className = "",
  disabled,
  placeholder = "",
  onKeyDown,
  label,
  type = "text",
  isChecked,
  ...props
}: Props | any) => {
  const [inputValue, setInputValue] = React.useState(value);

  React.useEffect(() => {
    if (inputValue !== value) setInputValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const getInput = () => {
    switch (type) {
      case "checkbox":
        return (
          <input
            type={type}
            className={`cs-input checkbox ${className}`}
            checked={isChecked}
            onChange={() => onChange(!isChecked)}
            {...props}
          />
        );

      default:
        return (
          <input
            type={type}
            className={`cs-input ${className}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => onChange(inputValue)}
            disabled={disabled}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            {...props}
          />
        );
    }
  };

  return (
    <div className="input-wrapper">
      {label && <label>{label}</label>}
      {getInput()}
      {/* <input
        type={type}
        className={`cs-input ${className}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={() => onChange(inputValue)}
        disabled={disabled}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        {...props}
      /> */}
    </div>
  );
};

export default Input;
