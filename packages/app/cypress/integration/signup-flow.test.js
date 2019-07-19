describe('Signup Flow', () => {
    afterEach(() => {
        return cy
            .request('POST', 'http://localhost:3000/graphql', { query: `query { logout }` })
            .then(res => {
                console.log(res.body);
            });
    });
    /*
    afterEach(async () => {
        const connection = await getDbConnection();
        const list = await connection.db.listCollections({ name: 'users' }).toArray();
        if (list.length !== 0) {
            await UserRepository.getModel().collection.drop();
        }
    });
    */
    it('successfully signs up a new user', () => {
        cy.visit('http://localhost:4200/signup');
        cy.get('input[name="firstName"').type('Oliver');
        cy.get('input[name="lastName"').type('Queen');
        cy.get('input[name="email"').type('oliver@qc.com');
        cy.get('input[name="password"').type('123456');
        /*
        cy.get('button')
            .contains('Login')
            .click();

        cy.get('nav .nav-links span')
            .contains('Barry Allen')
            .should('be.visible');
        cy.get('nav a')
            .contains('Login')
            .should('not.exist');
        cy.get('nav a')
            .contains('Signup')
            .should('not.exist');
        cy.url().should('eq', 'http://localhost:4200/');
        */
    });
});
