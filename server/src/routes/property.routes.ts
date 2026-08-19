import { Router } from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  updatePropertyStatus,
  deleteProperty,
} from '../controllers/property.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { validateBody, validateQuery } from '../middlewares/validate.middleware.js';
import {
  createPropertySchema,
  updatePropertySchema,
  updatePropertyStatusSchema,
  queryPropertiesSchema,
} from '../schemas/property.schema.js';

const router = Router();
router.use(authenticateJWT);

router.get('/', validateQuery(queryPropertiesSchema), getProperties);
router.get('/:id', getPropertyById);
router.post('/', validateBody(createPropertySchema), createProperty);
router.put('/:id', validateBody(updatePropertySchema), updateProperty);
router.patch('/:id/status', validateBody(updatePropertyStatusSchema), updatePropertyStatus);
router.delete('/:id', deleteProperty);

export default router;
