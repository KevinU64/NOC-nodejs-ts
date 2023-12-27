import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async() => {
    await main();
})();

async function main() {

    // * PRUEBA MONGODB
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    // Crear una coleccion= tablas, documento = registro
    // const newLog = await LogModel.create({
    //     message: 'Test message desde mongo',
    //     origin: 'App.ts',
    //     level: 'low',
    // });

    // await newLog.save();

    // console.log(newLog)

    // const logs = await LogModel.find();
    // console.log(logs);

    // ? PRUEBA POSTGRES

    const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'App.ts'
    //     }
    // });

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'LOW'
    //     }
    // });
    // console.log(logs)


    Server.start();
    // console.log( envs.PORT )
}