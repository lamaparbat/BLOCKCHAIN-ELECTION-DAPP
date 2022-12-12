import { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.post('/voter/signup', (req: Request, res: Response) => {
 res.send("voter signup")
});

router.get('/voter/login', (req: Request, res: Response) => {
 res.send("voter login")
});

module.exports = router;