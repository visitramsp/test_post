import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';

export default function DummyCom({ sectionName = '' }) {
  const [dots, setDots] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animate dots: . .. ... . .. ...
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Fade in the card on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.background}>
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Text style={styles.title}>{sectionName}</Text>
          <Text style={styles.subtitle}>
            Section details{sectionName ? ` for ${sectionName}` : ' for'} are being loaded{dots}
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF2F8',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 80,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#A0AEC0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E8EDF6',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A3A7C',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#9AA5B8',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});