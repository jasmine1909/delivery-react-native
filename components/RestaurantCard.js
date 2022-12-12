import React from "react";
import { View, Text, Image } from "react-native";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_des,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_des,
          dishes,
          long,
          lat,
        });
      }}
      className="bg-white mr-3 shadow-sm "
    >
      {/* <Image source={{ uri: imgUrl }} className="w-56 h-36 rounded-sm" /> */}
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="w-56 h-36 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <Entypo name="star" size={20} color="gray" />
          <Text className="text-xs text-gray-500">
            <Text className="text-orange-800 font-bold"> {rating} </Text>•{" "}
            {genre}
          </Text>
        </View>
        <View className=" pt-2 flex-row items-center space-x-1">
          <EvilIcons name="location" size={20} color="gray" />
          <Text className=" text-xs text-gray-500"> Nearby {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
