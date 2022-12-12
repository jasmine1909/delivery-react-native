import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { urlFor } from "../sanity";
import { AntDesign } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  selectBasket,
  selectBasketWithId,
  removeFromBasket,
} from "../features/basketSlice";

const DishRow = ({ id, des, price, image, name }) => {
  const [press, setPress] = useState(false);
  const items = useSelector((state) => selectBasketWithId(state, id));
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, des, price, image, name }));
  };
  const removeItemFromBasket = () => {
    if (!items.length) return;
    dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setPress(!press)}
        className={`bg-white border p-4 border-gray-200 ${
          press && "border-b-0"
        }`}
      >
        <View>
          <View className="flex-row space-x-5 ">
            <View>
              <Image
                source={{ uri: urlFor(image).url() }}
                className="h-20 w-20 bg-grya-300 p-4"
              />
            </View>

            <View>
              <Text className="text-lg mb-1">{name}</Text>
              <Text className="text-gray-400 mb-2">${price}</Text>
              {press && (
                <View className="bg-white  py-1">
                  <View className="flex-row items-center   space-x-2 pb-4">
                    <TouchableOpacity
                      disabled={!items.length}
                      onPress={removeItemFromBasket}
                    >
                      <AntDesign
                        name="minuscircle"
                        size={24}
                        color={items.length > 0 ? "orange" : "gray"}
                      />
                    </TouchableOpacity>
                    <Text> {items.length}</Text>
                    <TouchableOpacity onPress={addItemToBasket}>
                      <AntDesign name="pluscircle" size={20} color="orange" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default DishRow;
