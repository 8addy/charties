import { DateTime } from "luxon";

export const handleMaxX = (date?: string) => {
  if (date !== "1Y") return DateTime.now().plus({ years: 1 }).toFormat("yyyy");
};
export const handleMinX = (date?: string) => {
  let minValue = "";
  switch (date) {
    case "1Y":
      minValue = DateTime.now().plus({ years: -1 }).toFormat("yyyy");
      break;
    case "5Y":
      minValue = DateTime.now().plus({ years: -5 }).toFormat("yyyy");
      break;
    case "10Y":
      minValue = DateTime.now().plus({ years: -10 }).toFormat("yyyy");
      break;

    default:
      minValue = "";
      break;
  }
  return minValue;
};
