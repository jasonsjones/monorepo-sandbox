import request from 'supertest';
import app from '../config/app';

describe('Index E2E tests', () => {
    it('gets the root API route (GET /api)', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('success');
                expect(res.body).toHaveProperty('message');
                expect(res.body.success).toBeTruthy();
            });
    });

    it('gets the API version (graphql query)', () => {
        const query = `query { version }`;
        return request(app)
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .send({ query })
            .then(res => {
                const { data } = res.body;
                expect(typeof data.version).toBe('string');
                expect(/\d.\d.\d/.test(data.version)).toBeTruthy();
            });
    });
});
