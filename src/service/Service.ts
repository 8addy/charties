import { RESPONSE_FILE_TYPE } from "../utils/constants";

export const searchTerms = async (
  term: string,
  offset: number,
  limit: number
) => {
  try {
    const response = await fetch(
      `api/series/search?search_text=${term}&offset=${offset}&limit=${limit}&api_key=${process.env.REACT_APP_API_KEY}&file_type=${RESPONSE_FILE_TYPE}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
};

export const fetchObservations = async (id: string) => {
  try {
    const response = await fetch(
      `api/series/observations?series_id=${id}&api_key=${process.env.REACT_APP_API_KEY}&file_type=${RESPONSE_FILE_TYPE}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
};
