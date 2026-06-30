import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { AppImages, Fonts } from '../res';

const SettingHeader = ({ onBack, title, containerStyle }) => {
  return (
    <>
    
     <StatusBar
            barStyle="light-content" // white text/icons
            backgroundColor="#000"   // Android background color
          />
          <View style={{ height: 50, backgroundColor: '#000' }} />
    <View style={[styles.header, containerStyle]}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Image source={AppImages.Back} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.rightSpace} />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingRight: 20,
    paddingVertical: 8,
    // marginTop: 40,
    backgroundColor: '#FFFFFF',        // clean white — matches status bar area
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF2',       // subtle separator line
    elevation: 3,                       // Android shadow
    shadowColor: '#0D2B55',            // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  backButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    height: 20,
    width: 20,
    tintColor: '#434242',              // dark gray — visible on white
  },
  bellIcon: {
    height: 24,
    width: 24,
    tintColor: '#0D2B55',             // navy — matches page theme
  },
  headerTitle: {
    fontFamily: Fonts.instrumentSansMedium,
    fontSize: 16,
    color: '#0D2B55',                  // navy — matches hero banner below
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  rightSpace: {
    width: 40,
  },
});

export default SettingHeader;