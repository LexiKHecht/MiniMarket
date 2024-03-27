const db = require("../config/connection");
const { User, Product } = require("../models");
const cleanDB = require("../config/cleanDB");

db.once("open", async () => {
  // Clean existing data from Product and User collections
  await cleanDB("Product", "products");
  await cleanDB("User", "users");

  console.log("Collections cleaned.");

  try {
    // Fetch product data from the mock shop API
    const response = await fetch(
      "https://mock.shop/api?query={products(first:%2020){edges%20{node%20{id%20title%20description%20tags%20featuredImage%20{id%20url}%20variants(first:%203){edges%20{node%20{price%20{amount%20currencyCode}}}}}}}}",
    );
    if (!response.ok) {
      throw new Error("Failed to fetch product data from the API.");
    }

    const { data } = await response.json();

    // Process the fetched product data
    const products = data.products.edges.map((edge) => {
      const product = edge.node;
      const priceAmountString = product.variants.edges[0].node.price.amount;
      return {
        productId: product.id,
        name: product.title,
        description: product.description,
        imageURL: product.featuredImage.url || "",
        tags: product.tags,
        price: parseFloat(priceAmountString),
      };
    });

    for (const product of products) {
      console.log(product);
    }

    // Insert the processed product data into the Product collection
    await Product.insertMany(products);
    console.log(
      "Products seeded successfully. Price:",
      products[0].price.amount,
    );
  } catch (error) {
    console.error("Error seeding products:", error);
  }

  process.exit(0); // Exit the process once seeding is complete
});
