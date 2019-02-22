import { expect } from 'chai';

import IndexController from './IndexController';

describe('Index controller', () => {
    describe('getAPIRoot()', () => {
        it('returns a Promise', () => {
            const promise = IndexController.getAPIRoot();
            expect(promise).to.be.a('Promise');
        });

        it('resolves to null', async () => {
            const result = await IndexController.getAPIRoot();
            // tslint:disable-next-line
            expect(result).to.be.null;
        });
    });

    describe('getAPIVersion()', () => {
        it('returns a Promise', () => {
            const promise = IndexController.getAPIVersion();
            expect(promise).to.be.a('Promise');
        });

        it('resolves to a string', async () => {
            const result = await IndexController.getAPIVersion();
            // tslint:disable-next-line
            expect(/\d.\d.\d/.test(result)).to.be.true;
        });
    });
});
