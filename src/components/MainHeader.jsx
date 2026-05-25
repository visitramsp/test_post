import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function MainHeader() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Left Side Student Icon */}
        <View style={styles.leftSection}>
          <View style={styles.studentIcon}>
            <Text style={styles.studentEmoji}>👨‍🎓</Text>
          </View>
        </View>

        {/* Right Side Icons */}
        <View style={styles.rightSection}>
          {/* Notification */}
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>🔔</Text>

            {/* Red Dot */}
            <View style={styles.redDot} />
          </TouchableOpacity>

          {/* User Profile */}
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => setOpenMenu(!openMenu)}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>

          {/* Dropdown Menu */}
          {openMenu && (
            <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Student</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>School</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.logoutItem}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f4f8",
  },

  header: {
    height: 65,
    backgroundColor: "#f0f4f8",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 18,

    borderBottomWidth: 1,
    borderBottomColor: "#fff",

    marginTop: 35,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  studentIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,

    backgroundColor: "#ffffff",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  studentEmoji: {
    fontSize: 22,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",

    position: "relative",
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: "#f8fafc",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,

    position: "relative",
  },

  iconText: {
    fontSize: 20,
  },

  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,

    backgroundColor: "#ef4444",

    position: "absolute",
    top: 10,
    right: 10,
  },

  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: "#f8fafc",

    justifyContent: "center",
    alignItems: "center",
  },

  profileIcon: {
    fontSize: 20,
  },

  /* Dropdown Menu */

  menuContainer: {
    width: 200,

    backgroundColor: "#fff",

    borderRadius: 18,

    position: "absolute",

    top: 50,
    right: 0,

    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.1,
    shadowRadius: 6,

    elevation: 6,
    zIndex:50
  },

  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,

    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  menuText: {
    fontSize: 16,
    color: "#1d4ed8",
    fontWeight: "400",
  },

  logoutItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  logoutText: {
    fontSize: 18,
    color: "#ef4444",
    fontWeight: "500",
  },
});