import { inject, injectable } from 'tsyringe';
import path from 'path';

// Repository
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  channel: string;
  logo: string;
  list: {
    title: string;
    description: string;
    modified: Date | null;
    pageCount: number;
    issueNumber: number;
    thumbnail: string;
  }[];
}

@injectable()
class SendEntityEmailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    name,
    email,
    channel,
    logo,
    list,
  }: IRequest): Promise<void> {
    if (!email) {
      throw new AppError('E-mail não cadastrado.');
    }
    const defaultTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'shared',
      'views',
      'emails',
      'layouts',
      'default.hbs',
    );

    const headerTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'shared',
      'views',
      'emails',
      'partials',
      'header.hbs',
    );

    const footerTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'shared',
      'views',
      'emails',
      'partials',
      'footer.hbs',
    );

    const bodyTemplate = path.resolve(__dirname, '..', 'views', 'body.hbs');

    await this.mailProvider.sendMail({
      to: {
        name,
        email,
      },
      subject: channel,
      templateData: {
        file: defaultTemplate,
        fileHeader: headerTemplate,
        fileBody: bodyTemplate,
        fileFooter: footerTemplate,
        variables: {
          name,
          email,
          channel,
          logo,
          list,
        },
      },
    });
  }
}

export default SendEntityEmailService;
