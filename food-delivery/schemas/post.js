import category from "./category";

export default {
  name: "restaurant",
  title: "Restaurant",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Restaurant Name",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "short_des",
      type: "string",
      title: "Short description",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "image",
      type: "image",
      title: "Image Restaurant",
    },
    {
      name: "lat",
      type: "number",
      title: "Latitude of the restaurant",
    },
    {
      name: "long",
      type: "number",
      title: "Longtitude of the restaurant",
    },
    {
      name: "address",
      type: "string",
      title: "Restaurant Address",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",

      type: "number",
      title: "Rating",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error("please enter a value between 1 and 5"),
    },
    {
      name: "type",
      type: "reference",
      title: "Category",
      validation: (Rule) => Rule.required(),
      to: [{ type: "category" }],
    },
    {
      name: "dishes",
      type: "array",
      title: "Dishes",
      of: [{ type: "reference", to: [{ type: "dish" }] }],
    },
  ],
};
