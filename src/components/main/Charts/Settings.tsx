import React from "react";
import Input from "../../forms/Input/Input";
import { FaChartLine } from "react-icons/fa6";
import { FaChartColumn } from "react-icons/fa6";
import Segment from "../../forms/Input/Segment";
import ColorPicker from "../../forms/Input/ColorPicker";

const charts = [
  { id: "line", component: <FaChartLine className="icon" /> },
  { id: "bar", component: <FaChartColumn className="icon" /> },
];

const Settings = ({
  filters,
  updateFilters,
}: {
  filters: any;
  updateFilters: (chartFilters: any) => void;
}) => {
  const [chartFilters, setChartFilters] = React.useState(filters);

  return (
    <div className="chart-settings">
      <div className="row">
        <Input
          onChange={(value: string) =>
            setChartFilters((prev: any) => ({
              ...prev,
              options: {
                ...prev.options,
                title: value,
              },
            }))
          }
          value={chartFilters.options.title}
          placeholder="Enter a title for the chart"
          label="Title"
        />
        <div className="row charts-options">
          {charts.map((item) => (
            <Segment
              key={item.id}
              isActive={chartFilters.type === item.id}
              onClick={() =>
                chartFilters.type !== item &&
                setChartFilters((prev: any) => ({
                  ...prev,
                  type: item.id,
                }))
              }
            >
              {item.id} {item.component}
            </Segment>
          ))}
        </div>
      </div>
      <div className="styling">
        <ColorPicker
          label="Layout Background"
          color={chartFilters.styles.chartBackground}
          onColorChanged={(color) => {
            setChartFilters((prev: any) => ({
              ...prev,
              styles: { ...prev.styles, chartBackground: color },
            }));
          }}
        />
        <ColorPicker
          label={`${chartFilters.type === "line" ? "Line" : "Border"} Color`}
          color={chartFilters.styles.borderColor}
          onColorChanged={(color) => {
            setChartFilters((prev: any) => ({
              ...prev,
              styles: { ...prev.styles, borderColor: color },
            }));
          }}
        />
        <ColorPicker
          label={"Chart Background"}
          color={chartFilters.styles.backgroundColor}
          onColorChanged={(color) => {
            setChartFilters((prev: any) => ({
              ...prev,
              styles: { ...prev.styles, backgroundColor: color },
            }));
          }}
        />
        <ColorPicker
          label={`Hover ${
            chartFilters.type === "line" ? "Line" : "Border"
          } Color`}
          color={chartFilters.styles.hoverBorderColor}
          onColorChanged={(color) => {
            setChartFilters((prev: any) => ({
              ...prev,
              styles: { ...prev.styles, hoverBorderColor: color },
            }));
          }}
        />
        <div className="input-styles">
          <Input
            label="Border Width"
            type="number"
            value={chartFilters.styles.borderWidth}
            onChange={(text: string) =>
              setChartFilters((prev: any) => ({
                ...prev,
                styles: { ...prev.styles, borderWidth: text },
              }))
            }
            min="0.1"
            max="10"
            className="border-input"
          />
        </div>
      </div>
      <div className="axes">
        <h4>Axes</h4>
        <div className="styling">
          <div className="input-styles">
            <Input
              label="Display X-Axes Title"
              type="checkbox"
              isChecked={chartFilters.styles.x.display}
              onChange={(checked: boolean) =>
                setChartFilters((prev: any) => ({
                  ...prev,
                  styles: {
                    ...prev.styles,
                    x: { ...prev.styles.x, display: checked },
                  },
                }))
              }
              className="checkbox-input"
            />
          </div>
          <div className="input-styles">
            <Input
              onChange={(value: string) =>
                setChartFilters((prev: any) => ({
                  ...prev,
                  styles: {
                    ...prev.styles,
                    x: { ...prev.styles.x, text: value },
                  },
                }))
              }
              value={chartFilters.styles.x.text}
              placeholder="Enter a title for X-Axes"
              label="Title"
            />
          </div>
          <ColorPicker
            label="Color"
            color={chartFilters.styles.x.color}
            onColorChanged={(color) => {
              setChartFilters((prev: any) => ({
                ...prev,
                styles: {
                  ...prev.styles,
                  x: { ...prev.styles.x, color },
                },
              }));
            }}
          />

          <div className="input-styles">
            <Input
              label="Display Y-Axes Title"
              type="checkbox"
              isChecked={chartFilters.styles.y.display}
              onChange={(checked: boolean) =>
                setChartFilters((prev: any) => ({
                  ...prev,
                  styles: {
                    ...prev.styles,
                    y: { ...prev.styles.y, display: checked },
                  },
                }))
              }
              className="checkbox-input"
            />
          </div>
          <div className="input-styles">
            <Input
              onChange={(value: string) =>
                setChartFilters((prev: any) => ({
                  ...prev,
                  styles: {
                    ...prev.styles,
                    y: { ...prev.styles.y, text: value },
                  },
                }))
              }
              value={chartFilters.styles.y.text}
              placeholder="Enter a title for Y-Axes"
              label="Title"
            />
          </div>
          <ColorPicker
            label="Color"
            color={chartFilters.styles.y.color}
            onColorChanged={(color) => {
              setChartFilters((prev: any) => ({
                ...prev,
                styles: {
                  ...prev.styles,
                  y: { ...prev.styles.y, color },
                },
              }));
            }}
          />
        </div>
      </div>
      <div className="axes">
        <h4>Intervals</h4>
        <div className="styling">
          <div className="input-styles intervals">
            <Input
              label="X - Auto"
              type="checkbox"
              isChecked={chartFilters.intervals.x.isAuto}
              onChange={(checked: boolean) =>
                setChartFilters((prev: any) => ({
                  ...prev,
                  intervals: {
                    ...prev.intervals,
                    x: { ...prev.intervals.x, isAuto: checked },
                  },
                }))
              }
              className="checkbox-input"
            />
            {!chartFilters.intervals.x.isAuto && (
              <Input
                label="X - Max Ticks Limit"
                type="number"
                value={chartFilters.intervals.x.value || ""}
                onChange={(text: string) =>
                  setChartFilters((prev: any) => ({
                    ...prev,
                    intervals: {
                      ...prev.intervals,
                      x: { isAuto: false, value: text },
                    },
                  }))
                }
                min="2"
                className="border-input"
              />
            )}
          </div>

          <div className="input-styles intervals">
            <Input
              label="Y - Auto"
              type="checkbox"
              isChecked={chartFilters.intervals.y.isAuto}
              onChange={(checked: boolean) =>
                setChartFilters((prev: any) => ({
                  ...prev,
                  intervals: {
                    ...prev.intervals,
                    y: { ...prev.intervals.y, isAuto: checked },
                  },
                }))
              }
              className="checkbox-input"
            />
            {!chartFilters.intervals.y.isAuto && (
              <Input
                label="Y - Steps"
                type="number"
                value={chartFilters.intervals.y.value || ""}
                onChange={(text: string) =>
                  setChartFilters((prev: any) => ({
                    ...prev,
                    intervals: {
                      ...prev.intervals,
                      y: { isAuto: false, value: text },
                    },
                  }))
                }
                min="2"
                className="border-input"
              />
            )}
          </div>
        </div>
      </div>
      <div className="settings-footer">
        {JSON.stringify(chartFilters) !== JSON.stringify(filters) && (
          <i>Unsaved changes</i>
        )}
        <button
          className="primary-btn"
          onClick={() =>
            JSON.stringify(chartFilters) !== JSON.stringify(filters) &&
            updateFilters(chartFilters)
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Settings;
