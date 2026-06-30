import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Donut({ pct = 65, size = 130 }) {
  const strokeWidth = 13;
  const radius      = (size - strokeWidth) / 2;
  const cx          = size / 2;
  const cy          = size / 2;
  const circumf     = 2 * Math.PI * radius;

  // Green arc (present %)
  const greenDash = (pct / 100) * circumf;
  // Red arc (absent %) — remaining portion
  const absentPct = 100 - pct;
  const redDash   = (absentPct / 100) * circumf;

  // Rotation: start arc from top (-90deg = -π/2)
  // SVG rotation offset to start at 12 o'clock
  const startAngle = -90;
  // Red arc starts right where green ends
  const redStartAngle = startAngle + (pct / 100) * 360;

  // Animated progress
  const animVal = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animVal, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, []);

  const animatedGreenDash = animVal.interpolate({
    inputRange:  [0, 1],
    outputRange: [0, greenDash],
  });
  const animatedRedDash = animVal.interpolate({
    inputRange:  [0, 1],
    outputRange: [0, redDash],
  });

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        {/* Track ring (background) */}
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="#e8fdf0"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Green arc — Present */}
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="#22c55e"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumf} ${circumf}`}
          strokeDashoffset={animatedGreenDash.interpolate({
            inputRange:  [0, greenDash],
            outputRange: [circumf, circumf - greenDash],
          })}
          transform={`rotate(${startAngle}, ${cx}, ${cy})`}
        />

        {/* Red arc — Absent (starts where green ends) */}
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="#ef4444"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumf} ${circumf}`}
          strokeDashoffset={animatedRedDash.interpolate({
            inputRange:  [0, redDash],
            outputRange: [circumf, circumf - redDash],
          })}
          transform={`rotate(${redStartAngle}, ${cx}, ${cy})`}
        />
      </Svg>

      {/* Center Label */}
      <Text
        style={{
          fontSize: size * 0.2,
          fontWeight: "800",
          color: "#16a34a",
          letterSpacing: -0.5,
        }}
      >
        {pct}%
      </Text>
    </View>
  );
}