import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import MainHeader from "../components/MainHeader"
import Activity from "./component/Activity"

const { width } = Dimensions.get("window");


  const usersData=[
              {
                label: "Student ID",
                value: "#12345",
                color: "#2563eb",
              },
              {
                label: "DOB",
                value: "27-12-2023",
              },
              {
                label: "Class Teacher",
                value: "Mrs. Gupta",
                color: "#2563eb",
              },
              {
                label: "Blood Group",
                value: "O+",
                color: "#ef4444",
              },
              {
                label: "Academic Year",
                value: "2026-27",
                color: "#2563eb",
              },
              {
                label: "Em. Contact",
                value: "9876543210",
              },
              {
                label: "Academic Term",
                value: "Term 1",
                color: "#2563eb",
              },
              {
                label: "Status",
                value: "Active",
                color: "#16a34a",
              },
            ]




const TAB_LIST = [
  "Activity",
  "Academics",
  "TimeTable",
  "Attendance",
  "Exam & Results",
  "Assignments",
  "Library",
];

function Avatar() {
  return (
    <View style={styles.avatarBox}>
      <Text style={styles.avatarIcon}>👤</Text>
    </View>
  );
}


function InfoGrid({ items }) {
  return (
    <View style={styles.infoGrid}>
      {items.map(({ label, value, color }) => (
        <View key={label} style={styles.infoItem}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={[styles.infoValue, { color: color || "#1e293b" }]}>
            {value}
          </Text>
        </View>
      ))}
    </View>
  );
}



export default function Home() {
  const [activeTab, setActiveTab] = useState("Activity");



  return (
    <>
    <MainHeader />

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      
      <View style={styles.headerCard}>
        <View style={styles.headerRow}>
          <View style={styles.avatarSection}>
            <Avatar />

            <Text style={styles.studentName}>RAHUL SHARMA</Text>
          </View>

          <InfoGrid
            items={usersData}
          />
        </View>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {TAB_LIST.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Stats */}
      
      {activeTab=="Activity" ?  <Activity /> : <View style={styles.rowBetween}><Text style={{fontSize:25,color:"rgb(130, 131, 131)"}}>{activeTab}</Text></View>}
      
      
    </ScrollView>
        </>
  );
}

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
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 18,
    padding: 20,
    elevation: 2,
  },

  

  rowBetween: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    marginTop: 30,
  },

 
 


});