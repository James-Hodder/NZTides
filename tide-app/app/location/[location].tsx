import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { fetchAndStoreTides } from '../services/linzService';
import { getTidesByLocation } from '../services/db';

export default function LocationScreen() {
  const { location } = useLocalSearchParams();
  const [tides, setTides] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    await fetchAndStoreTides(location as string);

    getTidesByLocation(location as string, (rows) => {
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
