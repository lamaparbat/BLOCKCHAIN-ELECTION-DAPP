import { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.post('/voter/signup', (req: Request, res: Response) => {
 try {
  const { email, password } = req.body;
  res.send({
   message: "Voter registered successfully.",
   statusCode: 200
  });

 } catch (error) {
  res.send({
   message: "Internal Server Error.",
   statusCode: 500
  });
 }
});

router.get('/voter/login', (req: Request, res: Response) => {
 res.send({
  message: "Voter login successfully.",
  statusCode: 200
 });
});

module.exports = router;