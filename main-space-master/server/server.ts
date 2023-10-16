import * as express from 'express';

import { Request, Response } from 'express';
import { body } from 'express-validator';
import { getProductById } from './src/getProductById';
import { getProducts } from './src/getProducts';
import { userLogin } from './src/userLogin';
import { userRegister } from './src/userRegister';
const app = express();

const cors = require('cors');
app.use(cors({ origin: true }));

app.use(express.json());

// console.log('Hello world');

app.route('/').get((req: Request, res: Response) => {
  return res.send('Products API is working');
});

app.route('/api/products').get(getProducts);

app.get('/api/product/:productId', getProductById);

app.post(
  '/api/register',
  body('username').not().isEmpty(),
  body('password').not().isEmpty(),
  body('personalInfo.firstName').not().isEmpty(),
  body('personalInfo.lastName').not().isEmpty(),
  body('personalInfo.phoneNumber').not().isEmpty(),
  body('address.street').not().isEmpty(),
  body('address.city').not().isEmpty(),
  body('address.state').not().isEmpty(),
  body('address.country').not().isEmpty(),
  body('address.zip').not().isEmpty(),
  userRegister
);

app.post(
  '/api/login',
  body('username').not().isEmpty(),
  body('password').not().isEmpty(),
  userLogin
);

// app.all('/api/all', (req, res) => {
//   return res.sendStatus(200);
// });

app.listen(3000, () => {
  console.log('Application listening at http://localhost:3000');
});
