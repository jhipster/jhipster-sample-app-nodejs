import { Logger, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from './config/config';

export function setupSwagger(app: INestApplication) {
  const logger: Logger = new Logger('Swagger');
  const swaggerEndpoint = '/api/v2/api-docs';
  
const yourOktaDomain = 'dev-281272.okta.com';

  const options = new DocumentBuilder()
    .setTitle(config.get('jhipster.swagger.title'))
    .setDescription(config.get('jhipster.swagger.description'))
    .setVersion(config.get('jhipster.swagger.version'))
    .addOAuth2('accessCode',`https://${yourOktaDomain}/oauth2/default/v1/authorize`,`https://${yourOktaDomain}/oauth2/default/v1/token`)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerEndpoint, app, document);
  logger.log(`Added swagger on endpoint ${swaggerEndpoint}`);
}
