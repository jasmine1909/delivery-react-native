import SanityClientConstructor from "@sanity/client";
import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "./../sanity";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "category"  ] {
      ...,
      restaurants[]->{
        ...,
        dishes[] ->,
       type->{
      name
    }
    
      }
    
    }`
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Category Card */}
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(300).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
