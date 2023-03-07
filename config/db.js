const mongoose = require('mongoose');

// Connection to MongoDB
const connectDB = async () => {
  mongoose.connect("mongodb+srv://YevhenDenysov:2FkTBuBi5HcJwOLN@cluster0.yhndxg9.mongodb.net/LiveDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  }).then(() => {
    console.log('MongoDB Connected...');
  }).catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
};

module.exports = connectDB;

