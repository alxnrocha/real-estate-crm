import { Router } from 'express';
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/client.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { validateBody, validateQuery } from '../middlewares/validate.middleware.js';
import {
  createClientSchema,
  updateClientSchema,
  queryClientsSchema,
} from '../schemas/client.schema.js';

const router = Router();
router.use(authenticateJWT);

router.get('/', validateQuery(queryClientsSchema), getClients);
router.get('/:id', getClientById);
router.post('/', validateBody(createClientSchema), createClient);
router.put('/:id', validateBody(updateClientSchema), updateClient);
router.delete('/:id', deleteClient);

export default router;
