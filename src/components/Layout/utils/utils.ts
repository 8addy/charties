import { SERIE } from "../../../types/types";

export const formatData = (data: any): SERIE[] => {
  if (data) {
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      last_updated: item.last_updated.split(" ")[0],
      frequency: item.frequency,
      units: item.units,
      seasonalAdjustment: item.seasonal_adjustment,
      isSA:
        item.seasonal_adjustment_short === "SA" ||
        item.seasonal_adjustment_short === "SAAR",
    }));
  }
  return [];
};
