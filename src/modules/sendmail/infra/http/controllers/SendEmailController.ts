import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Services
import SendEntityEmailService from '@modules/sendmail/services/SendEmailService';

export default class SendEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, channel, logo, list } = request.body;

    const sendEntityEmail = container.resolve(SendEntityEmailService);

    let channelDescription = '';

    if (channel === 'comics') {
      channelDescription = 'Listagem do canal Histórias em Quadrinhos';
    } else if (channel === 'characters') {
      channelDescription = 'Listagem do canal Personagens';
    } else if (channel === 'creators') {
      channelDescription = 'Listagem do canal Criadores';
    }

    await sendEntityEmail.execute({
      name,
      email,
      logo,
      channel: channelDescription,
      list,
    });

    return response.status(204).json();
  }
}
