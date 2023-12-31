import path from "path";
import fs from "fs"
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



describe('FileSystemDatasource', () => {

    const logPath = path.join(__dirname, '../../../logs');

    beforeEach(() => {
        fs.rmSync(logPath, { recursive:true, force: true });
    });

    test('Should create log files if they do not exists', () => {

        new FileSystemDatasource();
        const files = fs.readdirSync( logPath );
        expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"] )

    });

    test('should save a log in logs-all.log', () => {

        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${ logPath }/logs-all.log`, 'utf-8');
        expect(allLogs).toContain( JSON.stringify(log) );

    });

    test('should save a log in logs-all.log and logs-medium.log', () => {

        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${ logPath }/logs-all.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${ logPath }/logs-medium.log`, 'utf-8');
        expect(allLogs).toContain( JSON.stringify(log) );
        expect(mediumLogs).toContain( JSON.stringify(log) );

    });

    test('should save a log in logs-all.log and logs-high.log', () => {

        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${ logPath }/logs-all.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${ logPath }/logs-high.log`, 'utf-8');
        expect(allLogs).toContain( JSON.stringify(log) );
        expect(highLogs).toContain( JSON.stringify(log) );

    });

    test('should return all logs', async() => {

        const logDatasource = new FileSystemDatasource();
        const logLow = new LogEntity({
            message: 'log_low',
            level: LogSeverityLevel.low,
            origin: 'low'
        });
        const logMedium = new LogEntity({
            message: 'log_medium',
            level: LogSeverityLevel.medium,
            origin: 'medium'
        });
        const logHigh = new LogEntity({
            message: 'log_high',
            level: LogSeverityLevel.high,
            origin: 'high'
        });

        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(logMedium);
        await logDatasource.saveLog(logHigh);

        const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

        expect( logsLow ).toEqual( expect.arrayContaining([ logLow, logMedium, logHigh ]));
        expect( logsMedium ).toEqual( expect.arrayContaining([ logMedium ]));
        expect( logsHigh ).toEqual( expect.arrayContaining([ logHigh ]));

    });

    test('Should not throw an error if path exists', () => {

        new FileSystemDatasource();
        new FileSystemDatasource();

        expect(true).toBeTruthy();

    });

    test('Should throw an error if severity level is not defined', async() => {

        const logDatasource = new FileSystemDatasource();
        const customSeverityLevel = 'TEST_LEVEL' as LogSeverityLevel;

        try {
            await logDatasource.getLogs(customSeverityLevel);
            expect(true).toBeFalsy();
        } catch (error) {
            const errorString = `${ error }`;

            expect(errorString).toContain(`${ customSeverityLevel } not implemented`);
        }

    });

})