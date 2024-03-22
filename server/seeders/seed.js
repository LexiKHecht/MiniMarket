const db = require("../config/connection");
const { User /* Thought */, Product } = require("../models");
const userSeeds = require("./userSeeds.json");
// const thoughtSeeds = require("./thoughtSeeds.json");
const cleanDB = require("../config/cleanDB");

db.once("open", async () => {
  // we need
  await cleanDB("User", "users");
  try {
    await User.create(userSeeds);
    console.log("Collection cleaned successfully.");
  } catch (err) {
    console.error("Error cleaning collection:", err);
  }

  await cleanDB("Product", "products");
  try {
    const request = await fetch(
      "https://mock.shop/api?query={products(first:%2020){edges%20{node%20{id%20title%20description%20tags%20featuredImage%20{id%20url}%20variants(first:%203){edges%20{node%20{price%20{amount%20currencyCode}}}}}}}}"
    );

    if (!request.ok) {
      throw new Error("something went wrong!");
    }

    const { data } = await request.json();
    const products = data.products.edges.map((edge) => {
      const product = edge.node;
      product.price = product.variants.edges[0].node.price;
      return product;
    });

    const loadedProductData = products.map((loadedProduct) => ({
      productId: loadedProduct.id,
      name: loadedProduct.title,
      description: loadedProduct.description, // You may need to adjust this depending on the actual response structure
      imageURL: loadedProduct.featuredImage.url || "",
      tags: loadedProduct.tags,
      price: loadedProduct.price,
    }));

    console.log(loadedProductData);

    await Product.insertMany(loadedProductData);
  } catch (err) {
    console.error(err);
  }
  console.log("all done!");
  process.exit(0);
});
