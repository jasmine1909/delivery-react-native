import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
const PrepareScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);
  return (
    <SafeAreaView className="bg-orange-300 flex-1 justify-center items-center">
      <Image source={require("../assets/deli.png")} className="w-36 h-36" />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={2}
        className="text-lg text-white font-bold text-center py-6"
      >
        Waiting for restaurant to accept your order
      </Animatable.Text>

      <Progress.Circle size={30} indeterminate={true} />
    </SafeAreaView>
  );
};

export default PrepareScreen;
