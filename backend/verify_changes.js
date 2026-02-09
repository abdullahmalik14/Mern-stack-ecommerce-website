const http = require("http");

const PORT = process.env.PORT || 5000;

// Helper to make HTTP requests
function makeRequest(path, method = "GET", body = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: PORT,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

(async () => {
  try {
    console.log("1. Fetching products to get a valid product ID...");
    const productsRes = await makeRequest("/api/products");

    if (
      productsRes.status !== 200 ||
      !productsRes.data ||
      productsRes.data.length === 0
    ) {
      console.error("Failed to fetch products or no products found.");
      console.error(productsRes);
      process.exit(1);
    }

    const product = productsRes.data[0]; // Assuming array of products
    // Check if products is inside an object (e.g. { products: [...] }) or is an array
    const productItem = Array.isArray(productsRes.data)
      ? productsRes.data[0]
      : productsRes.data.products
        ? productsRes.data.products[0]
        : null;

    if (!productItem) {
      console.error("Could not extract product item from response");
      console.log(productsRes.data);
      process.exit(1);
    }

    console.log(`Found product: ${productItem.name} (ID: ${productItem._id})`);

    // 2. Create Guest Order
    console.log("\n2. Attempting GUEST checkout (no token)...");

    const guestOrderData = {
      orderItems: [
        {
          product: productItem._id,
          name: productItem.name,
          image: productItem.image,
          price: productItem.price,
          qty: 1,
          size: "M",
          color: "White",
        },
      ],
      shippingAddress: {
        address: "123 Guest St",
        city: "Guest City",
        postalCode: "12345",
        country: "Guestland",
      },
      paymentMethod: "Cash on Delivery",
      itemsPrice: productItem.price,
      taxPrice: 0,
      shippingPrice: 10,
      totalPrice: productItem.price + 10,
      customerEmail: "guest@example.com",
    };

    const guestOrderRes = await makeRequest(
      "/api/orders",
      "POST",
      guestOrderData,
    );

    if (guestOrderRes.status === 201) {
      console.log("SUCCESS: Guest order created!");
      console.log("Order ID:", guestOrderRes.data._id);
      console.log("User field:", guestOrderRes.data.user);
      if (guestOrderRes.data.user === null) {
        console.log("Verified: User field is null as expected for guest.");
      } else {
        console.warn(
          "WARNING: User field is NOT null:",
          guestOrderRes.data.user,
        );
      }
    } else {
      console.error("FAILED: Guest order creation failed.");
      console.error("Status:", guestOrderRes.status);
      console.error("Response:", guestOrderRes.data);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
