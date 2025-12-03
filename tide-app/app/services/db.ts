import * as SQLite from 'expo-sqlite';

// Open the database safely
const db = SQLite.openDatabase('tides.db');

// --- INITIALIZE DB -----------------------------------------------------

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS tide_predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        location TEXT NOT NULL,
        date TEXT NOT NULL,
        high1 TEXT,
        high2 TEXT,
        low1 TEXT,
        low2 TEXT,
        UNIQUE(location, date)
      );
      `,
      [],
      () => console.log("SQLite: tide_predictions table ready"),
      (_, error) => {
        console.error("SQLite create table error:", error);
        return true;
      }
    );
  });
};

// --- INSERT ROW --------------------------------------------------------

export const insertTideData = (
  location: string,
  date: string,
  high1?: string,
  high2?: string,
  low1?: string,
  low2?: string
) => {
  db.transaction(tx => {
    tx.executeSql(
      `
      INSERT OR REPLACE INTO tide_predictions 
      (location, date, high1, high2, low1, low2)
      VALUES (?, ?, ?, ?, ?, ?);
      `,
      [location, date, high1 ?? null, high2 ?? null, low1 ?? null, low2 ?? null],
      () => console.log(`Inserted tide data for ${location} on ${date}`),
      (_, error) => {
        console.error("SQLite insert error:", error);
        return true;
      }
    );
  });
};

// --- GET TIDES FOR ONE LOCATION ---------------------------------------

export const getTidesByLocation = (
  location: string,
  callback: (rows: any[]) => void
) => {
  db.transaction(tx => {
    tx.executeSql(
      `
      SELECT * 
      FROM tide_predictions 
      WHERE location = ?
      ORDER BY date ASC;
      `,
      [location],
      (_, result) => {
        callback(result.rows._array);
      },
      (_, error) => {
        console.error("SQLite SELECT error:", error);
        return true;
      }
    );
  });
};

// --- OPTIONAL: Promise version ----------------------------------------

export const getTidesByLocationAsync = (location: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `
        SELECT * 
        FROM tide_predictions 
        WHERE location = ?
        ORDER BY date ASC;
        `,
        [location],
        (_, result) => resolve(result.rows._array),
        (_, error) => {
          console.error("SQLite SELECT error:", error);
          reject(error);
          return true;
        }
      );
    });
  });
};
