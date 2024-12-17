import { Router } from 'express';
import { getUser, userRegister } from '@modules/user/services/user.service';

const router = Router();

router.get('/', getUser);
router.post('/', userRegister);

export default router;
