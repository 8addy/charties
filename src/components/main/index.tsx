import { useContext, useEffect, useState } from "react";
import { context } from "../../context/AppContext";
import { IoIosSettings } from "react-icons/io";
import Charts from "./Charts/Charts";
import { fetchObservations } from "../../service/Service";
import { DEFAULT_QUICK_DATE, QUICK_DATES } from "../../utils/constants";
import Settings from "./Charts/Settings";
import "./styles.scss";
import Segment from "../forms/Input/Segment";

const Main = () => {
  const { selectedSerie, setIsSBOpen } = useContext(context);
  const [observations, setObservations] = useState();
  const [isLoading, setLoading] = useState(false);
  const [datesFilters, setDatesFilters] = useState({
    quickDate: DEFAULT_QUICK_DATE,
  });
  const [chartFilters, setChartFilters] = useState({
    type: "line",
    options: {
      title: selectedSerie?.title || "",
    },
    styles: {
      chartBackground: "#fff",
      borderColor: "#00deff",
      backgroundColor: "#00deff6b",
      hoverBorderColor: "#0bcbe7",
      borderWidth: 1,
      x: {
        display: true,
        text: "Dates",
        color: "#000",
      },
      y: {
        display: false,
        text: selectedSerie?.units && "Percentage",
        color: "#000",
      },
    },
    intervals: {
      x: {
        isAuto: true,
        value: 2,
      },
      y: {
        isAuto: true,
        value: 2,
      },
    },
  });
  const [showSettings, setShowSettings] = useState(false);

  const fetchDataHandler = async (id: string) => {
    setLoading(true);
    const result = await fetchObservations(id);
    setObservations(result?.observations || []);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedSerie) {
      setChartFilters((prev) => ({
        ...prev,
        options: {
          title: selectedSerie?.title,
        },
      }));
      fetchDataHandler(selectedSerie.id);
    }
  }, [selectedSerie]);

  if (selectedSerie === null) {
    return (
      <div className="no-data">
        <p>No Serie has been selected</p>
        <button onClick={() => setIsSBOpen(true)}>Start Search</button>
      </div>
    );
  }

  if (isLoading)
    return <div style={{ fontSize: 20, marginTop: 20 }}>Loading...</div>;

  return (
    <div className="main">
      <div className="chart-header">
        <div className="chart-header-top">
          <div className="date-range">
            <div className="quick-range">
              {QUICK_DATES.map((item: string) => (
                <Segment
                  key={item}
                  isActive={datesFilters.quickDate === item}
                  onClick={() =>
                    datesFilters.quickDate !== item &&
                    setDatesFilters((prev) => ({ ...prev, quickDate: item }))
                  }
                >
                  {item}
                </Segment>
              ))}
            </div>
          </div>
          <button
            className="primary-btn settings-icon"
            onClick={() => setShowSettings((prev) => !prev)}
          >
            Settings <IoIosSettings />
          </button>
        </div>
        {showSettings && (
          <Settings
            filters={chartFilters}
            updateFilters={(filters) => setChartFilters(filters)}
          />
        )}
      </div>
      <div className="chart-wrapper">
        <Charts
          observations={observations}
          chartFilters={chartFilters}
          datesFilters={datesFilters}
        />
      </div>
    </div>
  );
};

export default Main;
