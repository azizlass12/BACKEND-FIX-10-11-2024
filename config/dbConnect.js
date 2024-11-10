const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const connectDB = async () => {
try {
   await mongoose.connect("mongodb://localhost:27017/School");
   console.log("database connected");

} catch (error) {
    console.log("data base not connected");

    
}

}

module.exports = connectDB;