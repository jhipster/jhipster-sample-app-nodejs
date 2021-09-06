import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { UserLoginDTO } from '../src/service/dto/user-login.dto';

describe('App', () => {
    let app: INestApplication;

    const infoService = {
        activeProfiles: 'dev',
        'display-ribbon-on-profiles': 'dev',
    };
    const testUserLogin: UserLoginDTO = {
        username: 'system',
        password: 'system',
        rememberMe: true,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET up running info OK', () =>
        request(app.getHttpServer())
            .get('/management/info')
            .expect(200)
            .expect(infoService));

    it('/GET public roles OK', () =>
        request(app.getHttpServer())
            .get('/api/authorities')
            .expect(200));

    it('/GET public users OK', () =>
        request(app.getHttpServer())
            .get('/api/users')
            .expect(200));

    it('/POST authenticate get jwt authenticate OK', () =>
        request(app.getHttpServer())
            .post('/api/authenticate')
            .send(testUserLogin)
            .expect(201));

    afterEach(async () => {
        await app.close();
    });
});
