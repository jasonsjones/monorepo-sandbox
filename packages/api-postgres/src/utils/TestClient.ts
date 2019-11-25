import { Application } from 'express';
import request, { Test } from 'supertest';
import { User } from '../entity/User';
import UserService from '../services/UserService';

class TestClient {
    private app: Application;
    private accessToken: string;
    private refreshToken: string;

    constructor(app: Application) {
        this.app = app;
    }

    public async createUser(
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ): Promise<User> {
        return await UserService.createUser(firstName, lastName, email, password);
    }

    public async login(email: string, password: string): Promise<string> {
        const query = `
            mutation Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    accessToken
                }
            }
        `;
        const variables = {
            email,
            password
        };
        const response: any = await request(this.app)
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .send({ query, variables });

        const rtoken: string = this.getRefreshTokenFromHeaders(response.headers['set-cookie']);
        this.setRefreshToken(rtoken);
        if (response.body.data) {
            const atoken = response.body.data.login.accessToken;
            this.setAccessToken(atoken);
            return atoken;
        }
        return '';
    }

    public async getMe(): Promise<Test> {
        const query = `
            query {
                me {
                    id
                    firstName
                    lastName
                    name
                    email
                    emailVerificationToken
                    isEmailVerified
                }
            }
        `;
        const response: any = await request(this.app)
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.getAccessToken()}`)
            .send({ query });
        return response;
    }

    public getAccessToken(): string {
        return this.accessToken;
    }

    public setAccessToken(token: string): void {
        this.accessToken = token;
    }

    public getRefreshToken(): string {
        return this.refreshToken;
    }

    public setRefreshToken(token: string): void {
        this.refreshToken = token;
    }

    private getRefreshTokenFromHeaders(headers: string[]): string {
        let refreshToken = '';
        const cookies = headers[0].split(';');
        const qid = cookies.find((cookie: string) => cookie.indexOf('qid=') === 0);
        if (qid) {
            refreshToken = qid.split('=')[1];
        }
        return refreshToken;
    }
}

export default TestClient;
