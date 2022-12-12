import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from ".././sanity";
const HomeScreen = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dish[] ->,
       type->{
      name
    }
    
     
      }
      
     
    }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);
  console.log(featuredCategories); // command d to debug

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <SafeAreaView className="bg-white">
      <View className="flex-row pb-3 items-center mx-4 space-x-3">
        <Image
          source={{
            uri: "https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account.png",
          }}
          className=" h-7 w-7 "
        />
        <View className="flex-1">
          <Text className="text-gray-600"> Deliver Noow!</Text>
          <Text className="text-extrabold text-lg">
            {" "}
            Current Location <AntDesign name="down" size={18} color="orange" />
          </Text>
        </View>
        <Feather name="user" size={26} color="orange" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 mx-4 pb-3">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 ">
          <FontAwesome5 name="search" size={20} color="gray" />
          <TextInput placeholder="Search..." keyboardType="default" />
        </View>
        <AntDesign name="filter" size={24} color="orange" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* category  */}
        <Categories />
        {/* featured */}

        {featuredCategories.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            des={category.short_des}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
