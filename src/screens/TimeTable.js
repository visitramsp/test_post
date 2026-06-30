import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import MainHeader from '../components/MainHeader';

const { width } = Dimensions.get('window');

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const PERIOD_TIMES = [
  '8:00 – 8:45', '8:45 – 9:30', '9:30 – 10:15', '10:15 – 11:00',
  '11:00 – 11:45', '11:45 – 12:30', '12:30 – 1:15', '1:15 – 2:00',
];

const SCHEDULE = [
  { subject: 'Hindi', teacher: 'Aarav Sharma', room: 'R:001', icon: '📖', accent: '#2196F3', bg: '#E3F2FD' },
  { subject: 'Maths', teacher: 'Arjun Gupta', room: 'R:001', icon: '➗', accent: '#9C27B0', bg: '#F3E5F5' },
  { subject: 'Science', teacher: 'Aditi Singh', room: 'R:001', icon: '🔬', accent: '#4CAF50', bg: '#E8F5E9' },
  { subject: 'Computer', teacher: 'Aditya Singh', room: 'R:001', icon: '💻', accent: '#FF9800', bg: '#FFF3E0' },
  { subject: 'Social Science', teacher: 'Ananya Sharma', room: 'R:001', icon: '🌍', accent: '#E91E63', bg: '#FCE4EC' },
  { subject: 'Art & Craft', teacher: 'Diya Verma', room: 'R:001', icon: '🎨', accent: '#8BC34A', bg: '#F1F8E9' },
  { subject: 'GK', teacher: 'Isha Mehta', room: 'R:001', icon: '🧠', accent: '#03A9F4', bg: '#E1F5FE' },
  { subject: 'English', teacher: 'Priya Kapoor', room: 'R:002', icon: '✏️', accent: '#FFC107', bg: '#FFF8E1' },
];

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

const ClassCard = ({ item, day, periodIndex, onPress }) => (
  <TouchableOpacity
    style={[styles.card, { borderLeftColor: item.accent }]}
    onPress={() => onPress(item, day, periodIndex)}
    activeOpacity={0.75}
  >
    <Text style={styles.cardIcon}>{item.icon}</Text>
    <Text style={styles.cardSubject} numberOfLines={2}>{item.subject}</Text>
    <Text style={styles.cardTeacher}>By {item.teacher}</Text>
    <Text style={[styles.cardRoom, { color: item.accent }]}>{item.room}</Text>
  </TouchableOpacity>
);

const PeriodColumn = () => (
  <View style={styles.periodCol}>
    <View style={styles.periodColHeader} />
    {PERIOD_TIMES.map((time, index) => (
      <View key={index} style={styles.periodCell}>
        <Text style={styles.periodNum}>P{index + 1}</Text>
        <Text style={styles.periodTime}>{time}</Text>
      </View>
    ))}
  </View>
);

const DayColumn = ({ day, isActive, onCardPress }) => (
  <View style={styles.dayCol}>
    <View style={[styles.dayHeader, isActive && styles.dayHeaderActive]}>
      <Text style={[styles.dayHeaderText, isActive && styles.dayHeaderTextActive]}>
        {day}
      </Text>
    </View>
    {SCHEDULE.map((item, index) => (
      <ClassCard
        key={index}
        item={item}
        day={day}
        periodIndex={index}
        onPress={onCardPress}
      />
    ))}
  </View>
);

const ClassDetailModal = ({ visible, selectedClass, onClose }) => {
  if (!selectedClass) return null;

  const details = [
    { label: 'TEACHER', value: selectedClass.teacher },
    { label: 'ROOM', value: selectedClass.room },
    { label: 'DAY', value: selectedClass.day },
    { label: 'PERIOD', value: `Period ${selectedClass.periodIndex + 1}` },
    { label: 'TIME', value: selectedClass.time },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalBox, { backgroundColor: selectedClass.bg, borderTopColor: selectedClass.accent }]}>
              <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
                <Text style={[styles.modalCloseTxt, { color: selectedClass.accent }]}>✕</Text>
              </TouchableOpacity>

              <Text style={styles.modalIcon}>{selectedClass.icon}</Text>
              <Text style={[styles.modalSubject, { color: selectedClass.accent }]}>
                {selectedClass.subject}
              </Text>

              {details.map((row, i) => (
                <View key={i} style={[styles.modalRow, i === details.length - 1 && { borderBottomWidth: 0 }]}>
                  <Text style={styles.modalLabel}>{row.label}</Text>
                  <Text style={styles.modalValue}>{row.value}</Text>
                </View>
              ))}

              <View style={[styles.modalBadge, { backgroundColor: selectedClass.accent }]}>
                <Text style={styles.modalBadgeTxt}>{selectedClass.room}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

const TimeTable = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [selectedClass, setSelectedClass] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const hScrollRef = useRef(null);

  const SNAP_WIDTH = 163; // card width + margin

  const handleDayPress = (index) => {
    setActiveDay(index);
    hScrollRef.current?.scrollTo({ x: index * SNAP_WIDTH, animated: true });
  };

  const handleCardPress = (item, day, periodIndex) => {
    setSelectedClass({
      ...item,
      day,
      periodIndex,
      time: PERIOD_TIMES[periodIndex],
    });
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* <StatusBar barStyle="light-content" backgroundColor="#1565C0" /> */}

      {/* Header */}
      {/* <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerEmoji}>📅</Text>
          <View>
            <Text style={styles.headerTitle}>Class Schedule</Text>
            <Text style={styles.headerSub}>Academic Year 2025–26</Text>
          </View>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeTxt}>Grade 6 · Sec A</Text>
        </View>
      </View> */}
<MainHeader />
      {/* Day Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsRow}
        style={styles.tabsScroll}
      >
        {DAYS.map((day, i) => (
          <TouchableOpacity
            key={day}
            style={[styles.tab, i === activeDay && styles.tabActive]}
            onPress={() => handleDayPress(i)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabTxt, i === activeDay && styles.tabTxtActive]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Schedule Grid */}
      <ScrollView style={styles.gridVScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.gridRow}>
          <PeriodColumn />

          <ScrollView
            ref={hScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_WIDTH}
            decelerationRate="fast"
            contentContainerStyle={styles.hScrollContent}
          >
            {DAYS.map((day, index) => (
              <DayColumn
                key={day}
                day={day}
                isActive={index === activeDay}
                onCardPress={handleCardPress}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Modal */}
      <ClassDetailModal
        visible={modalVisible}
        selectedClass={selectedClass}
        onClose={() => {
          setModalVisible(false);
          setSelectedClass(null);
        }}
      />
    </SafeAreaView>
  );
};

export default TimeTable;

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F4F7FB' },

  header: {
    backgroundColor: '#1565C0',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 10,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    elevation: 8,
    shadowColor: '#1565C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerEmoji: { fontSize: 30 },
  headerTitle: { color: '#FFF', fontWeight: '800', fontSize: 18 },
  headerSub: { color: '#BBDEFB', fontSize: 11, marginTop: 2 },
  headerBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  headerBadgeTxt: { color: '#FFF', fontSize: 11, fontWeight: '700' },

  tabsScroll: { maxHeight: 52, marginTop: 12 },
  tabsRow: { paddingHorizontal: 14, gap: 8, alignItems: 'center' },
  tab: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 7,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  tabActive: { backgroundColor: '#2196F3', elevation: 5 },
  tabTxt: { fontWeight: '700', fontSize: 12, color: '#555' },
  tabTxtActive: { color: '#FFF' },

  gridVScroll: { flex: 1, paddingHorizontal: 10 },
  gridRow: { flexDirection: 'row' },
  hScrollContent: { paddingRight: 10, paddingTop: 20 },

  periodCol: { width: 64, paddingRight: 5 },
  periodColHeader: { height: 59, marginBottom: 8 },
  periodCell: {
    height: 108,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  periodNum: { fontWeight: '800', color: '#1565C0', fontSize: 12, marginBottom: 3 },
  periodTime: { fontSize: 8, color: '#90A4AE', textAlign: 'center', lineHeight: 11 },

  dayCol: { width: 155, marginRight: 8 },
  dayHeader: {
    height: 40,
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dayHeaderActive: { backgroundColor: '#2196F3' },
  dayHeaderText: { fontWeight: '800', fontSize: 13, color: '#333', letterSpacing: 1.5 },
  dayHeaderTextActive: { color: '#FFF' },

  card: {
    width: 155,
    minHeight: 108,
    backgroundColor: '#FFF',
    borderRadius: 14,
    borderLeftWidth: 4,
    paddingHorizontal: 11,
    paddingVertical: 10,
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardIcon: { fontSize: 18, marginBottom: 3 },
  cardSubject: { fontWeight: '800', fontSize: 13, color: '#1A237E', lineHeight: 17 },
  cardTeacher: { fontSize: 10.5, color: '#607D8B', marginTop: 2 },
  cardRoom: { fontSize: 10, fontWeight: '700', marginTop: 4, fontStyle: 'italic' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalBox: {
    width: width * 0.88,
    maxWidth: 340,
    borderRadius: 22,
    padding: 28,
    paddingTop: 32,
    borderTopWidth: 5,
    elevation: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
  },
  modalCloseBtn: { position: 'absolute', top: 12, right: 16, padding: 4, zIndex: 10 },
  modalCloseTxt: { fontSize: 20, fontWeight: '700' },
  modalIcon: { fontSize: 50, textAlign: 'center', marginBottom: 4 },
  modalSubject: { textAlign: 'center', fontWeight: '900', fontSize: 22, marginBottom: 18 },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  modalLabel: { color: '#90A4AE', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  modalValue: { color: '#263238', fontSize: 13, fontWeight: '700' },
  modalBadge: { marginTop: 18, borderRadius: 28, paddingVertical: 9, alignItems: 'center' },
  modalBadgeTxt: { color: '#FFF', fontWeight: '800', fontSize: 13, letterSpacing: 1 },
});