import express from 'express';
import * as userController from '../../../controllers/user.controller';
import { jwtAuth } from '../../../middleware/jwtAuth';

const router = express.Router();

router.post('/me', jwtAuth, userController.getUser);

export default router;
