import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainHeader from '../components/MainHeader';

const LeaveApply = () => {
  return (
    <>
    
    <MainHeader />
      <View style={styles.container}>
      <Text style={styles.text}>Leave Apply Screen</Text>
    </View>
    </>
  
  );
};

export default LeaveApply;

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
