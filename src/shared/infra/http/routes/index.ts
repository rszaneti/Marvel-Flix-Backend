import { Router } from 'express';

import sendmailRoutes from '@modules/sendmail/infra/http/routes/sendmail.routes';

const routes = Router();

routes.use('/sendmail', sendmailRoutes);

export default routes;
