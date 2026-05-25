
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");
function StatCard({ label, value, backgroundColor }) {
  return (
    <View style={[styles.statCard, { backgroundColor }]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}


function ExamPerformance() {
  const subjects = [
    { name: "Mathematics", score: 90, color: "#3b82f6" },
    { name: "Science", score: 78, color: "#22c55e" },
    { name: "English", score: 88, color: "#f59e0b" },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Exam Performance</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Avg: 85%</Text>
        </View>
      </View>

      {subjects.map((item) => (
        <View key={item.name} style={{ marginBottom: 16 }}>
          <View style={styles.rowBetween}>
            <Text style={styles.subjectName}>{item.name}</Text>
            <Text style={styles.subjectScore}>{item.score}%</Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${item.score}%`,
                  backgroundColor: item.color,
                },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

function TodaysClass() {
  const classes = [
    { subject: "English", time: "09:00 AM" },
    { subject: "Physics", time: "11:30 AM" },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Today's Class</Text>

        <Text style={styles.smallText}>16 May</Text>
      </View>

      {classes.map((item) => (
        <View key={item.subject} style={styles.classCard}>
          <View style={styles.iconBox}>
            <Text style={{ fontSize: 18 }}>📘</Text>
          </View>

          <View>
            <Text style={styles.classTitle}>{item.subject}</Text>
            <Text style={styles.classTime}>{item.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function AttendanceDonut() {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Attendance</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Weekly</Text>
        </View>
      </View>

      <View style={styles.attendanceTop}>
        <View>
          <Text style={styles.attendanceLabel}>Present</Text>
          <Text style={styles.attendanceValue}>25</Text>
        </View>

        <View>
          <Text style={styles.attendanceLabel}>Absent</Text>
          <Text style={styles.attendanceValue}>2</Text>
        </View>

        <View>
          <Text style={styles.attendanceLabel}>Half-day</Text>
          <Text style={styles.attendanceValue}>0</Text>
        </View>
      </View>

      {/* Fake Donut */}
      <View style={styles.donutWrapper}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Text style={styles.percentText}>95%</Text>
          </View>
        </View>
      </View>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: "#22c55e" }]}
          />
          <Text>P</Text>
        </View>

        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: "#ef4444" }]}
          />
          <Text>A</Text>
        </View>

        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: "#94a3b8" }]}
          />
          <Text>H</Text>
        </View>
      </View>
    </View>
  );
}

function StudentLog() {
  const logs = [
    { icon: "📚", label: "Library", sub: "Today" },
    { icon: "📝", label: "Exam", sub: "14 May" },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Student Log</Text>

        <Text style={styles.viewText}>View</Text>
      </View>

      {logs.map((item) => (
        <View key={item.label} style={styles.classCard}>
          <View style={styles.iconBox}>
            <Text style={{ fontSize: 18 }}>{item.icon}</Text>
          </View>

          <View>
            <Text style={styles.classTitle}>{item.label}</Text>
            <Text style={styles.classTime}>{item.sub}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}



const Activity=()=>{
    return(
        <>

        <View style={styles.statsWrapper}>
        <StatCard
          label="Student Batch"
          value="1A"
          backgroundColor="#6366f1"
        />

        <StatCard
          label="Academic Performance"
          value="95%"
          backgroundColor="#06b6d4"
        />

        <StatCard
          label="Overall Rank"
          value="3"
          backgroundColor="#f59e0b"
        />

        <StatCard
          label="Attendance %"
          value="95%"
          backgroundColor="#ec4899"
        />
      </View>
            <ExamPerformance />
                <TodaysClass />
                <AttendanceDonut />
            <StudentLog />
        </>
    )
}

export default Activity


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },

  headerCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },

  headerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  avatarSection: {
    alignItems: "center",
    marginRight: 20,
  },

  avatarBox: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#94a3b8",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },

  avatarIcon: {
    fontSize: 32,
  },

  studentName: {
    marginTop: 8,
    fontWeight: "800",
    fontSize: 14,
    color: "#1e293b",
  },

  infoGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  infoItem: {
    width: "50%",
    marginBottom: 12,
  },

  infoLabel: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "700",
    textTransform: "uppercase",
  },

  infoValue: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "700",
  },

  tabsContainer: {
    paddingLeft: 16,
    paddingRight:20,
    marginBottom: 16,
  },

  tabButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 8,
  },

  activeTab: {
    backgroundColor: "#3b82f6",
  },

  tabText: {
    color: "#64748b",
    fontWeight: "700",
    fontSize: 13,
  },

  activeTabText: {
    color: "#fff",
  },

  statsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  statCard: {
    width: width / 2 - 24,
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
  },

  statLabel: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "600",
  },

  statValue: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 16,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 18,
    padding: 20,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  cardTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: "#1e293b",
  },

  badge: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  subjectName: {
    fontSize: 13,
    color: "#475569",
  },

  subjectScore: {
    fontSize: 13,
    fontWeight: "700",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 99,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    borderRadius: 99,
  },

  classCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  classTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e293b",
  },

  classTime: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 2,
  },

  smallText: {
    fontSize: 12,
    color: "#64748b",
  },

  attendanceTop: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },

  attendanceLabel: {
    fontSize: 11,
    color: "#94a3b8",
    textAlign: "center",
  },

  attendanceValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1e293b",
    textAlign: "center",
  },

  donutWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },

  outerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 12,
    borderColor: "#22c55e",
    justifyContent: "center",
    alignItems: "center",
  },

  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
  },

  percentText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1e293b",
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },

  viewText: {
    fontSize: 13,
    color: "#3b82f6",
    fontWeight: "600",
  },
});