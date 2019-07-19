describe('Login Flow', () => {
    it.skip('successfully logs in a valid user', () => {
        cy.visit('http://localhost:4200/login');
        cy.get('input[name="email"').type('barry@starlabs.com');
        cy.get('input[name="password"').type('123456');
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
    });
});
