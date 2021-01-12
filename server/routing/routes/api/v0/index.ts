import express from 'express';
import securityRoutes from './security';
import userRoutes from './user';

const router = express.Router();

router.use('', securityRoutes);
router.use('/users', userRoutes);

export default router;
