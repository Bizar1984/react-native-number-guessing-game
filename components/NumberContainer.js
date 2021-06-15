import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";

const { primary, secondary, tertiary, fourth, fifth } = Colors;

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primary,
    borderColor: "black",
    borderWidth: 1,
  },
  number: {
    color: "white",
    fontSize: 20,
  },
});

export default NumberContainer;
