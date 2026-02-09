const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/men-fashion-ecommerce";

// Helper to make HTTP requests
function makeRequest(path, method = "GET", body = null) {
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
          console.log("Raw response:", data);
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

const UserSchema = new mongoose.Schema({
  email: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
const User = mongoose.model("User", UserSchema);

(async () => {
  try {
    // 1. Request Password Reset
    console.log(
      "\n1. Requesting Password Reset for abdullah.asim710@gmail.com.",
    );
    const forgotRes = await makeRequest("/api/auth/forgotpassword", "POST", {
      email: "abdullah.asim710@gmail.com",
    });

    if (forgotRes.status === 200) {
      console.log("SUCCESS: Forgot Password request sent.");
      console.log("Response:", forgotRes.data);
      console.log(
        '\nCHECK SERVER LOGS: The reset link should be printed in the server terminal where "npm start" is running.',
      );
    } else {
      console.error("FAILED: Forgot Password request failed.");
      console.error(forgotRes);
      process.exit(1);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
