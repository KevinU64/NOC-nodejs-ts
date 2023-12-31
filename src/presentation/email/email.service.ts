import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

export interface Attachment {
    filename: string,
    path: string,
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor(
    ) {}


    async sendEmail( options: SendEmailOptions ):Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });

            // console.log(sentInformation)
            return true;
        } catch (error) {
            return false;
        }

    }


    async sendEmailWithFileSystemLogs( to: string | string[] ) {

        const subject = 'Logs del servidor';
        const htmlBody = `
        <h3>Logs de sistema - NOC</h3>
        <p>--------------------------------------------</p>
        <p>--------------------------------------------</p>
        <p>Ver logs adjuntos</p>
        `;

        const attachments:Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.sendEmail({
            to, subject, attachments, htmlBody
        });

    }

}