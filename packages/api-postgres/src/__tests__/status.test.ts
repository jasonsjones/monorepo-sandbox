import request from 'supertest';
import app from '../app';

const makeGraphQLCall = (query: string, variables = {}): request.Test => {
    return request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send({ query, variables });
};

describe('query to verify server status', () => {
    it('it works', () => {
        const query = `query { status }`;
        return makeGraphQLCall(query).then(res => {
            expect(res.body.data).toHaveProperty('status');
            expect(res.body.data.status).toEqual('It works!');
        });
    });
});
