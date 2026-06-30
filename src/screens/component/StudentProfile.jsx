import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import MainHeader from '../../components/MainHeader';
import SettingHeader from '../../components/SettingHeader';
import { useNavigation } from '@react-navigation/native';

const StudentProfile = () => {
  // Data for Snapshot (Family Members)
  const snapshotData = [
    {
      type: 'STUDENT',
      name: 'Kavya Mishra',
      detail: 'kavya.mishra@mail.com',
      image: 'https://i.imgur.com/8Z5z5z5.jpg',
    },
    {
      type: 'FATHER',
      name: 'Anant Mishra',
      detail: '9602169460',
      image: 'https://i.imgur.com/9X9X9X9.jpg',
    },
    {
      type: 'MOTHER',
      name: 'Myra Mishra',
      detail: '9927645011',
      image: 'https://i.imgur.com/7Y7Y7Y7.jpg',
    },
    {
      type: 'GUARDIAN',
      name: 'Aarav Tiwari',
      detail: '9697251055',
      image: 'https://i.imgur.com/6Z6Z6Z6.jpg',
    },
  ];

  // Academic Info Data
  const academicData = [
    { label: 'BATCH', value: '1A' },
    { label: 'CLASS TEACHER', value: 'Aarav Sharma' },
    { label: 'ACADEMIC YEAR', value: '2026-2027' },
    { label: 'ACADEMIC TERM', value: '2026-2027 (Term-1)' },
  ];

  // Student Bio Data
  const bioData = [
    { label: 'STUDENT ID', value: '#EDU-STU-2026-00009' },
    { label: 'FULL NAME', value: 'Kavya Mishra' },
    { label: 'DATE OF BIRTH', value: '14-09-2018' },
    { label: 'BLOOD GROUP', value: 'B+', color: '#e74c3c' },
    { label: 'GENDER', value: 'Female' },
    { label: 'DATE OF JOINING', value: '17-04-2026' },
    { label: 'NATIONALITY', value: 'Indian' },
    { label: 'STATUS', value: 'Active', color: '#27ae60' },
  ];

  // Address Data
  const addressData = [
    { label: 'ADDRESS', value: 'Q - 194' },
    { label: 'CITY - PINCODE', value: 'Lucknow - 226023' },
    { label: 'STATE', value: 'UP' },
    { label: 'COUNTRY', value: 'India' },
  ];

   const guardians = [
    { label: 'GUARDIAN-1', value: 'Anant Mishra' },
    { label: 'RELATION', value: 'Father' },
    { label: 'CONTACT NO.', value: '1234567890' },
    { label: 'EMAIL', value: 'anant@gmail.com' },
    { label: 'GUARDIAN-2', value: 'Myra Mishra' },
    { label: 'RELATION', value: 'Mother' },
    { label: 'CONTACT NO.', value: '1234567890' },
    { label: 'EMAIL', value: 'marya@gmail.com' },
    { label: 'GUARDIAN-3', value: 'Aarav Tiwari' },
    { label: 'RELATION', value: 'Others' },
    { label: 'CONTACT NO.', value: '1234567890' },
    { label: 'EMAIL', value: 'aarav@gmail.com' },
  ];

   const navigation=useNavigation()
  return (
    <>
     <SettingHeader
            title={'Student Bio'}
            onBack={() => navigation.goBack()}
          />
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
     

      {/* Snapshot Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>👁 Snapshot</Text>
      </View>

      {/* Snapshot Cards using map */}
      <View style={styles.snapshotContainer}>
        {snapshotData.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.label}>{item.type}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>{item.detail}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Academic Info using map */}
      <Section title="📋 Academic Info" data={academicData} />

      {/* Student Bio using map */}
      <Section title="👤 Student Bio" data={bioData} />

      {/* Present Address using map */}
      <Section title="📍 Present Address" data={addressData} />

      <Section title="📍 Guardians" data={guardians} />
      <View style={{height:50}} />
    </ScrollView>
    </>
  );
};

// Reusable Section Component
const Section = ({ title, data }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>

    {data.map((item, index) => (
      <View key={index} style={styles.infoRow}>
        <Text style={styles.infoLabel}>{item.label}</Text>
        <Text style={[styles.infoValue, item.color && { color: item.color }]}>
          {item.value}
        </Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  header: {
    padding: 16,
    backgroundColor: '#F4F7FB',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(208, 208, 208)',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  snapshotContainer: {
    padding: 12,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 2,
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
  section: {
    marginTop: 8,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
});

export default StudentProfile;
