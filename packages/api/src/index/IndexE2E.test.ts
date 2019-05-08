import { expect } from 'chai';
import request from 'supertest';
import app from '../config/app';

describe('Index E2E tests', () => {
    it('gets the root API route (GET /api)', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('success');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('payload');
                // tslint:disable-next-line
                expect(res.body.success).to.be.true;
            });
    });

    it('gets the API version (GET /api/version)', () => {
        return request(app)
            .get('/api/version')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('success');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('payload');
                // tslint:disable-next-line
                expect(res.body.success).to.be.true;
                expect(res.body.payload).to.have.property('version');
                // tslint:disable-next-line
                expect(/\d.\d.\d/.test(res.body.payload.version)).to.be.true;
            });
    });
});