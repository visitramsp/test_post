import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MainHeader from '../../components/MainHeader';
import SettingHeader from '../../components/SettingHeader';
import { useNavigation } from '@react-navigation/native';

// ─── Responsive helpers ───────────────────────────────────────────────────────
const { width: SW } = Dimensions.get('window');
const isTablet = SW >= 768;
const isMedium = SW >= 480;
const scale = (n) => (isTablet ? n * 1.22 : isMedium ? n * 1.08 : n);
const H_PAD = isTablet ? 28 : isMedium ? 20 : 16;

// ─── Colour tokens ────────────────────────────────────────────────────────────
const C = {
  bg:          '#F5F7FA',
  surface:     '#FFFFFF',
  surfaceAlt:  '#EEF3FA',
  navy:        '#0D2B55',
  navyLight:   '#1A4A8A',
  blue:        '#1976D2',
  blueLight:   '#E3EEFA',
  teal:        '#00897B',
  tealLight:   '#E0F2F1',
  amber:       '#F57C00',
  amberLight:  '#FFF3E0',
  red:         '#C62828',
  redLight:    '#FFEBEE',
  textPrimary: '#0D1B2A',
  textSec:     '#4A6070',
  textMuted:   '#8FA3B1',
  border:      '#E0EAF2',
  divider:     '#EEF2F7',
  gold:        '#C8960C',
  goldLight:   '#FDF5DC',
};

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ icon, title, accent = C.blue }) => (
  <View style={[sH.row, { marginHorizontal: H_PAD, marginTop: 28, marginBottom: 4 }]}>
    <View style={[sH.pill, { backgroundColor: accent + '22' }]}>
      <Text style={[sH.icon, { color: accent }]}>{icon}</Text>
    </View>
    <Text style={[sH.title, { color: accent }]}>{title}</Text>
    <View style={[sH.line, { backgroundColor: accent + '33' }]} />
  </View>
);
const sH = StyleSheet.create({
  row:   { flexDirection: 'row', alignItems: 'center', gap: 10 },
  pill:  { width: scale(32), height: scale(32), borderRadius: scale(16), alignItems: 'center', justifyContent: 'center' },
  icon:  { fontSize: scale(15) },
  title: { fontSize: scale(13), fontWeight: '800', letterSpacing: 1.1, textTransform: 'uppercase' },
  line:  { flex: 1, height: 1.5, borderRadius: 2 },
});

// ─── Info Row (label + value) ─────────────────────────────────────────────────
const InfoRow = ({ label, value, valueColor = C.textPrimary, onPress, last = false }) => (
  <TouchableOpacity
    activeOpacity={onPress ? 0.7 : 1}
    onPress={onPress}
    style={[iR.wrap, last && iR.last]}
  >
    <Text style={iR.label}>{label}</Text>
    <Text style={[iR.value, { color: valueColor }]}>{value}</Text>
  </TouchableOpacity>
);
const iR = StyleSheet.create({
  wrap:  {
    paddingHorizontal: H_PAD,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
    backgroundColor: C.surface,
  },
  last:  { borderBottomWidth: 0 },
  label: { fontSize: scale(10.5), fontWeight: '700', color: C.textMuted, letterSpacing: 0.9, textTransform: 'uppercase', marginBottom: 5 },
  value: { fontSize: scale(15), fontWeight: '600', lineHeight: scale(22) },
});

// ─── Card wrapper ─────────────────────────────────────────────────────────────
const Card = ({ children, style }) => (
  <View style={[card.box, style]}>{children}</View>
);
const card = StyleSheet.create({
  box: {
    backgroundColor: C.surface,
    borderRadius: scale(16),
    marginHorizontal: H_PAD,
    marginTop: 10,
    overflow: 'hidden',
    shadowColor: '#0D2B55',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: C.border,
  },
});

// ─── Contact Card ─────────────────────────────────────────────────────────────
const ContactCard = ({ title, name, designation, email, phone, accent = C.blue }) => (
  <Card style={{ marginTop: 10 }}>
    {/* Colored accent bar */}
    <View style={[cc.bar, { backgroundColor: accent }]} />
    <View style={cc.body}>
      {/* Avatar */}
      <View style={[cc.avatar, { backgroundColor: accent + '22', borderColor: accent + '44' }]}>
        <Text style={[cc.avatarText, { color: accent }]}>
          {name.split(' ').map(w => w[0]).join('').slice(0, 2)}
        </Text>
      </View>
      <View style={cc.info}>
        <Text style={cc.name}>{name}</Text>
        <Text style={[cc.desg, { color: accent }]}>{designation}</Text>
      </View>
    </View>
    <View style={cc.divider} />
    <TouchableOpacity style={cc.row} onPress={() => Linking.openURL(`mailto:${email}`)}>
      <Text style={cc.rowIcon}>✉️</Text>
      <View>
        <Text style={cc.rowLabel}>EMAIL</Text>
        <Text style={[cc.rowVal, { color: C.blue }]}>{email}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={[cc.row, { borderTopWidth: 1, borderTopColor: C.divider }]} onPress={() => Linking.openURL(`tel:${phone}`)}>
      <Text style={cc.rowIcon}>📞</Text>
      <View>
        <Text style={cc.rowLabel}>CONTACT NO.</Text>
        <Text style={[cc.rowVal, { color: C.teal }]}>{phone}</Text>
      </View>
    </TouchableOpacity>
  </Card>
);
const cc = StyleSheet.create({
  bar:       { height: 4 },
  body:      { flexDirection: 'row', alignItems: 'center', padding: scale(16), gap: 14 },
  avatar:    { width: scale(52), height: scale(52), borderRadius: scale(26), alignItems: 'center', justifyContent: 'center', borderWidth: 1.5 },
  avatarText:{ fontSize: scale(18), fontWeight: '800' },
  info:      { flex: 1 },
  name:      { fontSize: scale(16), fontWeight: '700', color: C.textPrimary, marginBottom: 2 },
  desg:      { fontSize: scale(12), fontWeight: '600', letterSpacing: 0.4 },
  divider:   { height: 1, backgroundColor: C.divider, marginHorizontal: scale(16) },
  row:       { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: scale(16), paddingVertical: 13 },
  rowIcon:   { fontSize: scale(18) },
  rowLabel:  { fontSize: scale(10), fontWeight: '700', color: C.textMuted, letterSpacing: 0.9, marginBottom: 2 },
  rowVal:    { fontSize: scale(14), fontWeight: '600' },
});

// ─── Hero Banner ──────────────────────────────────────────────────────────────
const HeroBanner = ({ name, since, category }) => (
  <View style={hero.wrap}>
   <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    paddingTop:12
  }}
>
  {/* <TouchableOpacity>
    <Text style={{color:"white"}}>Back</Text>
  </TouchableOpacity> */}

  <View style={{ flex: 1, alignItems: "center" }}>
    <View style={hero.badge}>
      <Text style={hero.badgeText}>{category}</Text>
    </View>
  </View>
  <View></View>
</View>
    <View style={hero.logoCircle}>
      <Text style={hero.logoText}>🏫</Text>
    </View>
    <Text style={hero.name}>{name}</Text>
    <Text style={hero.since}>Est. {since}</Text>
    <View style={hero.dividerRow}>
      <View style={hero.dot} />
      <View style={hero.dashedLine} />
      <View style={hero.dot} />
    </View>
  </View>
);
const hero = StyleSheet.create({
  wrap: {
    backgroundColor: C.navy,
    paddingTop: isTablet ? 48 : 36,
    paddingBottom: 32,
    paddingHorizontal: H_PAD,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: C.gold + '33',
    borderWidth: 1,
    borderColor: C.gold + '66',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 16,
  },
  badgeText:  { fontSize: scale(11), fontWeight: '700', color: C.gold, letterSpacing: 1 },
  logoCircle: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  logoText:    { fontSize: scale(36) },
  name:        { fontSize: scale(18), fontWeight: '800', color: '#FFFFFF', textAlign: 'center', letterSpacing: 0.3, lineHeight: scale(26) },
  since:       { fontSize: scale(12), color: 'rgba(255,255,255,0.55)', marginTop: 6, fontWeight: '500', letterSpacing: 0.5 },
  dividerRow:  { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 20 },
  dot:         { width: 6, height: 6, borderRadius: 3, backgroundColor: C.gold + '88' },
  dashedLine:  { width: 60, height: 1.5, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 1 },
});

// ─── Quick Stat Strip ─────────────────────────────────────────────────────────
const StatStrip = () => (
  <View style={ss.row}>
    {[
      { icon: '📅', label: 'Since', val: '2025' },
      { icon: '🏷️', label: 'Category', val: 'Middle' },
      { icon: '📋', label: 'Reg. No', val: 'N/A' },
    ].map((s, i) => (
      <View key={i} style={[ss.item, i < 2 && ss.border]}>
        <Text style={ss.icon}>{s.icon}</Text>
        <Text style={ss.val}>{s.val}</Text>
        <Text style={ss.label}>{s.label}</Text>
      </View>
    ))}
  </View>
);
const ss = StyleSheet.create({
  row:    {
    flexDirection: 'row',
    backgroundColor: C.navyLight,
    marginHorizontal: H_PAD,
    marginTop: -1,
    borderRadius: scale(14),
    overflow: 'hidden',
    shadowColor: C.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },
  item:   { flex: 1, alignItems: 'center', paddingVertical: 14 },
  border: { borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.12)' },
  icon:   { fontSize: scale(18), marginBottom: 4 },
  val:    { fontSize: scale(14), fontWeight: '800', color: '#FFFFFF' },
  label:  { fontSize: scale(10), color: 'rgba(255,255,255,0.55)', marginTop: 2, fontWeight: '600', letterSpacing: 0.5 },
});

// ─── About Box ────────────────────────────────────────────────────────────────
const AboutBox = ({ text }) => (
  <Card>
    <View style={ab.inner}>
      <View style={ab.quoteBar} />
      <Text style={ab.text}>{text}</Text>
    </View>
  </Card>
);
const ab = StyleSheet.create({
  inner:    { flexDirection: 'row', padding: scale(16), gap: 12 },
  quoteBar: { width: 3.5, borderRadius: 2, backgroundColor: C.teal, alignSelf: 'stretch' },
  text:     { flex: 1, fontSize: scale(13.5), color: C.textSec, lineHeight: scale(22), fontStyle: 'italic' },
});

// ─── Address Card ─────────────────────────────────────────────────────────────
const AddressCard = ({ address, cityPin, state, country }) => (
  <Card style={{ marginBottom: 32 }}>
    <View style={addr.mapBanner}>
      <Text style={addr.mapEmoji}>📍</Text>
      <Text style={addr.mapLabel}>Location Details</Text>
    </View>
    <View style={addr.body}>
      {[
        { label: 'ADDRESS',   val: address },
        { label: 'CITY – PIN', val: cityPin },
        { label: 'STATE',     val: state },
        { label: 'COUNTRY',   val: country },
      ].map((r, i, arr) => (
        <View key={i} style={[addr.row, i < arr.length - 1 && addr.rowBorder]}>
          <Text style={addr.label}>{r.label}</Text>
          <Text style={addr.val}>{r.val}</Text>
        </View>
      ))}
    </View>
  </Card>
);
const addr = StyleSheet.create({
  mapBanner: { backgroundColor: C.redLight, flexDirection: 'row', alignItems: 'center', gap: 10, padding: scale(14) },
  mapEmoji:  { fontSize: scale(20) },
  mapLabel:  { fontSize: scale(13), fontWeight: '700', color: C.red },
  body:      { padding: scale(16), gap: 14 },
  row:       { paddingBottom: 14, borderBottomColor: C.divider },
  rowBorder: { borderBottomWidth: 1 },
  label:     { fontSize: scale(10), fontWeight: '700', color: C.textMuted, letterSpacing: 0.9, marginBottom: 3 },
  val:       { fontSize: scale(14), fontWeight: '600', color: C.textPrimary },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function SchoolInfo() {
    const navigation=useNavigation()
  return (
    <>
      {/* <StatusBar barStyle="light-content" backgroundColor={C.navy} /> */}
      {/* <MainHeader/> */}
     <SettingHeader
            title={'School Info'}
            onBack={() => navigation.goBack()}
          />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <HeroBanner
          name="FELLOW BUDDY SERVICES LLP (FBSL)"
          since="2025"
          category="Middle School"
        />

        {/* Quick stat strip — overlaps hero */}
        <View style={{ marginTop: -1 }}>
          <StatStrip />
        </View>

        {/* ── Snapshot Section ── */}
        <SectionHeader icon="📋" title="Snapshot" accent={C.blue} />
        <Card>
          <InfoRow label="School Name"      value="FELLOW BUDDY SERVICES LLP (FBSL)" valueColor={C.navy} />
          <InfoRow label="Established Since" value="2025"                              valueColor={C.textPrimary} />
          <InfoRow label="Website"           value="www.fbsl.in"                       valueColor={C.blue}
            onPress={() => Linking.openURL('https://www.fbsl.in')} />
          <InfoRow label="Registration No."  value="N/A"                               valueColor={C.textPrimary} />
          <InfoRow label="School Category"   value="Middle School"                     valueColor={C.teal} />
          <InfoRow label="Email"             value="school@mail.com"                   valueColor={C.blue}
            onPress={() => Linking.openURL('mailto:school@mail.com')} />
          <InfoRow label="Mobile No."        value="9112233445"                        valueColor={C.teal}
            onPress={() => Linking.openURL('tel:9112233445')} />
          <InfoRow label="Landline No."      value={"0512-111111\n0512-222222"}         valueColor={C.textPrimary} last />
        </Card>

        {/* ── About School ── */}
        <SectionHeader icon="ℹ️" title="About School" accent={C.teal} />
        <AboutBox text="FBSL school located in a quiet area, it boasts a beautiful campus with spacious classrooms, a large playground, and a well-stocked library. The teachers are very knowledgeable, helping understand difficult subjects while encouraging students to do their best. Besides academics, the school offers various activities such as sports, music, and art, which make school life enjoyable." />

        {/* ── Primary Contact ── */}
        <SectionHeader icon="👤" title="School Primary Contact" accent={C.blue} />
        <ContactCard
          title="Primary Contact"
          name="Arvind Gupta"
          designation="Administrative Assistant"
          email="arvind@mail.com"
          phone="9876453210"
          accent={C.blue}
        />

        {/* ── Secondary Contact ── */}
        <SectionHeader icon="👤" title="School Secondary Contact" accent={C.navyLight} />
        <ContactCard
          title="Secondary Contact"
          name="Brij Gupta"
          designation="Administrative Officer"
          email="brij@mail.com"
          phone="9012345678"
          accent={C.navyLight}
        />

        {/* ── Address ── */}
        <SectionHeader icon="📍" title="Address" accent={C.red} />
        <AddressCard
          address="1-123 Vikas Nagar"
          cityPin="Lucknow – 226022"
          state="Uttar Pradesh"
          country="India"
        />
      </ScrollView>
    </>
  );
}

// ─── Base Styles ──────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: C.navy },
  scroll:  { flex: 1, backgroundColor: "#F4F7FB" },
  content: { paddingBottom: 0 },
});