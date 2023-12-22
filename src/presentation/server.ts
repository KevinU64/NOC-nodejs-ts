import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log,repository.impl";
import { EmailService } from "./email/email.service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
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

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com'
        //         // const date = new Date();
        //         // console.log('5 second', date);

        //         new CheckService(
        //             fileSystemLogRepository,
        //             //inyeccion de dependencias
        //             () => console.log( `${url} is ok`),
        //             ( error ) => console.log( error),
        //         ).execute( url );
        //         // new CheckService().execute( 'http://localhost:3000' );

        //     }
        // );

    }

}