import React, { useEffect, useLayoutEffect } from "react";
import { Text, Touchable, View, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native";
import { urlFor } from "../sanity";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import dish from "../food-delivery/schemas/dish";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  //   const navigation = useNavigation();
  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerShown: false,
  //     });
  //   });
  const dispatch = useDispatch();

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const {
    params: {
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
    },
  } = useRoute();
  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  });
  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View>
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100"
          >
            <AntDesign name="left" size={24} color="orange" />
          </TouchableOpacity>
        </View>
        <View className="bg-white pt-4  p-4">
          <Text className="text-3xl font-bold">{title}</Text>
          <View className="flex-row space-x-2 my-2">
            <View className="flex-row items-center space-x-1">
              <Text className="text-xs text-gray-500">
                <AntDesign name="star" size={18} color="black" />
                <Text className="text-yellow-900"> {rating}</Text> • {genre}
              </Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <MaterialIcons name="location-pin" size={20} color="black" />
              <Text className="text-xs text-gray-500">Nearby {address}</Text>
            </View>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 border-y border-gray-300">
            <AntDesign name="questioncircle" size={24} color="black" />
            <Text className="pl-2 flex-1 text-md font-bold">
              {" "}
              Have a food allergy?
            </Text>
            <Feather name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="pb-36">
          <Text className="px-4 pt-6 font-bold text-xl">Menu</Text>

          {/* DishRow */}
          {dishes?.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              des={dish.short_des}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
