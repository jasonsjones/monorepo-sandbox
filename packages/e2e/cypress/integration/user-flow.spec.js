describe('User Signup/Login Flow', () => {
    after(() => {
        return cy.request('POST', 'http://localhost:3000/graphql', {
            query: `mutation { deleteUserAll }`
        });
    });

    describe('Signup', () => {
        it('signs up a new user', () => {
            cy.visit('http://localhost:4200/signup');
            cy.get('#firstName').type('Oliver');
            cy.get('#lastName').type('Queen');
            cy.get('#email').type('oliver@qc.com');
            cy.get('#password').type('123456');
            cy.get('button')
                .contains('Submit')
                .click();

            cy.url().should('eq', 'http://localhost:4200/aftersignup');
        });
    });

    describe('Login', () => {
        const query = `
                mutation CreateUser(
                    $firstName: String!,
                    $lastName: String!,
                    $email: String!,
                    $password: String!
                ) {
                    createUser(
                        firstName: $firstName,
                        lastName: $lastName,
                        email: $email,
                        password: $password
                    ) {
                        name {
                            first
                            last
                        }
                        email
                    }
                }
            `;

        const variables = {
            firstName: 'Barry',
            lastName: 'Allen',
            email: 'barry@starlabs.com',
            password: '123456'
        };

        before(() => {
            return cy
                .request('POST', 'http://localhost:3000/graphql', {
                    query,
                    variables
                })
                .then(res => console.log(res.body.data));
        });

        it('logs in a valid user', () => {
            cy.visit('http://localhost:4200/login');
            cy.get('#email').type('barry@starlabs.com');
            cy.get('#password').type('123456');
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

        it('logs out the user', () => {
            cy.get('nav .nav-links span')
                .contains('Barry Allen')
                .should('be.visible')
                .click();

            cy.get('nav p')
                .contains('Logout')
                .should('be.visible')
                .click();

            cy.get('nav a')
                .contains('Login')
                .should('be.visible');
            cy.get('nav a')
                .contains('Signup')
                .should('be.visible');
        });
    });
});
