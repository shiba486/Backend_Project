const mongoose = require("mongoose");

//DATABASE CONNECTION SETUP

  // method-1
// mongoose
//   .connect("mongodb://localhost:27017/userRegistration", {
//     // useNewUrlParser:true,
//     // useUnifiedTopology:true,
//     // useCreateIndex: true
//   })
//   .then(() => {
//     console.log(`connection successfull`);
//   })
//   .catch((err) => {
//     console.log("db connection error", err);
//   });


  // method-2 
  const connectDB = async function(){
      try {
        const Database_Intstance = await mongoose.connect(`mongodb://localhost:27017/userRegistration`);
        console.log(`\n MONGODB CONNECTION SUCCESSFULL DB ${Database_Intstance.connection.host}`)
      } catch (error) {
        console.log(`DATABASE CONNECTION FAILED`,error)
        process.exit(1);
      }  
  }

  module.exports = connectDB;
