import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainHeader from '../components/MainHeader';

const Chats = () => {
  return (
    <>
    
    <MainHeader />
      <View style={styles.container}>
      <Text style={styles.text}>Chats Screen</Text>
    </View>
    </>
  
  );
};

export default Chats;

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
