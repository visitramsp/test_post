import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Text,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Splash() {
  const logoScale    = useRef(new Animated.Value(0.7)).current;
  const logoOpacity  = useRef(new Animated.Value(0)).current;
  const logoY        = useRef(new Animated.Value(20)).current;
  const textOpacity  = useRef(new Animated.Value(0)).current;
  const textY        = useRef(new Animated.Value(10)).current;
  const tagOpacity   = useRef(new Animated.Value(0)).current;
  const barWidth     = useRef(new Animated.Value(0)).current;
  const footerOp     = useRef(new Animated.Value(0)).current;
  const orb1Y        = useRef(new Animated.Value(0)).current;
  const glowScale    = useRef(new Animated.Value(1)).current;

  const BAR_MAX = 56;

  useEffect(() => {
    // Orb float loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(orb1Y, { toValue: 12, duration: 3000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(orb1Y, { toValue: 0,  duration: 3000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();

    // Entry sequence
    Animated.sequence([
      // Logo spring in
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(logoY, { toValue: 0, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.delay(100),
      // Brand name
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(textY, { toValue: 0, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      // Tagline
      Animated.timing(tagOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.delay(100),
      // Loading bar (non-native driver for width)
      Animated.timing(barWidth, {
        toValue: BAR_MAX,
        duration: 2200,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: false,
      }),
    ]).start();

    // Footer fade after 1.2s
    Animated.timing(footerOp, {
      toValue: 1, duration: 500,
      delay: 1200, useNativeDriver: true,
    }).start();

    // Glow pulse loop (starts after entry)
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowScale, { toValue: 1.06, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(glowScale, { toValue: 1.00, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ).start();
    }, 800);
  }, []);

  return (
    <View style={styles.container}>
      {/* Soft background orbs */}
      <Animated.View style={[styles.orb1, { transform: [{ translateY: orb1Y }] }]} />
      <Animated.View style={[styles.orb2, { transform: [{ translateY: orb1Y }] }]} />

      {/* Center block */}
      <View style={styles.centerBlock}>
        {/* Logo icon */}
        <Animated.View
          style={[
            styles.iconRing,
            {
              opacity: logoOpacity,
              transform: [
                { scale: Animated.multiply(logoScale, glowScale) },
                { translateY: logoY },
              ],
            },
          ]}
        >
          <View style={styles.erpIcon}>
            <View style={styles.barTop} />
            <View style={styles.barMid} />
            <View style={styles.barBot} />
          </View>
        </Animated.View>

        {/* Brand name */}
        <Animated.View
          style={{ opacity: textOpacity, transform: [{ translateY: textY }], alignItems: 'center', gap: 4 }}
        >
          <Text style={styles.brandName}>
            ERP<Text style={styles.brandNameLight}>Next</Text>
          </Text>
          <Animated.Text style={[styles.tagline, { opacity: tagOpacity }]}>
            BUSINESS MANAGEMENT SUITE
          </Animated.Text>
        </Animated.View>

        {/* Thin loader bar */}
        <View style={styles.loaderTrack}>
          <Animated.View style={[styles.loaderFill, { width: barWidth }]} />
        </View>
      </View>

      {/* Footer */}
      <Animated.View style={[styles.footer, { opacity: footerOp }]}>
        <Text style={styles.poweredBy}>Powered by</Text>
        <View style={styles.csBadge}>
          {/* Hexagon icon drawn inline */}
          <View style={styles.hexWrap}>
            <Text style={styles.hexLetter}>C</Text>
          </View>
          <Text style={styles.csName}>
            CODES <Text style={styles.csNameBlue}>SOFT</Text>
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const BLUE = '#2979FF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orb1: {
    position: 'absolute',
    width: width * 0.65,
    height: width * 0.65,
    borderRadius: (width * 0.65) / 2,
    backgroundColor: 'rgba(41,121,255,0.055)',
    top: -width * 0.18,
    left: -width * 0.18,
  },
  orb2: {
    position: 'absolute',
    width: width * 0.45,
    height: width * 0.45,
    borderRadius: (width * 0.45) / 2,
    backgroundColor: 'rgba(41,121,255,0.04)',
    bottom: width * 0.12,
    right: -width * 0.12,
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  iconRing: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.32,
    shadowRadius: 24,
    elevation: 12,
  },
  erpIcon: {
    gap: 5,
    alignItems: 'flex-start',
  },
  barTop: {
    width: 38, height: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 3.5,
  },
  barMid: {
    width: 28, height: 7,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 3.5,
    marginLeft: 2,
  },
  barBot: {
    width: 20, height: 7,
    backgroundColor: 'rgba(255,255,255,0.32)',
    borderRadius: 3.5,
    marginLeft: 10,
  },
  brandName: {
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: -0.5,
  },
  brandNameLight: {
    fontWeight: '300',
    color: '#555555',
  },
  tagline: {
    fontSize: 9.5,
    fontWeight: '400',
    color: '#BBBBBB',
    letterSpacing: 2.2,
  },
  loaderTrack: {
    width: 56,
    height: 2,
    backgroundColor: '#EEEEEE',
    borderRadius: 1,
    overflow: 'hidden',
    marginTop: 12,
  },
  loaderFill: {
    height: 2,
    backgroundColor: BLUE,
    borderRadius: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingBottom: 40,
  },
  poweredBy: {
    fontSize: 11,
    color: '#BBBBBB',
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  csBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  hexWrap: {
    width: 18,
    height: 18,
    backgroundColor: 'rgba(41,121,255,0.12)',
    borderRadius: 4,
    borderWidth: 1.2,
    borderColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hexLetter: {
    fontSize: 9,
    fontWeight: '700',
    color: BLUE,
  },
  csName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#222222',
    letterSpacing: 0.8,
  },
  csNameBlue: {
    color: BLUE,
  },
});