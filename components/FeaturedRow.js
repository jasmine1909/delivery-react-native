import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import RestaurantCard from "./RestaurantCard";
import sanityClient from ".././sanity";
const FeaturedRow = ({ id, title, des }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured" && _id == $id ] {
      ...,
      restaurants[]->{
        ...,
        dishes[] ->,
       type->{
      name
    }

      }

    }[0]`,
        { id }
      )
      .then((data) => {
        [setRestaurants(data?.restaurants)];
      });
  }, []);

  // useEffect(() => {
  //   sanityClient
  //     .fetch(
  //       `*[_type == "featured" && _id == $id ] {
  //     ...,
  //     restaurants[]->{
  //       ...,
  //       dish[] ->,
  //      type->{
  //     name
  //   }
  //     }
  //   }`,
  //       { id }
  //     )
  //     .then((data) => {
  //       setRestaurant(data.restaurants);
  //     });
  // }, []);
  // console.log(restaurant);
  return (
    <View>
      <View className=" mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <AntDesign name="arrowright" size={24} color="black" />
      </View>
      <Text className="text-xs text-gray-600 px-4"> {des}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* restaurant card */}
        {restaurants?.map((res) => (
          <RestaurantCard
            key={res._id}
            id={res._id}
            imgUrl={res.image}
            title={res.name}
            rating={res.rating}
            genre={res.type?.name}
            address={res.address}
            short_des={res.short_des}
            dishes={res.dishes}
            long={res.long}
            lat={res.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
