import { DocumentBuilder } from '@nestjs/swagger';
import { appName } from '../../../../../libs/global/utils';
import environment from './environment.config';

export const openApiSwaggerConfig = {
  webServerOptions: {
    enabled: environment.NODE_ENV === 'development',
    path: 'api-docs'
  },
  fileGeneratorOptions: {
    enabled: environment.NODE_ENV === 'development',
    outputFilePath: './openapi.yaml' // or ./openapi.json
  },
  clientGeneratorOptions: {
    enabled: environment.NODE_ENV === 'development',
    type: 'typescript-axios',
    outputFolderPath: './libs/global/api-client',
    additionalProperties:
      'apiPackage=clients,modelPackage=models,withoutPrefixEnums=true,withSeparateModelsAndApi=true',
    openApiFilePath: './openapi.yaml',
    skipValidation: true
  }
};

export const openApiConfig = new DocumentBuilder()
  .setTitle(appName)
  .setContact(
    appName,
    'https://github.com/kravchenko-anton/booknex-2-monorepo',
    'Github repository'
  )
  .setVersion('1.0')
  .addTag('👤 user', 'user service')
  .addTag('🔐 auth', 'auth service')
  .addTag('📙 book', 'book service')
  .addTag('📚 catalog', 'catalog service')
  .addTag('❤️ health', 'health service')
  .addTag('🔖 genre', 'genre service')
  .addTag('📁 storage', 'storage service')
  .addTag('⭐ review', 'review service')
  .addTag('📨 recommendation', 'recommendation service')
  .addTag('📦 parser', 'parser service')
  .addBearerAuth();
