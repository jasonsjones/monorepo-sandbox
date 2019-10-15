import request from 'supertest';
import app from '../app';

it('get / route returns json payload', (): Promise<void> => {
    return request(app)
        .get('/')
        .then((res): void => {
            const json = res.body;
            expect(json).toHaveProperty('success');
            expect(json).toHaveProperty('message');
            expect(json).toHaveProperty('url');
        });
});

it('get /api route returns json payload', (): Promise<void> => {
    return request(app)
        .get('/api')
        .then((res): void => {
            const json = res.body;
            expect(json).toHaveProperty('success');
            expect(json).toHaveProperty('message');
            expect(json).not.toHaveProperty('url');
        });
});
