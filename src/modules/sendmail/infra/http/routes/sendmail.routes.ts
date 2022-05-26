import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SendEmailController from '../controllers/SendEmailController';

const sendEmailRouter = Router();
const sendEmailController = new SendEmailController();

sendEmailRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      logo: Joi.optional(),
      channel: Joi.optional(),
      list: Joi.array().items({
        title: Joi.optional(),
        description: Joi.optional(),
        modified: Joi.optional(),
        pageCount: Joi.optional(),
        issueNumber: Joi.optional(),
        thumbnail: Joi.optional(),
      }),
    },
  }),
  sendEmailController.create,
);

export default sendEmailRouter;
