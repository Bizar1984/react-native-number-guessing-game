import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Colors from "../constants/colors";
import Fonts from "../constants/fonts";
import BodyText from "../components/BodyText";
import CustomButton from "../components/CustomButton";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={Fonts.bodyText}>The Game is Over!</Text>
      <Image
        source={require("../assets/game-over-two.jpg")}
        // source={{
        //   uri: "https://wallup.net/wp-content/uploads/2016/01/191231-universe-planet.jpg",
        // }}
        style={styles.image}
        resizeMode="cover"
      ></Image>

      <View style={styles.textContainer}>
        <BodyText style={styles.results}>
          Your opponent needed{" "}
          <Text style={styles.highlight}>{props.numberOfRounds}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlight}>{props.numberToGuess} </Text>
        </BodyText>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={props.newGame}>Play Again</CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    maxWidth: "80%",
    marginTop: 15,
  },
  textContainer: {
    marginVertical: 12,
  },
  image: {
    width: "80%",
    height: 300,
    marginVertical: 20,
    borderColor: Colors.secondary,
    borderWidth: 2,
  },
  highlight: {
    color: Colors.primary,
  },
  results: {
    fontSize: 20,
    width: 300,
    maxWidth: "80%",
    textAlign: "center",
  },
});

export default GameOverScreen;
