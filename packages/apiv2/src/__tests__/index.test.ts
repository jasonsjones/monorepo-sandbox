import request from 'supertest';
import app from '../app';

it('get / route returns json', (): Promise<void> => {
    return request(app)
        .get('/')
        .then((res): void => {
            const json = res.body;
            expect(json).toHaveProperty('success');
            expect(json).toHaveProperty('message');
        });
});
