import mongoose from "mongoose";

export async function connect() {

    try {
        //since we are using typescript there is no guarantee that this uri will always resolve 
        mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection  //connection string given by mongoose

        connection.on('connected', () => {
            console.log('MongoDb connected successfully');
        })

        connection.on('error', (err) => {
            console.log("Connection error encountered with mongodb " + err);
            process.exit();
        })

    }
    catch (error) {
        console.log("Connection failed with database")
        console.log(error)
    }

}