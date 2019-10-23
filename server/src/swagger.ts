import { Logger, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from './config/config';

export function setupSwagger(app: INestApplication) {
  const logger: Logger = new Logger('Swagger');
  const swaggerEndpoint = config.get('jhipster.swagger.path');

  const issuerUri = config.get('jhipster.security.oauth2.client.provider.oidc.issuer-uri');

  const options = new DocumentBuilder()
    .setTitle(config.get('jhipster.swagger.title'))
    .setDescription(config.get('jhipster.swagger.description'))
    .setVersion(config.get('jhipster.swagger.version'))
    .addOAuth2('accessCode', `${issuerUri}/v1/authorize`, `${issuerUri}/v1/token`, { 'openid profile': 'openid profile' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerEndpoint, app, document);
  logger.log(`Added swagger on endpoint ${swaggerEndpoint}`);
}
