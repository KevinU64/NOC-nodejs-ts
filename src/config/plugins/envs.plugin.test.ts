import { envs } from "./envs.plugin";


describe('envs.plugin.ts', ()=> {

    test('should return env options', () => {
        
        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'test@test.com',
            MAILER_SECRET_KEY: '123456789',
            PROD: true,
            MONGO_URL: 'mongodb://kevin:1234567@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'kevin',
            MONGO_PASS: '1234567'
        });

    });
    // Solo para PORT
    test('should return error if not found PORT', async() => {
        
        jest.resetModules();
        process.env.PORT ='ABC';

        try {
            await import('./envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }

    });
    // Agregar los envs restantes



});