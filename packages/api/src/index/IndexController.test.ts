import { expect } from 'chai';

import { index } from '../shared/response-messages';
import IndexController from './IndexController';

describe('Index controller', () => {
    describe('getAPIRoot()', () => {
        it('returns a Promise', () => {
            const promise = IndexController.getAPIRoot();
            expect(promise).to.be.a('Promise');
        });

        it('resolves to a IJSONResponse', async () => {
            const result = await IndexController.getAPIRoot();
            expect(result).to.have.property('success');
            expect(result).to.have.property('message');
            expect(result).to.have.property('payload');
            expect(result.success).to.equal(true);
            expect(result.message).to.equal(index.ROOT);
        });
    });

    describe('getAPIVersion()', () => {
        it('returns a Promise', () => {
            const promise = IndexController.getAPIVersion();
            expect(promise).to.be.a('Promise');
        });

        it('resolves to a IJSONResponse with the version in the payload', async () => {
            const result = await IndexController.getAPIVersion();
            expect(result).to.have.property('success');
            expect(result).to.have.property('message');
            expect(result).to.have.property('payload');
            expect(result.message).to.equal(index.VERSION);
            // tslint:disable-next-line
            expect(/\d.\d.\d/.test(result.payload.version)).to.be.true;
        });
    });
});
