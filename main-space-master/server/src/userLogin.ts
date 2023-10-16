import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as fs from 'fs';

export async function userLogin(req: Request, res: Response) {
  console.log('userLogin ...');
  const reqBody = req.body;
  const username = reqBody.username;
  const password = reqBody.password;

  const result = validationResult(req);
  const errors = result['errors'];

  const filePath = './server/src/data/users.json';

  // console.log('In 11, username', username);
  // console.log('In 22, password', password);

  if (errors && errors.length > 0) {
    res.status(200).json({
      status: 'failed',
      errors: [...errors],
    });
  } else {
    await fs.readFile(filePath, (err, data) => {
      if (err) throw err;
      // console.log('In 33 data: ', data.length);
      const fileData = data.length > 0 ? JSON.parse(data.toString()) : {};
      let userList = fileData.userList ?? [];

      let matchedUserStr = hasMatchedUser(userList, username, password);

      if (matchedUserStr) {
        let matchedUser = JSON.parse(matchedUserStr);
        delete matchedUser.password;
        res.status(200).json({
          user: matchedUser,
          status: 'success',
        });
      } else {
        res.status(200).json({
          status: 'fail',
          errors: [
            {
              type: 'field',
              value: '',
              msg: 'user not found',
            },
          ],
        });
      }
    });
  }
}

export function hasMatchedUser(
  users: any[],
  username: string,
  password: string
) {
  if (!users || !users.length) {
    return false;
  }
  const result = users.find((user) => {
    const curUser = JSON.parse(user);
    const matchedUser =
      curUser.username === username && curUser.password === password;
    return matchedUser;
  });

  return result;
}
