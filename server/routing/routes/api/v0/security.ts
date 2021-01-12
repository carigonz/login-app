import express from 'express';
import * as securityController from '../../../controllers/security.controller';

const router = express.Router();

/* login */
router.post('/authenticate', securityController.login);

export default router;