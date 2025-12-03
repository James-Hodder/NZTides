import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getTidesByLocation } from '../services/db';
import { fetchAndStoreTides } from '../services/linzService';

export default function LocationScreen({ route }: any) {
  const { location } = route.params;
  const [tides, setTides] = useState<any[]>([]);

  useEffect(() => {
    fetchTides();
  }, []);

  const fetchTides = async () => {
    await fetchAndStoreTides(location);

    getTidesByLocation(location, (rows) => {
      setTides(rows);
    });
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>{location}</Text>

      {tides.map(t => (
        <View key={t.id} style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{t.date}</Text>
          <Text>High Tide 1: {t.high1 || "—"}</Text>
          <Text>High Tide 2: {t.high2 || "—"}</Text>
          <Text>Low Tide 1: {t.low1 || "—"}</Text>
          <Text>Low Tide 2: {t.low2 || "—"}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
