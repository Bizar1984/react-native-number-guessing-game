import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";

const { primary } = Colors;

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primary,
  },
  number: {
    color: "white",
    fontSize: 20,
  },
});

export default NumberContainer;
