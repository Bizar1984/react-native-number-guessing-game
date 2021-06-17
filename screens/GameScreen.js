import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import Fonts from "../constants/fonts";
import CustomButton from "../components/CustomButton";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randomNumber = Math.round((min + max) / 2);
  console.log("New number: " + randomNumber);

  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const renderListItem = (value, numberOfRounds) => (
  <View key={value} style={styles.listItem}>
    <Text>#{numberOfRounds}</Text>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const numberArray = [];
  function fillUpArray() {
    for (let i = 1; i < 1000000; i++) {
      let numbers = i;
      numberArray.push(numbers);
    }
    return numberArray;
  }

  fillUpArray();
  const currentLow = useRef(0);
  const currentHigh = useRef(numberArray.length);
  let mid = Math.floor((currentLow.current + currentHigh.current) / 2);
  console.log(mid);

  const initialGuess = numberArray[mid];
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  const [rounds, setRounds] = useState(0);

  const { userChoice, onGameOver } = props;
  console.log("Userchoice: " + userChoice);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
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
    } else {
      // currentLow begint bij 100
      // als de computer te laag raadt wordt de laatste gok steeds de nieuwe currentLow
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((currentPastGuess) => [nextNumber, ...currentPastGuess]);
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
      <View style={styles.list}>
        <ScrollView contentContainerStyle={styles.listContainer}>
          {/* // scrollview and flatlist use contentContainerStyle for styling layout */}
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>

      <Image
        source={require("../assets/bulb-two.png")}
        style={styles.image}
        resizeMode="contain"
      ></Image>
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
    marginBottom: 18,
  },
  image: {
    width: "60%",
    height: 100,
    marginVertical: 25,
  },
  listContainer: {
    flexGrow: 1,
  },

  list: {
    width: "50%",
    flex: 1,
  },
  listItem: {
    padding: 10,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default GameScreen;
