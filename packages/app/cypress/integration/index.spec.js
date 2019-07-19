describe('Index Page', () => {
    it('has a Welcome header', () => {
        cy.visit('http://localhost:4200');
        cy.get('h1').should('contain', 'Welcome');
    });

    it('has nav bar with 3 anchor', () => {
        cy.visit('http://localhost:4200');
        cy.get('nav a').should('have.length', 3);
    });

    it('navigates to login page', () => {
        cy.visit('http://localhost:4200');
        cy.get('nav a')
            .contains('Login')
            .click();
        cy.url('includes', '/login');
    });

    it('navigates to signup page', () => {
        cy.visit('http://localhost:4200');
        cy.get('nav a')
            .contains('Signup')
            .click();
        cy.url('includes', '/signup');
    });
});
