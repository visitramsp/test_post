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

const notices = [
  {
    id: '1',
    title: 'Order',
    category: 'Holiday',
    description: 'Holiday notice by DM till sat',
    priority: 'Normal',
    date: '21-05-2026',
  },
  {
    id: '2',
    title: 'TEST2',
    category: 'Holiday',
    description: 'HOLIDAY',
    priority: 'Normal',
    date: '17-05-2026',
  },
  {
    id: '3',
    title: 'test-st',
    category: 'Holiday',
    description: 'for students only',
    priority: 'Normal',
    date: '17-05-2026',
  },
  {
    id: '4',
    title: 'Test',
    category: 'Event',
    description: 'Test',
    priority: 'Normal',
    date: '17-05-2026',
  },
];

const priorityColors = {
  Normal:  { bg: '#DDEEFF', text: '#3B82F6' },
  High:    { bg: '#FFE4E4', text: '#EF4444' },
  Urgent:  { bg: '#FFF3CD', text: '#F59E0B' },
};

const NoticeCard = ({ item }) => {
  const pColor = priorityColors[item.priority] || priorityColors.Normal;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      {/* Row 1: Title + Date */}
      <View style={styles.cardTop}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>

      {/* Row 2: Category */}
      <Text style={styles.cardCategory}>{item.category}</Text>

      {/* Row 3: Description */}
      <Text style={styles.cardDesc}>{item.description}</Text>

      {/* Row 4: Priority Badge */}
      <View style={[styles.badge, { backgroundColor: pColor.bg }]}>
        <Text style={[styles.badgeText, { color: pColor.text }]}>
          {item.priority}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function SchoolNotice() {
  const navigation=useNavigation()
  return (
    <>
      <SettingHeader title={"School Notice"} onBack={()=>navigation.goBack()} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {notices.map((item) => (
            <NoticeCard key={item.id} item={item} />
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
    borderColor: '#E8EDF6',
    shadowColor: '#A0AEC0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F1C3F',
    flexShrink: 1,
    marginRight: 12,
  },
  cardDate: {
    fontSize: 13,
    color: '#9AA5B8',
    fontWeight: '400',
    marginTop: 2,
  },

  cardCategory: {
    fontSize: 14,
    color: '#9AA5B8',
    marginBottom: 10,
  },

  cardDesc: {
    fontSize: 15,
    color: '#2D3A52',
    marginBottom: 14,
    lineHeight: 22,
  },

  // ── Badge ──
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
});