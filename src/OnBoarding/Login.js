// import React, { useState } from 'react';
// import {
//   Text,
//   StyleSheet,
//   View,
//   ImageBackground,
//   Image,
//   TouchableOpacity,
//   Alert,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
//   Keyboard,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { setLoginField, setMembershipNumber,setUserData } from '../redux/slices/authSlice';
// import { checkNormalData } from '../components/Validation';
// import ActivityIndicator from '../components/ActivityIndicator';
// import { AppImages } from '../res';
// import InputText from '../components/InputText';
// import ErrorView from '../components/ErrorView';
// import Button from '../components/Button';
// import { postApi } from '../services/network/api';
// import { colors, fonts, styles as commonStyles } from '../themes';
// import { showToast } from '../services/Toast';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ correct import

// export default function SignIn(props) {
//   const dispatch = useDispatch();
//   const membershipNumber = useSelector(state => state.auth.membershipNumber);

//   const [loginField, setUserName] = useState(membershipNumber || '');
//   const [password, setPassword] = useState('');
//   const [hidePassword, setHidePassword] = useState(true);
//   const [userNameError, setUserNameError] = useState({
//     status: false,
//     text: '',
//   });
//   const [passwordError, setPasswordError] = useState({
//     status: false,
//     text: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const setErrorState = () => {
//     if (password === '') {
//       setPasswordError(checkNormalData(password, 'Please enter password'));
//     }
//   };

//   // const signIn = async () => {
//   //   const data = { loginField, password };
//   //   setIsLoading(true);
//   //   const response = await postApi('login', data);
//   //   setIsLoading(false);

//   //   if (response.success) {
//   //     dispatch(setLoginField(loginField));
//   //     await AsyncStorage.setItem('token', response.data.access_token);
//   //     await AsyncStorage.setItem('phone', response.data.phone);
//   //     await AsyncStorage.setItem('name', response.data.name);
//   //     dispatch(setMembershipNumber(loginField));
//   //     await AsyncStorage.setItem('membershipNumber', loginField);
//   //     props.navigation.navigate('BottomTabs', { screen: 'Book' });

//   //     showToast('success', response.message);
//   //   } else {
//   //     showToast('error', response.message);
//   //   }
//   // };

//   const signIn = async () => {
//   const data = { loginField, password };
//   console.log(data,"=====>data fathima")
//   setIsLoading(true);

//   const response = await postApi('login', data);
//   setIsLoading(false);

//   if (response.success) {
//     // Save everything in Redux
//     dispatch(setUserData({
//       user: {
//         name: response.data.name,
//         phone: response.data.phone,
//         membership_number: response.data.membership_number
//       },
//       token: response.data.access_token
//     }));

//     // Navigation
//     props.navigation.navigate('BottomTabs', { screen: 'Book' });

//     showToast('success', response.message);
//   } else {
//     showToast('error', response.message);
//   }
// };


//   const submit = () => {
//     Keyboard.dismiss();
//     if (
//       !checkNormalData(loginField, '').status &&
//       !checkNormalData(password, '').status
//     ) {
//       setErrorState();
//       signIn();
//     } else {
//       setErrorState();
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: 'white' }}>
//       {/* Fixed Background */}
//       <ImageBackground
//         source={AppImages.ccc}
//         style={styles.bgImage}
//         resizeMode="cover"
//       >
//         <View style={styles.overlay} />
//         {/* Back Button */}
//         <TouchableOpacity
//           onPress={() =>
//             props.navigation.navigate('BottomTabs', { screen: 'Explore' })
//           }
//           style={styles.backBtn}
//         >
//           <Image
//             source={AppImages.Back}
//             style={{ height: 25, width: 25, tintColor: 'white' }}
//           />
//         </TouchableOpacity>

//         {/* Logo */}
//         <View style={styles.logoContainer}>
//           <Image
//             source={AppImages.logo}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//         </View>
//       </ImageBackground>

//       {/* Bottom Sheet (Moves with Keyboard) */}
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : null}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
//         style={styles.bottomSheetWrapper}
//       >
//         <ScrollView
//           contentContainerStyle={styles.bottomSheet}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           <Text style={styles.title}>SIGN IN</Text>
//           <Text style={styles.subtitle}>Your Colony Account</Text>

//           <InputText
//             placeholder="Enter membership no."
//             label="Membership number"
//             placeholderTextColor="#6D6D6D"
//             containerStyle={{ marginTop: 30, marginBottom: 0 }}
//             inputStyle={styles.inputText}
//             value={loginField}
//             onChangeText={value => {
//               setUserName(value);
//               setUserNameError(
//                 checkNormalData(value, 'Please enter Email ID.'),
//               );
//             }}
//           />
//           <ErrorView text={userNameError.text} show={userNameError.status} />

//           {/* Password Field */}
//           <View style={styles.passwordContainer}>
//             <InputText
//               placeholder="Enter Password"
//               label="Password"
//               placeholderTextColor="#6D6D6D"
//               secureTextEntry={hidePassword}
//               value={password}
//               containerStyle={{ flex: 1, marginBottom: 0 }}
//               inputStyle={styles.inputText}
//               onChangeText={value => {
//                 setPassword(value);
//                 setPasswordError(
//                   checkNormalData(value, 'Please enter password'),
//                 );
//               }}
//             />
//             <TouchableOpacity
//               style={styles.eyeIcon}
//               activeOpacity={0.3}
//               onPress={() => setHidePassword(!hidePassword)}
//             >
//               <Image
//                 style={styles.eyeImg}
//                 source={hidePassword ? AppImages.closeeye : AppImages.openeye}
//               />
//             </TouchableOpacity>
//           </View>

//           <ErrorView text={passwordError.text} show={passwordError.status} />
//           <Button
//             title="Sign In"
//             style={styles.signInBtn}
//             textTitle={styles.signInBtnText}
//             onPress={submit}
//           />
//           <Text
//             style={styles.forgot}
//             onPress={() => props.navigation.navigate('ForgotPassword')}
//           >
//             Forgot Password?
//           </Text>

//           <View style={{ height: 50 }} />
//         </ScrollView>
//       </KeyboardAvoidingView>

//       {/* Footer (Fixed) */}
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>
//           Don't have an account?{' '}
//           <Text
//             style={styles.signUpText}
//             onPress={() => props.navigation.push('Signup')}
//           >
//             Sign Up.
//           </Text>
//         </Text>
//       </View>

//       <ActivityIndicator onRequestClose={false} isLoading={isLoading} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   bgImage: {
//     height: '70%',
//     width: '100%',
//     // justifyContent: 'center',
//   },
//   backBtn: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     zIndex: 10,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black overlay
//   },
//   logoContainer: {
//     alignSelf: 'center',
//     marginTop: 100,
//   },
//   logo: {
//     height: 140,
//     width: 200,
//     tintColor: colors.white,
//   },
//   bottomSheetWrapper: {
//     flex: 1,
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//   },
//   bottomSheet: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     paddingHorizontal: 0,
//     paddingBottom: 30,
//     paddingTop: 25,
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: fonts.fs_32,
//     color: '#1A1A1A',
//     fontFamily: 'InstrumentSans_Condensed-medium',
//   },
//   subtitle: {
//     textAlign: 'center',
//     fontSize: fonts.fs_22,
//     color: colors.txtColor,
//     fontFamily: 'InstrumentSans_Condensed-medium',
//   },
//   inputText: {
//     fontSize: fonts.fs_16,
//     color: colors.black,
//     fontFamily: 'InstrumentSans_Condensed-medium',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 30,
//     top: 32,
//   },
//   eyeImg: {
//     height: 24,
//     width: 24,
//     tintColor: colors.black,
//     marginTop: 15,
//   },
//   forgot: {
//     textAlign: 'center',
//     marginTop: 15,
//     fontSize: fonts.fs_18,
//     color: colors.txtColor,
//     fontFamily: 'InstrumentSans_Condensed-medium',
//     // marginBottom: 20,
//   },
//   signInBtn: {
//     alignSelf: 'center',
//     marginTop: 25,
//     backgroundColor: '#b49b5e', // golden brown tone
//     borderRadius: 25,
//   },
//   signInBtnText: {
//     fontFamily: 'InstrumentSans_Condensed-medium',
//     fontSize: fonts.fs_16,
//     color: colors.white,
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//   },
//   footerText: {
//     fontSize: fonts.fs_16,
//     fontFamily: 'InstrumentSans_Condensed-regular',
//     color: colors.txtColor,
//   },
//   signUpText: {
//     color: '#2E43C5',
//   },
// });


import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// ── Diamond background pattern tiles ──────────────────────────────────────
const DIAMONDS = [
  { x: -30, y: 40,  size: 90,  rotate: '45deg', opacity: 0.18 },
  { x: 60,  y: 10,  size: 70,  rotate: '45deg', opacity: 0.13 },
  { x: 140, y: 60,  size: 100, rotate: '45deg', opacity: 0.10 },
  { x: 250, y: 20,  size: 80,  rotate: '45deg', opacity: 0.14 },
  { x: 310, y: 80,  size: 60,  rotate: '45deg', opacity: 0.10 },
  { x: -20, y: 130, size: 75,  rotate: '45deg', opacity: 0.12 },
  { x: 80,  y: 155, size: 95,  rotate: '45deg', opacity: 0.09 },
  { x: 200, y: 120, size: 65,  rotate: '45deg', opacity: 0.13 },
  { x: 300, y: 150, size: 85,  rotate: '45deg', opacity: 0.10 },
  { x: 10,  y: 230, size: 80,  rotate: '45deg', opacity: 0.11 },
  { x: 120, y: 260, size: 55,  rotate: '45deg', opacity: 0.08 },
  { x: 240, y: 210, size: 90,  rotate: '45deg', opacity: 0.12 },
  { x: 330, y: 245, size: 70,  rotate: '45deg', opacity: 0.09 },
];

export default function SignIn() {
  const [protocol, setProtocol]       = useState('https');
  const [showProtocol, setShowProtocol] = useState(false);
  const [url, setUrl]                 = useState('');
  const [username, setUsername]       = useState('');
  const [password, setPassword]       = useState('');
  const [showPass, setShowPass]       = useState(false);
  const [remember, setRemember]       = useState(true);
  const [urlFocus, setUrlFocus]       = useState(false);
  const [userFocus, setUserFocus]     = useState(false);
  const [passFocus, setPassFocus]     = useState(false);

  // ref to measure protocol button position
  const protocolRef = useRef(null);
  const [protocolPos, setProtocolPos] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const openProtocol = () => {
    protocolRef.current?.measureInWindow((x, y, w, h) => {
      setProtocolPos({ x, y, w, h });
      setShowProtocol(true);
    });
  };

  const navigation=useNavigation()

  const onLogin=()=>{
    navigation.navigate("BottomTabs")
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#000" />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* ── Background diamond pattern ── */}
            <View style={styles.bgPattern} pointerEvents="none">
              {DIAMONDS.map((d, i) => (
                <View
                  key={i}
                  style={[
                    styles.diamond,
                    {
                      left: d.x,
                      top: d.y,
                      width: d.size,
                      height: d.size,
                      opacity: d.opacity,
                      transform: [{ rotate: d.rotate }],
                    },
                  ]}
                />
              ))}
            </View>

            {/* ── Top sparkle icon ── */}
            <View style={styles.sparkleWrap}>
              <Text style={styles.sparkle}>✦</Text>
            </View>

            {/* ── App Logo ── */}
            <View style={styles.logoWrap}>
              <View style={styles.logoBox}>
                <Text style={styles.logoText}>E</Text>
              </View>
            </View>

            {/* ── Heading ── */}
            <Text style={styles.heading}>Login</Text>
            <Text style={styles.subheading}>Enter your ERPNext Credentials</Text>

            {/* ── Form ── */}
            <View style={styles.form}>

              {/* URL Field with protocol dropdown */}
              <View style={[styles.inputRow, urlFocus && styles.inputRowFocused]}>
                {/* Protocol Button */}
                <TouchableOpacity
                  ref={protocolRef}
                  style={styles.protocolBtn}
                  onPress={openProtocol}
                  activeOpacity={0.7}
                >
                  <Text style={styles.globeIcon}>🌐</Text>
                  <Text style={styles.protocolText}>{protocol}</Text>
                  <Text style={styles.caretIcon}>▾</Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.inputDivider} />

                {/* URL TextInput */}
                <TextInput
                  style={styles.input}
                  placeholder="ERPNext URL"
                  placeholderTextColor="#A0AEC0"
                  value={url}
                  onChangeText={setUrl}
                  autoCapitalize="none"
                  keyboardType="url"
                  onFocus={() => setUrlFocus(true)}
                  onBlur={() => setUrlFocus(false)}
                />
              </View>

              {/* Username Field */}
              <View style={[styles.inputRow, userFocus && styles.inputRowFocused]}>
                <Text style={styles.fieldIcon}>👤</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#A0AEC0"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
              </View>

              {/* Password Field */}
              <View style={[styles.inputRow, passFocus && styles.inputRowFocused]}>
                <Text style={styles.fieldIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#A0AEC0"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPass}
                  onFocus={() => setPassFocus(true)}
                  onBlur={() => setPassFocus(false)}
                />
                <TouchableOpacity
                  onPress={() => setShowPass(!showPass)}
                  style={styles.eyeBtn}
                  activeOpacity={0.7}
                >
                  <Text style={styles.eyeIcon}>{showPass ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>

              {/* Remember Me */}
              <View style={styles.rememberRow}>
                <Text style={styles.rememberText}>Remember me</Text>
                <Switch
                  value={remember}
                  onValueChange={setRemember}
                  trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                  thumbColor={'#ffffff'}
                  ios_backgroundColor="#D1D5DB"
                />
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginBtn}
                activeOpacity={0.85}
                onPress={() => onLogin()}
              >
                <Text style={styles.loginBtnText}>Login</Text>
              </TouchableOpacity>

              {/* Trouble link */}
              <View style={styles.troubleRow}>
                <Text style={styles.troubleText}>Having some trouble? </Text>
                <Text style={styles.troubleIcon}>🔵</Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.reportText}> Report Issue</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* ── Footer ── */}
            <View style={styles.footer}>
              <Text style={styles.footerPowered}>
                Powered by{' '}
                <Text style={styles.footerBrand}>⟨/⟩ CODES SOFT</Text>
              </Text>
              <View style={styles.footerDivider} />
              <Text style={styles.footerCopy}>
                © 2017-2026 Codes Soft. All Rights Reserved
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* ── Protocol Dropdown Modal ── */}
      <Modal
        transparent
        visible={showProtocol}
        animationType="fade"
        onRequestClose={() => setShowProtocol(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowProtocol(false)}>
          <Pressable
            style={[
              styles.protocolDropdown,
              {
                top: protocolPos.y + protocolPos.h + 6,
                left: protocolPos.x,
              },
            ]}
            onPress={() => {}}
          >
            {['http', 'https'].map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.protocolOption,
                  protocol === opt && styles.protocolOptionActive,
                ]}
                onPress={() => {
                  setProtocol(opt);
                  setShowProtocol(false);
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.protocolOptionText,
                    protocol === opt && styles.protocolOptionTextActive,
                  ]}
                >
                  {opt}
                </Text>
                {protocol === opt && (
                  <Text style={styles.checkMark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#C8DFF5',
    paddingTop:50
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: '#C8DFF5',
    alignItems: 'center',
    paddingBottom: 32,
  },

  // Background diamonds
  bgPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    overflow: 'hidden',
  },
  diamond: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 14,
    backgroundColor: 'transparent',
  },

  // Sparkle
  sparkleWrap: {
    marginTop: 24,
    alignSelf: 'flex-start',
    marginLeft: 28,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  sparkle: {
    fontSize: 18,
    color: '#3B82F6',
  },

  // Logo
  logoWrap: {
    marginTop: 40,
    marginBottom: 16,
  },
  logoBox: {
    width: 88,
    height: 88,
    borderRadius: 22,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  logoText: {
    fontSize: 44,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },

  // Heading
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F1C3F',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  subheading: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 30,
  },

  // Form
  form: {
    width: width - 40,
    gap: 14,
  },

  // Input Row
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 16,
    height: 54,
    borderWidth: 1.5,
    borderColor: '#E2E8F4',
    shadowColor: '#A0AEC0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  inputRowFocused: {
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.15,
  },

  fieldIcon: {
    fontSize: 17,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1E2D45',
    paddingVertical: 0,
  },
  eyeBtn: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 18,
  },

  // Protocol section inside URL row
  protocolBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 8,
  },
  globeIcon: {
    fontSize: 16,
  },
  protocolText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E2D45',
  },
  caretIcon: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  inputDivider: {
    width: 1,
    height: 22,
    backgroundColor: '#D1D8E8',
    marginRight: 12,
  },

  // Remember Me
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginTop: 2,
  },
  rememberText: {
    fontSize: 15,
    color: '#1E2D45',
    fontWeight: '400',
  },

  // Login Button
  loginBtn: {
    height: 56,
    borderRadius: 50,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  loginBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },

  // Trouble
  troubleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  troubleText: {
    fontSize: 14,
    color: '#4A5568',
  },
  troubleIcon: {
    fontSize: 14,
  },
  reportText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },

  // Footer
  footer: {
    marginTop: 60,
    alignItems: 'center',
    width: width - 40,
  },
  footerPowered: {
    fontSize: 13,
    color: '#4A5568',
  },
  footerBrand: {
    fontWeight: '700',
    color: '#2563EB',
  },
  footerDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#B8CDE4',
    marginVertical: 8,
  },
  footerCopy: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Protocol Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  protocolDropdown: {
    position: 'absolute',
    width: 130,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#1A3A7C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
    borderWidth: 1,
    borderColor: '#E2E8F4',
  },
  protocolOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5FB',
  },
  protocolOptionActive: {
    backgroundColor: '#EFF6FF',
  },
  protocolOptionText: {
    fontSize: 15,
    color: '#1E2D45',
    fontWeight: '500',
  },
  protocolOptionTextActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
  checkMark: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '700',
  },
});