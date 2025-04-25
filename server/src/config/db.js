const mongoose = require("mongoose");
const MONGO_URI="mongodb+srv://omkar:pokemonxsz@omkarcluster.xo9ovw8.mongodb.net/?retryWrites=true&w=majority&appName=omkarcluster"
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
