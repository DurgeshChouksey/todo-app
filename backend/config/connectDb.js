const mongoose = require("mongoose");

 async function connectDb() {
    try {
        const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Database connected " + connect.connection.host + " " + connect.connection.name);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDb;
