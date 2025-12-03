import AsyncStorage from '@react-native-async-storage/async-storage';

// --- INITIALIZE DB -----------------------------------------------------

export const initDB = async () => {
  try {
    const existingData = await AsyncStorage.getItem('tide_predictions');
    if (!existingData) {
      // Initialize with an empty array if no data exists
      await AsyncStorage.setItem('tide_predictions', JSON.stringify([]));
      console.log('AsyncStorage: tide_predictions initialized');
    } else {
      console.log('AsyncStorage: tide_predictions already exists');
    }
  } catch (error) {
    console.error('AsyncStorage initialization error:', error);
  }
};
// Export the `getTidesByLocation` function to make it available for import.

export const getTidesByLocation = async (location: string, callback: (data: any[]) => void): Promise<void> => {
  const db = await AsyncStorage.getItem('tide_predictions'); // Simulating db as AsyncStorage data
  if (!db) {
    callback([]);
    return;
  }

  const predictions = JSON.parse(db).filter((p: { location: string }) => p.location === location);
  callback(predictions);
};

// --- ADD A RECORD -----------------------------------------------------

export const addTidePrediction = async (prediction: {
  location: string;
  date: string;
  high1?: string;
  high2?: string;
  low1?: string;
  low2?: string;
}) => {
  try {
    const data = await AsyncStorage.getItem('tide_predictions');
    const predictions = data ? JSON.parse(data) : [];

    // Check for duplicates based on location and date
    const exists = predictions.some(
      (p: { location: string; date: string }) =>
        p.location === prediction.location && p.date === prediction.date
    );

    if (exists) {
      console.error('Duplicate entry detected');
      return;
    }

    predictions.push(prediction);
    await AsyncStorage.setItem('tide_predictions', JSON.stringify(predictions));
    console.log('AsyncStorage: Prediction added');
  } catch (error) {
    console.error('AsyncStorage add error:', error);
  }
};

// --- GET ALL RECORDS --------------------------------------------------

export const getTidePredictions = async () => {
  try {
    const data = await AsyncStorage.getItem('tide_predictions');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('AsyncStorage get error:', error);
    return [];
  }
};

// --- DELETE A RECORD --------------------------------------------------

export const deleteTidePrediction = async (location: string, date: string) => {
  try {
    const data = await AsyncStorage.getItem('tide_predictions');
    const predictions = data ? JSON.parse(data) : [];

    const updatedPredictions = predictions.filter(
      (p: { location: string; date: string }) =>
        p.location !== location || p.date !== date
    );

    await AsyncStorage.setItem(
      'tide_predictions',
      JSON.stringify(updatedPredictions)
    );
    console.log('AsyncStorage: Prediction deleted');
  } catch (error) {
    console.error('AsyncStorage delete error:', error);
  }
};


// Export the insertTideData function

export const insertTideData = (
  location: string,
  date: string,
  high1?: string,
  high2?: string,
  low1?: string,
  low2?: string
): void => {
  console.error('insertTideData function is not implemented.');
};

