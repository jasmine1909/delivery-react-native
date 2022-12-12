import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

//sanity -> sanity.json
const client = sanityClient({
  projectId: "p9tqh036",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

//sanity cors add https://localhost:3000 . got to api=> cors origins and add https://localhost:3000
export default client;
