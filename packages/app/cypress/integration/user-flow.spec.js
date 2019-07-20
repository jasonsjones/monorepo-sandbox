describe('User Signup/Login Flow', () => {
    after(() => {
        return cy.request('POST', 'http://localhost:3000/graphql', {
            query: `mutation { deleteUserAll }`
        });
    });

    describe('signup and login a new user', () => {
        it('successfully signs up a new user', () => {
            cy.visit('http://localhost:4200/signup');
            cy.get('input[name="firstName"').type('Oliver');
            cy.get('input[name="lastName"').type('Queen');
            cy.get('input[name="email"').type('oliver@qc.com');
            cy.get('input[name="password"').type('123456');
            cy.get('button')
                .contains('Submit')
                .click();

            cy.get('nav .nav-links span')
                .contains('Oliver Queen')
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
                .contains('Oliver Queen')
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

    describe('login an existing user', () => {
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
                        authUser {
                            _id
                        }
                        token
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

        it('successfully logs in a valid user', () => {
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
});
