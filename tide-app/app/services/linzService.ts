import axios from 'axios';
import { insertTideData } from './db';
import { parseLinzCSV } from './tideParser';

const LINZ_URL = 'https://example.com/tide-data.csv';

export const fetchAndStoreTides = async (location: string) => {
  try {
    const res = await axios.get(LINZ_URL);
    const entries = parseLinzCSV(res.data);

    entries.forEach(e => {
      insertTideData(location, e.date, e.high1, e.high2, e.low1, e.low2);
    });

  } catch (err) {
    console.error("Error fetching tide data:", err);
  }
};
