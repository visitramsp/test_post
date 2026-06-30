import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

// ─── Responsive helpers ───────────────────────────────────────────────────────
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isTablet  = SCREEN_WIDTH >= 768;
const isMedium  = SCREEN_WIDTH >= 480;
const scale = (size) => {
  if (isTablet)  return size * 1.25;
  if (isMedium)  return size * 1.1;
  return size;
};

// ─── Utilities ────────────────────────────────────────────────────────────────
const formatDate = (date) => {
  const d  = String(date.getDate()).padStart(2, '0');
  const m  = String(date.getMonth() + 1).padStart(2, '0');
  const y  = date.getFullYear();
  return `${d}-${m}-${y}`;
};

// ─── Static leave history (replace with API data) ────────────────────────────
const INITIAL_LEAVES = [
  { id: '1', from: '05-05-2026', to: '05-05-2026', reason: 'hii',  status: 'Pending'  },
  { id: '2', from: '14-05-2026', to: '14-05-2026', reason: 'None', status: 'Approved' },
  { id: '3', from: '07-05-2026', to: '07-05-2026', reason: 'None', status: 'Pending'  },
];

// ─── StatusBadge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const isApproved = status === 'Approved';
  return (
    <View style={[styles.badge, isApproved ? styles.badgeApproved : styles.badgePending]}>
      <Text style={[styles.badgeText, isApproved ? styles.badgeTextApproved : styles.badgeTextPending]}>
        {status}
      </Text>
    </View>
  );
};

// ─── LeaveItem ───────────────────────────────────────────────────────────────
const LeaveItem = ({ item }) => (
  <View style={styles.leaveCard}>
    <View style={styles.leaveAccent} />
    <View style={styles.leaveContent}>
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>{item.from}</Text>
        <Text style={styles.arrow}>→</Text>
        <Text style={styles.dateText}>{item.to}</Text>
      </View>
      <Text style={styles.reasonText}>
        Reason: <Text style={styles.reasonValue}>{item.reason}</Text>
      </Text>
    </View>
    <StatusBadge status={item.status} />
  </View>
);

// ─── DateField ───────────────────────────────────────────────────────────────
// A tappable date display row that opens react-native-date-picker
const DateField = ({ label, date, onPress }) => (
  <TouchableOpacity style={styles.dateField} onPress={onPress} activeOpacity={0.75}>
    <Text style={styles.dateFieldLabel}>{label}</Text>
    <View style={styles.dateFieldRight}>
      <Text style={styles.dateFieldValue}>{formatDate(date)}</Text>
      <Text style={styles.dateFieldIcon}>📅</Text>
    </View>
  </TouchableOpacity>
);

// ─── ApplyLeaveModal ──────────────────────────────────────────────────────────
const ApplyLeaveModal = ({ visible, onClose, onSubmit }) => {
  const today = new Date();

  const [fromDate,     setFromDate]     = useState(today);
  const [toDate,       setToDate]       = useState(today);
  const [reason,       setReason]       = useState('');

  // which picker is open: null | 'from' | 'to'
  const [pickerMode,   setPickerMode]   = useState(null);

  const handleSubmit = () => {
    if (!reason.trim()) {
      Alert.alert('Missing Reason', 'Please enter a reason for your leave.');
      return;
    }
    onSubmit({ from: formatDate(fromDate), to: formatDate(toDate), reason: reason.trim() });
    // reset form
    setFromDate(today);
    setToDate(today);
    setReason('');
    setPickerMode(null);
  };

  const handleFromConfirm = (date) => {
    setFromDate(date);
    // if toDate is now before fromDate, sync it
    if (date > toDate) setToDate(date);
    setPickerMode(null);
  };

  const handleToConfirm = (date) => {
    setToDate(date);
    setPickerMode(null);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modalSheet}>
          {/* Handle */}
          <View style={styles.sheetHandle} />

          {/* Title */}
          <Text style={styles.modalTitle}>Apply for Leave</Text>
          <Text style={styles.modalSubtitle}>Fill in the details below</Text>

          <View style={styles.modalDivider} />

          {/* From Date */}
          <Text style={styles.fieldLabel}>From Date</Text>
          <DateField
            label={formatDate(fromDate)}
            date={fromDate}
            onPress={() => setPickerMode('from')}
          />

          {/* To Date */}
          <Text style={[styles.fieldLabel, { marginTop: 14 }]}>To Date</Text>
          <DateField
            label={formatDate(toDate)}
            date={toDate}
            onPress={() => setPickerMode('to')}
          />

          {/* Reason */}
          <Text style={[styles.fieldLabel, { marginTop: 14 }]}>Reason</Text>
          <TextInput
            style={styles.reasonInput}
            placeholder="Enter your reason…"
            placeholderTextColor="#aab8c2"
            value={reason}
            onChangeText={setReason}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          {/* Actions */}
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.8}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
              <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* FROM date picker */}
      <DatePicker
        modal
        open={pickerMode === 'from'}
        date={fromDate}
        mode="date"
        title="Select From Date"
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={handleFromConfirm}
        onCancel={() => setPickerMode(null)}
      />

      {/* TO date picker */}
      <DatePicker
        modal
        open={pickerMode === 'to'}
        date={toDate}
        mode="date"
        minimumDate={fromDate}
        title="Select To Date"
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={handleToConfirm}
        onCancel={() => setPickerMode(null)}
      />
    </Modal>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function LeaveApplyForm({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [leaves,       setLeaves]       = useState(INITIAL_LEAVES);

  const handleSubmit = ({ from, to, reason }) => {
    const newEntry = {
      id:     String(Date.now()),
      from,
      to,
      reason,
      status: 'Pending',
    };
    setLeaves((prev) => [newEntry, ...prev]);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header Card ── */}
        <View style={styles.headerCard}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconEmoji}>✉️</Text>
          </View>
          <Text style={styles.title}>Request Leave</Text>
          <Text style={styles.subtitle}>Submit a New Leave Request.</Text>

          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.applyBtnText}>Apply for Leave</Text>
          </TouchableOpacity>
        </View>

        {/* ── Divider ── */}
        <View style={styles.divider} />

        {/* ── Recent Status ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Status</Text>
            <TouchableOpacity onPress={() => navigation?.navigate('AllLeaves')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {leaves.slice(0, 5).map((item) => (
            <LeaveItem key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      {/* ── Apply Leave Modal ── */}
      <ApplyLeaveModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },

  // ── Header Card ──
  headerCard: {
    backgroundColor: '#ffffff',
    borderRadius: scale(20),
    marginHorizontal: scale(16),
    marginTop: scale(16),
    paddingHorizontal: isTablet ? 36 : isMedium ? 28 : 20,
    paddingTop:        isTablet ? 44 : isMedium ? 36 : 28,
    paddingBottom:     isTablet ? 36 : isMedium ? 28 : 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  iconCircle: {
    width:           scale(72),
    height:          scale(72),
    borderRadius:    scale(36),
    backgroundColor: '#e8f4fd',
    alignItems:      'center',
    justifyContent:  'center',
    marginBottom:    scale(16),
  },
  iconEmoji: { fontSize: scale(30) },
  title: {
    fontSize:      scale(22),
    fontWeight:    '700',
    color:         '#0f4c75',
    marginBottom:  6,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize:     scale(14),
    color:        '#8fa3b1',
    marginBottom: scale(24),
  },
  applyBtn: {
    width:           '100%',
    backgroundColor: '#1a9de0',
    borderRadius:    scale(14),
    paddingVertical: isTablet ? 18 : isMedium ? 16 : 15,
    alignItems:      'center',
    shadowColor:     '#1a9de0',
    shadowOffset:    { width: 0, height: 4 },
    shadowOpacity:   0.35,
    shadowRadius:    12,
    elevation:       6,
  },
  applyBtnText: {
    color:         '#ffffff',
    fontSize:      scale(16),
    fontWeight:    '700',
    letterSpacing: 0.2,
  },

  // ── Divider ──
  divider: {
    height:          1,
    backgroundColor: '#e2eaf0',
    marginHorizontal: scale(16),
    marginTop:        scale(20),
  },

  // ── Section ──
  section: {
    marginHorizontal: scale(16),
    marginTop:        scale(20),
  },
  sectionHeader: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
    marginBottom:   12,
  },
  sectionTitle: {
    fontSize:   scale(16),
    fontWeight: '700',
    color:      '#1a2533',
  },
  viewAll: {
    fontSize:   scale(14),
    color:      '#1a9de0',
    fontWeight: '600',
  },

  // ── Leave Card ──
  leaveCard: {
    backgroundColor: '#ffffff',
    borderRadius:    scale(14),
    marginBottom:    10,
    flexDirection:   'row',
    alignItems:      'center',
    overflow:        'hidden',
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 1 },
    shadowOpacity:   0.05,
    shadowRadius:    5,
    elevation:       2,
  },
  leaveAccent: {
    width:           4,
    alignSelf:       'stretch',
    backgroundColor: '#1a9de0',
  },
  leaveContent: {
    flex:            1,
    paddingVertical: isTablet ? 18 : 15,
    paddingHorizontal: isTablet ? 18 : 14,
    gap:             5,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           8,
  },
  dateText: {
    fontSize:   scale(15),
    fontWeight: '700',
    color:      '#1a2533',
  },
  arrow:  { fontSize: scale(14), color: '#1a9de0' },
  reasonText: {
    fontSize:   scale(13),
    color:      '#8fa3b1',
    fontWeight: '500',
  },
  reasonValue: { color: '#1a9de0', fontWeight: '600' },

  // ── Badge ──
  badge: {
    marginRight:    14,
    paddingHorizontal: 10,
    paddingVertical:   4,
    borderRadius:   20,
  },
  badgePending:        { backgroundColor: '#fff3cd' },
  badgeApproved:       { backgroundColor: '#d4edda' },
  badgeText:           { fontSize: scale(11), fontWeight: '700', letterSpacing: 0.3 },
  badgeTextPending:    { color: '#856404' },
  badgeTextApproved:   { color: '#155724' },

  // ── Modal ──
  modalOverlay: {
    flex:            1,
    justifyContent:  'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  modalSheet: {
    backgroundColor:  '#ffffff',
    borderTopLeftRadius:  24,
    borderTopRightRadius: 24,
    paddingHorizontal: isTablet ? 32 : 20,
    paddingBottom:     Platform.OS === 'ios' ? 36 : 28,
    paddingTop:        16,
  },
  sheetHandle: {
    width:           44,
    height:          4,
    backgroundColor: '#dde4ea',
    borderRadius:    2,
    alignSelf:       'center',
    marginBottom:    16,
  },
  modalTitle: {
    fontSize:      scale(20),
    fontWeight:    '700',
    color:         '#0f4c75',
    textAlign:     'center',
    marginBottom:  4,
  },
  modalSubtitle: {
    fontSize:  scale(13),
    color:     '#8fa3b1',
    textAlign: 'center',
  },
  modalDivider: {
    height:          1,
    backgroundColor: '#e2eaf0',
    marginVertical:  16,
  },
  fieldLabel: {
    fontSize:     scale(13),
    fontWeight:   '600',
    color:        '#4a6070',
    marginBottom: 6,
  },

  // ── Date Field ──
  dateField: {
    flexDirection:   'row',
    justifyContent:  'space-between',
    alignItems:      'center',
    backgroundColor: '#f4f8fb',
    borderRadius:    scale(12),
    paddingHorizontal: 14,
    paddingVertical:   13,
    borderWidth:     1,
    borderColor:     '#d6e4ed',
  },
  dateFieldLabel: {
    fontSize:   scale(14),
    color:      '#1a2533',
    fontWeight: '500',
  },
  dateFieldRight: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           6,
  },
  dateFieldValue: {
    fontSize:   scale(14),
    color:      '#1a9de0',
    fontWeight: '600',
  },
  dateFieldIcon: { fontSize: scale(16) },

  // ── Reason Input ──
  reasonInput: {
    backgroundColor:   '#f4f8fb',
    borderRadius:      scale(12),
    paddingHorizontal: 14,
    paddingVertical:   12,
    fontSize:          scale(14),
    color:             '#1a2533',
    borderWidth:       1,
    borderColor:       '#d6e4ed',
    minHeight:         90,
  },

  // ── Modal Actions ──
  modalActions: {
    flexDirection: 'row',
    gap:           12,
    marginTop:     24,
  },
  cancelBtn: {
    flex:            1,
    backgroundColor: '#f0f4f8',
    borderRadius:    scale(14),
    paddingVertical: isTablet ? 18 : 15,
    alignItems:      'center',
  },
  cancelBtnText: {
    fontSize:   scale(15),
    fontWeight: '700',
    color:      '#4a6070',
  },
  submitBtn: {
    flex:            2,
    backgroundColor: '#1a9de0',
    borderRadius:    scale(14),
    paddingVertical: isTablet ? 18 : 15,
    alignItems:      'center',
    shadowColor:     '#1a9de0',
    shadowOffset:    { width: 0, height: 4 },
    shadowOpacity:   0.30,
    shadowRadius:    10,
    elevation:       5,
  },
  submitBtnText: {
    fontSize:      scale(15),
    fontWeight:    '700',
    color:         '#ffffff',
    letterSpacing: 0.2,
  },
});