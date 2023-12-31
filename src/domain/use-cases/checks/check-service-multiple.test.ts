import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";



describe('CheckService UseCase', () => {

    // MOCKS
    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const mockRepository3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkServiceMultiple = new CheckServiceMultiple(
        [mockRepository1, mockRepository2, mockRepository3],
        successCallback,
        errorCallback,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should call successCallback when fetch returns true', async () => {

        const wasOk = await checkServiceMultiple.execute( 'https://www.google.com' );

        expect( wasOk ).toBe( true );
        expect( successCallback ).toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();
        
        expect( mockRepository1.saveLog ).toBeCalledWith(expect.any( LogEntity ));
        expect( mockRepository2.saveLog ).toBeCalledWith(expect.any( LogEntity ));
        expect( mockRepository3.saveLog ).toBeCalledWith(expect.any( LogEntity ));

    });

    test('Should call errorCallback when fetch returns false', async () => {

        const wasOk = await checkServiceMultiple.execute( 'https://www.test.test' );

        expect( wasOk ).toBe( false );
        expect( errorCallback ).toHaveBeenCalled();
        expect( successCallback ).not.toHaveBeenCalled();
        
        expect( mockRepository1.saveLog ).toBeCalledWith(expect.any( LogEntity ));
        expect( mockRepository2.saveLog ).toBeCalledWith(expect.any( LogEntity ));
        expect( mockRepository3.saveLog ).toBeCalledWith(expect.any( LogEntity ));

    });



})