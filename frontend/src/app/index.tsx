import { StyleSheet, Text, View } from "react-native";
import { colors, fontSize } from "@/theme/theme";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>VitaQera</Text>
      <Text style={styles.body}>Nutrition for a brighter you.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },

  heading: {
    fontFamily: "Fraunces-Bold",
    fontSize: 30,
  },

  body: {
    fontFamily: "Manrope-Bold",
    fontSize: fontSize["4xl"],
  },
});