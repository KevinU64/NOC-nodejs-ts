import mongoose from "mongoose";
import { MongoDatabase } from "./init";


describe('init MongoDB', () => {

    afterAll(() => {
        mongoose.connection.close();
    })

    test('Should connect to MongoDB', async() => {

        // console.log(process.env.MONGO_DB_NAME, process.env.MONGO_URL)
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!,
        });

        expect(connected).toBe(true);

    });


    test('Should throw an error', async() => {

        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: ''!,
            });
    
            expect(true).toBe(false);
        } catch (error) {
            
        }
        

    });

});