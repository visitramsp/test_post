import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainHeader from '../components/MainHeader';

const TimeTable = () => {
  return (
    <>
    
    <MainHeader />
      <View style={styles.container}>
      <Text style={styles.text}>Time Table Screen</Text>
    </View>
    </>
  
  );
};

export default TimeTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
