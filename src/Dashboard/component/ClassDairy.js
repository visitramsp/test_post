import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import SettingHeader from '../../components/SettingHeader';
import { useNavigation } from '@react-navigation/native';

const diaryEntries = [
  {
    id: '1',
    title: 'Homework',
    subject: 'Art-Class-1',
    teacher: 'Aarav Sharma',
    description: 'issue resolved',
    date: '27-05-2026',
  },
  {
    id: '2',
    title: 'homework',
    subject: 'Computer-Class-1',
    teacher: 'Aditi Singh',
    description: 'Read about CPU',
    date: '26-05-2026',
  },
  {
    id: '3',
    title: 'Test',
    subject: 'Art-Class-1',
    teacher: 'Aarav Sharma',
    description: 'Test',
    date: '16-05-2026',
  },
];

const DiaryCard = ({ item }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.85}>
    {/* Row 1: Title + Date */}
    <View style={styles.cardTop}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDate}>{item.date}</Text>
    </View>

    {/* Row 2: Subject • Teacher */}
    <Text style={styles.cardMeta}>
      {item.subject}
      <Text style={styles.dot}> • </Text>
      {item.teacher}
    </Text>

    {/* Spacer */}
    <View style={styles.spacer} />

    {/* Row 3: Description */}
    <Text style={styles.cardDesc}>{item.description}</Text>
  </TouchableOpacity>
);

export default function ClassDiary() {
     const navigation=useNavigation()
  return (
    <>
      <SettingHeader title={"Class Dairy"} onBack={()=>navigation.goBack()} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {diaryEntries.map((item) => (
            <DiaryCard key={item.id} item={item} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF2F8',
  },
  scrollContent: {
    padding: 16,
    gap: 14,
  },

  // ── Card ──
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E4EAF4',
    shadowColor: '#A0AEC0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F1C3F',
    flexShrink: 1,
    marginRight: 12,
  },
  cardDate: {
    fontSize: 14,
    color: '#9AA5B8',
    fontWeight: '400',
    marginTop: 2,
  },

  cardMeta: {
    fontSize: 14,
    color: '#7A8EAD',
    fontWeight: '400',
  },
  dot: {
    color: '#7A8EAD',
  },

  spacer: {
    height: 14,
  },

  cardDesc: {
    fontSize: 16,
    color: '#1E2D45',
    lineHeight: 23,
  },
});