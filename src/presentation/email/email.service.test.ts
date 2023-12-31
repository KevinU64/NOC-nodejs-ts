import nodemailer from 'nodemailer';
import { EmailService, SendEmailOptions } from './email.service';

describe('EmailService', () => {

    const mockSendMail = jest.fn();
    
    //MOCK al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    const emailService = new EmailService();

    test('Should send email',async() => {
       
        const options: SendEmailOptions = {
            to: 'test@test.com',
            subject: 'Test',
            htmlBody: '<h1>Test</h1>'
        };

        await emailService.sendEmail( options );

        expect( mockSendMail ).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: "<h1>Test</h1>",
            subject: "Test",
            to: "test@test.com",
        });

    });
    
    test('should send email with attachments', async() => {

        const email = "test@test.com"; 
        await emailService.sendEmailWithFileSystemLogs(email);

        expect( mockSendMail ).toHaveBeenCalledWith({
            to: email,
            subject: "Logs del servidor",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            ])
        });

    })


});