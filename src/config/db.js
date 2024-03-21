const { mongoose } = require("mongoose");

const connectDB = async () => {
    const connecting = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongooDB connected to: ${connecting.connection.host}`.bgBlue);
}


module.exports = connectDB;

