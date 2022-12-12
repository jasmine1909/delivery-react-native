import { View, Text } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectBasket, selectBasketTotal } from "../features/basketSlice";

const BasketIcon = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasket);
  const basketTotal = useSelector(selectBasketTotal);
  if (items.length === 0) return null;
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="bg-orange-600 p-4 rounded-lg flex-row items-center space-x-1s"
      >
        <Text className="text-white font-extrabold text-lf py-1 px-2 bg-orange-300">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lf text-center">
          {" "}
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold ">
          {" "}
          $ {basketTotal}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
