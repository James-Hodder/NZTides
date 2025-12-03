import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { initDB } from '../services/db';
import { router } from 'expo-router';

export default function HomeScreen() {

  useEffect(() => {
    initDB();
  }, []);

  const locations = [
    "Auckland",
    "Tauranga",
    "Whangarei",
    "Wellington",
    "Lyttelton"
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NZ Tide Times</Text>

      {locations.map(loc => (
        <TouchableOpacity
          key={loc}
          style={styles.card}
          onPress={() => router.push(`/location/${loc}`)}
        >
          <Text style={styles.location}>{loc}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 15, backgroundColor: '#eee', marginBottom: 12, borderRadius: 8 },
  location: { fontSize: 18 }
});
