import { expect } from 'chai';

import IndexController from './IndexController';

describe('Index controller', () => {
    it('getRootAPIRoute() returns a Promise', () => {
        const promise = IndexController.getRootAPIRoute();
        expect(promise).to.be.a('Promise');
    });

    it('getRootAPIRoute() resolves to a IJSONResponse', async () => {
        const result = await IndexController.getRootAPIRoute();
        expect(result).to.have.property('success');
        expect(result).to.have.property('message');
        expect(result).to.have.property('payload');
        expect(result.success).to.equal(true);
    });
});
