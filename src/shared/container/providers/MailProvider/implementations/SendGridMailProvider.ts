import mailConfig from '@config/mail';
import sgMail, { MailService } from '@sendgrid/mail';
import { inject, injectable } from 'tsyringe';

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class SendGridMailProvider implements IMailProvider {
  private client: MailService;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = sgMail;
    this.client.setApiKey(process.env.SENDGRID_API_KEY);
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    const template = await this.mailTemplateProvider.parse(templateData);

    const msg: sgMail.MailDataRequired = {
      from: {
        name: from?.name || name,
        email: from?.email || email,
      },
      to: to.email,
      subject,
      html: template,
    };

    this.client.send(msg).catch((error) => {
      console.error(error);
    });
  }
}
