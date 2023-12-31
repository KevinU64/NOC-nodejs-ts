import mongoose from "mongoose";

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect( options: ConnectionOptions) {
        const { mongoUrl, dbName } = options;

        try {
            // console.log(mongoUrl, dbName)
            await mongoose.connect( mongoUrl, {
                dbName,
            })

            // console.log('Mongo connected!')
            return true;

        } catch (error) {
            // console.log('Mongo connection error');
            // console.log(error)
            throw error;
        }
    }

}