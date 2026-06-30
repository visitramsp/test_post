import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import MainHeader from "../components/MainHeader";
import Donut from "./component/Donut"

import Academics from "./component/Academics"
import DummyCom from "./component/DummyCom"




const { width } = Dimensions.get("window");

// ─── DATA ────────────────────────────────────────────────────────────────────

const usersData = [
  { label: "Student ID",     value: "#EDU-STU-2026-00009", color: "#3b82f6" },
  { label: "Academic Year",  value: "2026-27",              color: "#3b82f6" },
  { label: "Academic Term",  value: "2026-27 (Term-1)",     color: "#3b82f6" },
  { label: "Em. Contact",    value: "Anant Mishra - 9876543210" },
  { label: "Class Teacher",  value: "Mrs. Gupta",           color: "#3b82f6" },
  { label: "Date of Birth",  value: "14-09-2018" },
  { label: "Blood Group",    value: "B+",                   color: "#ef4444" },
  { label: "Status",         value: "Active",               color: "#16a34a" },
];

const statCards = [
  { label: "STUDENT BATCH",   value: "1A",   colors: ["#7c3aed", "#a78bfa"] },
  { label: "PERFORMANCE",     value: "95%",  colors: ["#0ea5e9", "#38bdf8"] },
  { label: "OVERALL RANK",    value: "3",    colors: ["#f59e0b", "#fbbf24"] },
  { label: "ATTENDANCE %",    value: "95%",  colors: ["#ec4899", "#f9a8d4"] },
];

const examData = [
  { subject: "Mathematics", pct: 90, color: "#3b82f6" },
  { subject: "Science",     pct: 78, color: "#10b981" },
  { subject: "English",     pct: 88, color: "#f59e0b" },
];

const attendanceData = { present: 28, absent: 2, halfDay: 0, pct: 93 };

const studentLog = [
  { icon: "📚", title: "Library Issue",  sub: "Today – Physics Vol.1",    color: "#6366f1" },
  { icon: "✅", title: "Fees Paid",       sub: "14 May · Receipt #172",    color: "#10b981" },
];

const TAB_LIST = ["Activity", "Academics", "TimeTable", "Attendance", "Exam & Results", "Assignments", "Library"];



// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ label, value, colors }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);
  return (
    <Animated.View style={[styles.statCard, {
      backgroundColor: colors[0],
      opacity: anim,
      transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
    }]}>
      <View style={[styles.statBlob, { backgroundColor: colors[1] }]} />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </Animated.View>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ pct, color }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: pct / 100, duration: 800, delay: 200, useNativeDriver: false }).start();
  }, []);
  return (
    <View style={styles.progressTrack}>
      <Animated.View style={[styles.progressFill, { backgroundColor: color, width: anim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }]} />
    </View>
  );
}

// ─── AVATAR ───────────────────────────────────────────────────────────────────
function Avatar() {
  return (
    <View style={styles.avatarWrap}>
      <View style={styles.avatarRing}>
        <View style={styles.avatarInner}>
          <Text style={{ fontSize: 36 }}>👩‍🎓</Text>
        </View>
      </View>
      <View style={styles.activeDot} />
    </View>
  );
}

// ─── INFO GRID ────────────────────────────────────────────────────────────────
function InfoGrid() {
  return (
    <View style={styles.infoGrid}>
      {usersData.map(({ label, value, color }) => (
        <View key={label} style={styles.infoItem}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={[styles.infoValue, { color: color || "#1e293b" }]} numberOfLines={1}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── ACTIVITY TAB ─────────────────────────────────────────────────────────────
function Activity() {
  return (
    <View style={{ paddingBottom: 32 }}>
      {/* Stat cards 2x2 grid */}
      <View style={styles.statsGrid}>
        {statCards.map((c) => <StatCard key={c.label} {...c} />)}
      </View>

      {/* Exam Performance */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Exam Performance</Text>
          <View style={styles.avgBadge}><Text style={styles.avgText}>Avg. 85%</Text></View>
        </View>
        {examData.map(({ subject, pct, color }) => (
          <View key={subject} style={{ marginTop: 14 }}>
            <View style={styles.examRow}>
              <Text style={styles.examSubject}>{subject}</Text>
              <Text style={[styles.examPct, { color }]}>{pct}%</Text>
            </View>
            <ProgressBar pct={pct} color={color} />
          </View>
        ))}
      </View>

      {/* Today's Class */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Today's Class</Text>
          <Text style={styles.dateChip}>31 May</Text>
        </View>
        <View style={styles.emptyBox}>
          <Text style={{ fontSize: 28, marginBottom: 6 }}>📭</Text>
          <Text style={styles.emptyText}>No Activity Found</Text>
        </View>
      </View>

      {/* Overall Attendance */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Overall Attendance kk</Text>
        <View style={styles.attendanceRow}>
          {[
            { label: "Present", val: attendanceData.present,  color: "#16a34a" },
            { label: "Absent",  val: attendanceData.absent,   color: "#ef4444" },
            { label: "Half Day",val: attendanceData.halfDay,  color: "#f59e0b" },
          ].map(({ label, val, color }) => (
            <View key={label} style={styles.attendItem}>
              <Text style={[styles.attendVal, { color }]}>{val}</Text>
              <Text style={styles.attendLabel}>{label}</Text>
            </View>
          ))}
        </View>
        <View style={{ alignItems: "center", marginTop: 16 }}>
          <Donut pct={attendanceData.pct} size={120} />
        </View>
      </View>

      {/* Student Log */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Student Log</Text>
          <TouchableOpacity><Text style={styles.historyLink}>History</Text></TouchableOpacity>
        </View>
        {studentLog.map(({ icon, title, sub, color }, i) => (
          <View key={i} style={styles.logRow}>
            <View style={[styles.logIcon, { backgroundColor: color + "18" }]}>
              <Text style={{ fontSize: 16 }}>{icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.logTitle}>{title}</Text>
              <Text style={styles.logSub}>{sub}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── MAIN SCREEN ──────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState("Activity");
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  return (
    <>
    <MainHeader/>
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* ── Profile Header Card ── */}
      <Animated.View style={[styles.headerCard, {
        opacity: headerAnim,
        transform: [{ translateY: headerAnim.interpolate({ inputRange: [0,1], outputRange: [-16, 0] }) }],
      }]}>
        {/* Blue accent strip */}
        <View style={styles.headerAccent} />

        <View style={styles.profileRow}>
          <Avatar />
          <View style={styles.profileMeta}>
            <Text style={styles.studentName}>KAVYA MISHRA</Text>
            <View style={styles.classBadge}>
              <Text style={styles.classBadgeText}>Class 1A · Section B</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />
        <InfoGrid />
      </Animated.View>

      {/* ── Tabs ── */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
        {TAB_LIST.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabTxt, activeTab === tab && styles.tabTxtActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Tab Content ── */}
      {activeTab === "Activity"
        ? <Activity />
        :
        activeTab === "Academics"
        ?
        <Academics/>
        : (
          <DummyCom  sectionName={activeTab} />
        )}
    </ScrollView>
    </>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const BLUE = "#3b82f6";
const BG   = "#f1f5f9";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  // ── Header Card
  headerCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#94a3b8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  headerAccent: {
    height: 5,
    backgroundColor: BLUE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    gap: 16,
  },
  avatarWrap: { position: "relative" },
  avatarRing: {
    width: 76, height: 76,
    borderRadius: 20,
    borderWidth: 2.5,
    borderColor: BLUE,
    padding: 3,
    backgroundColor: "#eff6ff",
  },
  avatarInner: {
    flex: 1, borderRadius: 16,
    backgroundColor: "#dbeafe",
    alignItems: "center", justifyContent: "center",
  },
  activeDot: {
    position: "absolute", bottom: 2, right: 2,
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: "#22c55e",
    borderWidth: 2, borderColor: "#fff",
  },
  profileMeta: { flex: 1 },
  studentName: {
    fontSize: 17, fontWeight: "800",
    color: "#0f172a", letterSpacing: 0.3,
  },
  classBadge: {
    marginTop: 6,
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 4,
    alignSelf: "flex-start",
  },
  classBadgeText: { fontSize: 11, color: BLUE, fontWeight: "700" },

  divider: { height: 1, backgroundColor: "#f1f5f9", marginHorizontal: 20 },

  infoGrid: {
    flexDirection: "row", flexWrap: "wrap",
    paddingHorizontal: 16, paddingTop: 14, paddingBottom: 18,
  },
  infoItem: { width: "50%", paddingHorizontal: 4, marginBottom: 14 },
  infoLabel: {
    fontSize: 9.5, color: "#94a3b8",
    fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.8,
  },
  infoValue: {
    marginTop: 3, fontSize: 13, fontWeight: "700", color: "#1e293b",
  },

  // ── Tabs
  tabsScroll: { marginBottom: 14 },
  tabBtn: {
    paddingHorizontal: 16, paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1, borderColor: "#e2e8f0",
  },
  tabBtnActive: {
    backgroundColor: BLUE,
    borderColor: BLUE,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8,
    elevation: 4,
  },
  tabTxt: { fontSize: 12.5, fontWeight: "700", color: "#64748b" },
  tabTxtActive: { color: "#fff" },

  // ── Stat Cards
  statsGrid: {
    flexDirection: "row", flexWrap: "wrap",
    paddingHorizontal: 16, gap: 12,
    marginBottom: 4,
  },
  statCard: {
    width: (width - 44) / 2,
    borderRadius: 20,
    padding: 20,
    paddingBottom: 22,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12, shadowRadius: 8,
  },
  statBlob: {
    position: "absolute", width: 80, height: 80, borderRadius: 40,
    right: -16, bottom: -16, opacity: 0.35,
  },
  statLabel: {
    fontSize: 10, fontWeight: "700",
    color: "rgba(255,255,255,0.75)", letterSpacing: 1,
    textTransform: "uppercase",
  },
  statValue: {
    marginTop: 8, fontSize: 38, fontWeight: "800",
    color: "#fff", lineHeight: 44,
  },

  // ── Section Cards
  sectionCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16, marginTop: 14,
    borderRadius: 20, padding: 20,
    elevation: 2,
    shadowColor: "#94a3b8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8,
  },
  sectionHeaderRow: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },
  sectionTitle: { fontSize: 15, fontWeight: "800", color: "#0f172a" },
  avgBadge: {
    backgroundColor: "#eff6ff", borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  avgText: { fontSize: 11, fontWeight: "700", color: BLUE },
  dateChip: { fontSize: 11, color: "#94a3b8", fontWeight: "600" },
  historyLink: { fontSize: 12, color: BLUE, fontWeight: "700" },

  // Exam
  examRow: {
    flexDirection: "row", justifyContent: "space-between", marginBottom: 6,
  },
  examSubject: { fontSize: 13, fontWeight: "600", color: "#334155" },
  examPct: { fontSize: 13, fontWeight: "700" },
  progressTrack: {
    height: 7, backgroundColor: "#f1f5f9", borderRadius: 4, overflow: "hidden",
  },
  progressFill: { height: 7, borderRadius: 4 },

  // Empty
  emptyBox: {
    alignItems: "center", paddingVertical: 24,
  },
  emptyText: { fontSize: 13, color: "#94a3b8", fontWeight: "600" },

  // Attendance
  attendanceRow: {
    flexDirection: "row", justifyContent: "space-around", marginTop: 16,
  },
  attendItem: { alignItems: "center" },
  attendVal: { fontSize: 24, fontWeight: "800" },
  attendLabel: { fontSize: 11, color: "#94a3b8", fontWeight: "600", marginTop: 2 },

  // Log
  logRow: {
    flexDirection: "row", alignItems: "center",
    gap: 12, marginTop: 14,
  },
  logIcon: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: "center", justifyContent: "center",
  },
  logTitle: { fontSize: 13, fontWeight: "700", color: "#0f172a" },
  logSub: { fontSize: 11, color: "#94a3b8", marginTop: 2 },

  // Coming soon
  comingSoon: {
    alignItems: "center", marginTop: 60, paddingBottom: 40,
  },
  comingSoonEmoji: { fontSize: 40 },
  comingSoonText: {
    fontSize: 22, fontWeight: "800", color: "#334155", marginTop: 12,
  },
  comingSoonSub: { fontSize: 14, color: "#94a3b8", marginTop: 4 },
});