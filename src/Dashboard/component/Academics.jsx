import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const courses = [
  {
    id: '1',
    title: 'Hindi',
    instructor: 'Aarav Sharma',
    topics: 0,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '2',
    title: 'Maths',
    instructor: 'Arjun Gupta',
    topics: 0,
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: '3',
    title: 'Science',
    instructor: 'Aditi Singh',
    topics: 0,
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: '4',
    title: 'English',
    instructor: 'Priya Mehta',
    topics: 3,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '5',
    title: 'History',
    instructor: 'Rahul Verma',
    topics: 5,
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
];

const CourseCard = ({ course }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.85}>
    <Image source={{ uri: course.image }} style={styles.avatar} />
    <View style={styles.cardContent}>
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.instructorName}>By {course.instructor}</Text>
    </View>
    <Text style={styles.topicsCount}>{course.topics} Topics</Text>
  </TouchableOpacity>
);

export default function Academics() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Courses &amp; Topics</Text>

        {/* Scrollable box matching the screenshot */}
        <View style={styles.scrollBox}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.scrollContent}
          >
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF2F8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A2F6E',
    marginBottom: 20,
    letterSpacing: 0.2,
  },

  // The outer rounded scrollable box (as seen in screenshot)
  scrollBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#A0AEC0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  scrollContent: {
    padding: 16,
    gap: 14,
  },

  // Individual course card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F4',
    shadowColor: '#B0BCD4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#D0D8EE',
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  courseTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1A2F6E',
    marginBottom: 4,
  },
  instructorName: {
    fontSize: 14,
    color: '#7A8AAD',
    fontWeight: '400',
  },
  topicsCount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2563EB',
    marginLeft: 8,
  },
});