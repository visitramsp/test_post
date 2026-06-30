import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  Animated,
  Easing,
  Modal,
  Pressable,
  Platform,
} from "react-native";
import { AppImages } from "../res";

const DASHBOARD_ITEMS = [
  { id: "ELearning",    label: "E-Learning",    icon: "🎓" },
  { id: "ClassDiary",   label: "Class Diary",   icon: "📖" },
  { id: "SchoolNotice", label: "School Notice", icon: "📢" },
];

const PROFILE_ITEMS = [
  { id: "StudentProfile", label: "Student",     icon: "👨‍🎓" },
  { id: "SchoolInfo",     label: "School Info", icon: "🏫" },
];

export default function MainHeader() {
  const navigation = useNavigation();

  // which modal is open: null | 'dashboard' | 'profile'
  const [activeMenu, setActiveMenu] = useState(null);

  // positions of the two buttons so we can anchor the dropdown
  const [dashPos, setDashPos] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [profPos, setProfPos] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const dashRef = useRef(null);
  const profRef = useRef(null);

  const measure = (ref, setter) => {
    ref.current?.measureInWindow((x, y, width, height) => {
      setter({ x, y, w: width, h: height });
    });
  };

  const openDash = () => {
    measure(dashRef, setDashPos);
    setActiveMenu("dashboard");
  };

  const openProf = () => {
    measure(profRef, setProfPos);
    setActiveMenu("profile");
  };

  const close = () => setActiveMenu(null);

  const handleNavigate = (screen) => {
    close();
    if(screen=="ELearning"){
   setTimeout(() => navigation.navigate("Learning"), 100);
    }else{
   setTimeout(() => navigation.navigate(screen), 100);
    }
 
      // navigation.navigate("SchoolNotice")
    // SchoolNotice
  };

  // dropdown top = button bottom + small gap
  const DROPDOWN_W = 220;
  const GAP = 6;

  const dashTop  = dashPos.y + dashPos.h + GAP;
  const dashLeft = dashPos.x + dashPos.w - DROPDOWN_W; // right-align to button

  const profTop  = profPos.y + profPos.h + GAP;
  const profLeft = profPos.x + profPos.w - DROPDOWN_W;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>

          {/* Left: Student Icon */}
          <View style={styles.studentIcon}>
            <Text style={styles.studentEmoji}>👨‍🎓</Text>
          </View>

          {/* Right: Buttons */}
          <View style={styles.rightSection}>

            {/* Dashboard / Menu Button */}
            <TouchableOpacity
              ref={dashRef}
              style={[styles.iconBtn, activeMenu === "dashboard" && styles.iconBtnActive]}
              onPress={openDash}
              activeOpacity={0.75}
            >
              <Image source={AppImages.menu} style={styles.menuIcon} />
            </TouchableOpacity>

            {/* Notification Bell */}
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.75}>
              <Text style={styles.emojiIcon}>🔔</Text>
              <View style={styles.redDot} />
            </TouchableOpacity>

            {/* Profile Button */}
            <TouchableOpacity
              ref={profRef}
              style={[styles.iconBtn, activeMenu === "profile" && styles.iconBtnActive]}
              onPress={openProf}
              activeOpacity={0.75}
            >
              <Text style={styles.emojiIcon}>👤</Text>
            </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>

      {/* ── Dashboard Modal ── */}
      <Modal transparent visible={activeMenu === "dashboard"} animationType="fade" onRequestClose={close}>
        <Pressable style={styles.overlay} onPress={close}>
          <Pressable
            style={[styles.dropdown, { top: dashTop, left: Math.max(8, dashLeft) }]}
            onPress={() => {}} // stop propagation
          >
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>Quick Access</Text>
            </View>
            {DASHBOARD_ITEMS.map((item, i) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, i === DASHBOARD_ITEMS.length - 1 && styles.menuItemLast]}
                onPress={() => handleNavigate(item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemIcon}>
                  <Text style={styles.menuItemEmoji}>{item.icon}</Text>
                </View>
                <Text style={styles.menuItemText}>{item.label}</Text>
                <Text style={styles.menuChevron}>›</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* ── Profile Modal ── */}
      <Modal transparent visible={activeMenu === "profile"} animationType="fade" onRequestClose={close}>
        <Pressable style={styles.overlay} onPress={close}>
          <Pressable
            style={[styles.dropdown, { top: profTop, left: Math.max(8, profLeft) }]}
            onPress={() => {}}
          >
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>My Account</Text>
            </View>
            {PROFILE_ITEMS.map((item, i) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, i === PROFILE_ITEMS.length - 1 && styles.menuItemLast]}
                onPress={() => handleNavigate(item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemIcon}>
                  <Text style={styles.menuItemEmoji}>{item.icon}</Text>
                </View>
                <Text style={styles.menuItemText}>{item.label}</Text>
                <Text style={styles.menuChevron}>›</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.logoutItem} onPress={close} activeOpacity={0.7}>
              <View style={[styles.menuItemIcon, styles.logoutIconBg]}>
                <Text style={styles.menuItemEmoji}>🚪</Text>
              </View>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const HEADER_BG   = "#1A3A7C";
const ICON_BG     = "rgba(255,255,255,0.15)";
const ICON_ACTIVE = "rgba(255,255,255,0.30)";

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#000",
    paddingTop:40
  },
  header: {
    height: 62,
    backgroundColor: HEADER_BG,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },

  studentIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  studentEmoji: { fontSize: 22 },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: ICON_BG,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  iconBtnActive: {
    backgroundColor: ICON_ACTIVE,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  emojiIcon: { fontSize: 19 },
  menuIcon: {
    width: 17,
    height: 17,
    tintColor: "#ffffff",
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    borderWidth: 1.5,
    borderColor: HEADER_BG,
    position: "absolute",
    top: 7,
    right: 7,
  },

  // Modal overlay — transparent, full screen
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },

  // Dropdown card — absolutely positioned via top/left
  dropdown: {
    position: "absolute",
    width: 220,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#1A3A7C",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 20,
  },

  dropdownHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F0F4FF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F4",
  },
  dropdownTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B7DB3",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5FB",
  },
  menuItemLast: { borderBottomWidth: 0 },
  menuItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuItemEmoji: { fontSize: 16 },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#1A3A7C",
  },
  menuChevron: {
    fontSize: 20,
    color: "#A0AEC0",
    marginTop: -1,
  },

  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 16,
    backgroundColor: "#FFF5F5",
  },
  logoutIconBg: { backgroundColor: "#FFE4E4" },
  logoutText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#ef4444",
  },
});