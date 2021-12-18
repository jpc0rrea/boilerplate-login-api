import { container } from 'tsyringe';

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './models/IMailTemplateProvider';

const providers = {
  handlebars: container.resolve(HandlebarsMailTemplateProvider),
};

container.registerInstance<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
