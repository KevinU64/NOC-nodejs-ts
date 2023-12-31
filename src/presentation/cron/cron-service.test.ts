import { CronService } from "./cron-service";



describe('CronService', () => {

    const mockTick = jest.fn();

    //jest.clearAllMocks

    test('Should create job', (done) => {
        const job = CronService.createJob('* * * * * *', mockTick);

        setTimeout(() => {
            expect( mockTick ).toBeCalledTimes(2);
            job.stop();
            done();
        }, 2000);
    })

})