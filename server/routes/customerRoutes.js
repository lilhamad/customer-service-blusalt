import { Router } from 'express';
import customerController from '../controllers/customerController';
const router = Router();
router.get('/test', customerController.retrievcustomersFromDbAndSeperate);

export default router;