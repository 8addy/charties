import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  TimeScale,
  ChartOptions,
  LogarithmicScale,
} from "chart.js";
import "chartjs-adapter-luxon";
import { Line, Bar } from "react-chartjs-2";
import { DateTime } from "luxon";
import { handleMaxX, handleMinX } from "../../../utils/helpers";
import "./styles.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  LogarithmicScale,
  {
    // for displaying a verticla line when hovering over chart
    id: "serie_id",
    afterDraw: function (chart: any) {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const activePoint = chart.tooltip._active[0];
        const ctx = chart.ctx;
        const x = activePoint.element.x;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#777";
        ctx.stroke();
        ctx.restore();
      }
    },
  },
  {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = options.color || "#fff";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  }
);

const Charts = ({
  observations = [],
  chartFilters,
  datesFilters,
}: {
  observations: any;
  chartFilters: any;
  datesFilters: any;
}) => {
  const [dataSets, setDataSets] = useState<ChartData<"line" | "bar">>({
    labels: [],
    datasets: [
      {
        label: "Serie",
        data: [],
        borderColor: "#00deff",
        backgroundColor: "#00deff6b",
        hoverBorderColor: "#0bcbe7",
        pointStyle: false,
        borderWidth: 1,
        hoverBorderWidth: 1.4,
      },
    ],
  });
  const [options, setOptions] = useState<ChartOptions>({
    responsive: true,
    spanGaps: true,
    hover: { mode: "dataset", intersect: false },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: chartFilters?.options?.title || "",
      },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            return DateTime.fromMillis(context[0]?.parsed.x).toFormat(
              "MMMM yyyy"
            );
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        text: "Dates",
        type: "time",
        time: {
          unit: datesFilters.quickDate === "1Y" ? "month" : "year",
          minUnit: "month",
        },
        max: handleMaxX(datesFilters.quickDate),
        min: handleMinX(datesFilters.quickDate),
        ticks: {
          maxTicksLimit: chartFilters.intervals.x.isAuto
            ? null
            : chartFilters.intervals.x.value,
          callback: function (value: any, index: any, values: any) {
            // Check if the current index is the index of the last point and return an empty label
            if (
              datesFilters.quickDate !== "1Y" &&
              index === values.length - 1
            ) {
              return "";
            } else {
              if (datesFilters.quickDate === "1Y")
                return DateTime.fromMillis(value).toFormat("yyyy LLL");
              return DateTime.fromMillis(value).toFormat("yyyy");
            }
          },
        },
      },
      y: {
        ticks: {
          stepSize: chartFilters.intervals.y.isAuto
            ? null
            : chartFilters.intervals.y.value,
        },
        grid: {
          color: (context: any) => {
            if (context.tick.value === 0) {
              return "gray";
            }

            return "#eee";
          },
        },
      },
    },
  } as unknown as ChartOptions);

  useEffect(() => {
    let labels: string[] = [];
    let values: string[] = [];
    observations.forEach((element: any) => {
      labels.push(element.date);
      values.push(element.value);
    });

    setDataSets(
      (prev) =>
        ({
          labels,
          datasets: [
            {
              ...prev.datasets[0],
              data: values,
            },
          ],
        } as unknown as ChartData<"line" | "bar">)
    );
  }, [observations]);

  useEffect(() => {
    setOptions(
      (prev) =>
        ({
          ...prev,
          plugins: {
            ...prev.plugins,
            title: {
              ...prev.plugins?.title,
              text: chartFilters?.options?.title || "",
            },
            customCanvasBackgroundColor: {
              color: chartFilters?.styles?.chartBackground,
            },
          },
          scales: {
            ...(prev?.scales || {}),
            x: {
              title: chartFilters.styles.x,
              type: "time",
              time: {
                unit: datesFilters.quickDate === "1Y" ? "month" : "year",
                minUnit: "month",
              },
              max: handleMaxX(datesFilters.quickDate),
              min: handleMinX(datesFilters.quickDate),
              ticks: {
                maxTicksLimit: chartFilters.intervals.x.isAuto
                  ? null
                  : chartFilters.intervals.x.value,
                autoSkip: true,
                callback: function (value: any, index: any, values: any) {
                  // Check if the current index is the index of the last point and return an empty label
                  if (
                    datesFilters.quickDate !== "1Y" &&
                    index === values.length - 1
                  ) {
                    return "";
                  } else {
                    if (datesFilters.quickDate === "1Y")
                      return DateTime.fromMillis(value).toFormat("yyyy LLL");
                    return DateTime.fromMillis(value).toFormat("yyyy");
                  }
                },
              },
            },
            y: {
              ...(prev?.scales?.y || {}),
              ticks: {
                stepSize: chartFilters.intervals.y.isAuto
                  ? null
                  : chartFilters.intervals.y.value,
              },
              title: chartFilters.styles.y,
            },
          },
        } as unknown as ChartOptions)
    );
    setDataSets((prev) => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
          borderColor: chartFilters.styles.borderColor,
          backgroundColor: chartFilters.styles.backgroundColor,
          hoverBorderColor: chartFilters.styles.hoverBorderColor,
          borderWidth: chartFilters.styles.borderWidth,
        },
      ],
    }));
  }, [chartFilters, datesFilters.quickDate]);

  if (chartFilters.type === "bar") {
    return (
      <div>
        <Bar
          data={dataSets as ChartData<"bar">}
          options={options as ChartOptions<"bar">}
        />
      </div>
    );
  }

  return (
    <div>
      <Line
        options={options as ChartOptions<"line">}
        data={dataSets as ChartData<"line">}
      />
    </div>
  );
};

export default Charts;
