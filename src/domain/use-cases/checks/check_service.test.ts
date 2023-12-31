import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";



describe('CheckService UseCase', () => {

    // MOCKS
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should call successCallback when fetch returns true', async () => {

        const wasOk = await checkService.execute( 'https://www.google.com' );

        expect( wasOk ).toBe( true );
        expect( successCallback ).toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();
        
        expect( mockRepository.saveLog ).toBeCalledWith(
            expect.any( LogEntity )
        );

    });

    test('Should call errorCallback when fetch returns false', async () => {

        const wasOk = await checkService.execute( 'https://www.test.test' );

        expect( wasOk ).toBe( false );
        expect( errorCallback ).toHaveBeenCalled();
        expect( successCallback ).not.toHaveBeenCalled();
        
        expect( mockRepository.saveLog ).toBeCalledWith(
            expect.any( LogEntity )
        );

    });



})