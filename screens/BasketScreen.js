import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Touchable,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectBasket, selectBasketTotal } from "../features/basketSlice";
import { removeFromBasket } from "../features/basketSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();

  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasket);
  const dispatch = useDispatch();
  const [groupItemBasket, setGroupItemBasket] = useState([]);
  useEffect(() => {
    const groupItem = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupItemBasket(groupItem);
  }, [items]);
  const basketTotal = useSelector(selectBasketTotal);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-2 border-b border-orange-200 bg-white  shadow-lg">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className=" absolute top-1 right-5"
          >
            <MaterialIcons name="cancel" size={28} color="orange" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1"> Deliver in 30-35 min</Text>
          <TouchableOpacity>
            <Text className="text-orange-600">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="devide-y divide-gray-200">
          {Object.entries(groupItemBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-orange-600 font-bold">
                {" "}
                {items.length} X{" "}
              </Text>

              {/* /// get detail one if user chose many  */}
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0].name}</Text>
              <Text className="text-gray-600">${items[0]?.price}</Text>
              <TouchableOpacity>
                <Text
                  className="text-orange-600"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove{" "}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Subtotal:</Text>
            <Text className="text-gray-500">$ {basketTotal}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Delivery Fee:</Text>
            <Text className="text-gray-500">$ 6.00</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Order Total:</Text>
            <Text className="text-gray-500">$ {basketTotal + 6}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Prepare")}
            className="rounded-lg bg-orange-600"
          >
            <Text className="text-center text-white font-bold py-3">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
