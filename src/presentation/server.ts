import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);

const emailService = new EmailService();

export class Server {

    public static start() {

        console.log('Server started...');

        //todo: Mandar Email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository,
        // ).execute('uruchicoarite@outlook.com')
        // emailService.sendEmail({
        //     to: 'uruchicoarite@outlook.com',
        //     subject: 'Logs del sistema',
        //     htmlBody: `
        //         <h3>Logs del sistema - NOC</h3>
        //         <p>Lorenajksjbasbdbasdkjansdnas</p>
        //         <p>Lorenajksjbasbdbasdkjansdnas</p>
        //     `
        // })

        // emailService.sendEmailWithFileSystemLogs(
        //     'uruchicoarite@outlook.com',
        // );

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com'
                // const date = new Date();
                // console.log('5 second', date);

                new CheckServiceMultiple(
                    [ fsLogRepository, mongoLogRepository, postgresLogRepository],
                    //inyeccion de dependencias
                    () => console.log( `${url} is ok`),
                    ( error ) => console.log( error),
                ).execute( url );
                // new CheckService().execute( 'http://localhost:3000' );

            }
        );

    }

}