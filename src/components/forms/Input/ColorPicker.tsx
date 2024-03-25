import { HexColorPicker } from "react-colorful";
import "./styles.scss";
import { useState } from "react";

const ColorPicker = ({
  color,
  label = "",
  onColorChanged,
}: {
  color: string;
  label?: string;
  onColorChanged: (color: string) => void;
}) => {
  const [value, setValue] = useState(color);
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setPickerVisible(false);
    onColorChanged(value);
  };

  return (
    <div className="colors-picker" onClick={() => setPickerVisible(true)}>
      {label} <b style={{ textTransform: "uppercase" }}>{color}</b>
      <span
        className="color-item"
        style={{
          backgroundColor: color,
        }}
      />
      {pickerVisible && (
        <div className="picker-wrapper" onClick={handleClick}>
          <HexColorPicker
            color={value}
            onChange={(v) => setValue(v)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
