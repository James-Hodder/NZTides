export const parseLinzCSV = (csv: string) => {
    const rows = csv.trim().split("\n").slice(1);
  
    return rows.map(row => {
      const [date, high1, high2, low1, low2] = row.split(",");
  
      return {
        date,
        high1: high1 || null,
        high2: high2 || null,
        low1: low1 || null,
        low2: low2 || null,
      };
    });
  };
  