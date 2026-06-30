import React, { useCallback, useEffect, useState } from 'react';
import { Image, StatusBar, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppImages, Colors } from '../res';
import Home from '../Dashboard/Home';
import Settings from '../Dashboard/settings';
import BookScreen from '../screens/BookScreen';
import Loyalty from '../Dashboard/Loyalty';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MemberScreen from '../screens/MemberScreen';
import { useFocusEffect } from '@react-navigation/native';
import Chats from "../screens/Chats"

import LeaveApply from "../screens/ApplyLeave"
import TimeTable from "../screens/TimeTable"


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  // const [userName, setUserName] = useState('');
  // const [memberShip, setMembershipNumber] = useState('');
  let screen = 'Loyalty';
  const fetchUser = async () => {
    try {
      const userName = await AsyncStorage.getItem('name');
      const membershipNum = await AsyncStorage.getItem('membershipNumber');

      console.log('🟢 Fetched user:', { userName, membershipNum });

      // ✅ Check if userName is missing or empty
      if (!userName || userName === 'null' || userName === 'undefined') {
        console.log('🔴 No user found, navigating to Loyalty screen...=====');
        screen = 'Loyalty';
      } else {
        screen = 'MemberScreen';
      }
    } catch (error) {
      console.log('❌ Error fetching user:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, []),
  );

  return (
    <>
    <StatusBar
        translucent={false}
        barStyle="dark-content"
        backgroundColor="#000000"
      />
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabelStyle: { fontSize: 10 },
        tabBarActiveTintColor: Colors.APPBLACK,
        tabBarStyle: { backgroundColor: Colors.WHITE },
      })}
    >
      <Tab.Screen
        name="Explore"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? AppImages.Home : AppImages.Home}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? Colors.MEDIUMTURQUOISE : '',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Book"
        component={TimeTable}
        options={{
          tabBarLabel: 'Time Table',
          tabBarIcon: ({ focused }) => (
            <View style={{ width: 24, height: 24 }}>
              <Image
                source={focused ? AppImages.calender : AppImages.calender}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? Colors.MEDIUMTURQUOISE : '',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={screen}
        component={screen == 'Loyalty' ? LeaveApply : LeaveApply}
        options={{
          tabBarLabel: 'Apply Leave',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? AppImages.loyalty : AppImages.loyalty}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? Colors.MEDIUMTURQUOISE : '',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Chats}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? AppImages.charts : AppImages.charts}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? Colors.MEDIUMTURQUOISE : '',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
    </>
  );
};

export default BottomTabs;
