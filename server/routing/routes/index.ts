import express from 'express';
import api_v0Routes from './api/v0';

const router = express.Router();

router.use('/api/v0', api_v0Routes);

export default router;
