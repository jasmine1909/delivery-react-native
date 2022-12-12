import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { MaterialIcons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  return (
    <View className="bg-orange-400 flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5 ">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <MaterialIcons name="cancel" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg"> Order Help</Text>
        </View>
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between my-3">
            <View>
              <Text className="text-lg text-gray-500"> Estimated Arrival</Text>

              <Text className="text-4xl font-bold"> 40-45 minutes </Text>
            </View>
            <Image
              source={require("../assets/img.png")}
              className="w-16 h-16"
            />
          </View>
          <Progress.Bar size={30} color="orange" indeterminate={true} />
          <Text className="mt-3 text-gray-600">
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          title={restaurant.title}
          description={restaurant.short_desc}
          identifier="origin"
          pinColor="orange"
        />
      </MapView>
    </View>
  );
};

export default DeliveryScreen;
