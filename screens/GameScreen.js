import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Fonts from "../constants/fonts";
import CustomButton from "../components/CustomButton";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const GameScreen = (props) => {
  console.log("Userchoice: " + props.userChoice);

  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);
  // only if one of the three values change the useEffect runs....

  const nextGuessHandler = (direction) => {
    // als de currentGuess bv. 41 is en userChoice 50 moet je hoger zeggen
    // oftewel bij "higher" moet de currentGuess(41) < dan de userChoice(50)
    // als dit niet het geval is klopt de tip niet en wordt er valsgespeeld
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("No cheating allowed!", "You know that is not correct...", [
        { text: "Cancel", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      // currentHigh begint bij 100
      // als de computer te hoog raadt wordt de laatste gok steeds de nieuwe currentHigh
      currentHigh.current = currentGuess;
      console.log("Current high: " + currentHigh.current);
    } else {
      // currentLow begint bij 100
      // als de computer te laag raadt wordt de laatste gok steeds de nieuwe currentLow
      currentLow.current = currentGuess;
      console.log("Current low: " + currentLow.current);
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds((rounds) => rounds + 1);
    console.log("Rounds: " + rounds);
  };

  return (
    <View style={styles.screen}>
      <Text style={Fonts.bodyText}>Opponent's guess: </Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <CustomButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </CustomButton>
        <CustomButton onPress={nextGuessHandler.bind(this, "higher")}>
          <Ionicons name="md-add" size={24} color="white" />
        </CustomButton>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 350,
    maxWidth: "95%",
  },
});

export default GameScreen;
