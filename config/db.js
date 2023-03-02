const mongoose = require('mongoose');

// Connection to MongoDB
const connectDB = async () => {
  mongoose.connect("mongodb+srv://yevhendenysov:rmeosmsdjajsl@cluster0.ph5wkcx.mongodb.net/LiveDB?retryWrites=true&w=majority", {
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