import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as fs from 'fs';

export async function userRegister(req: Request, res: Response) {
  console.log('userRegister ...');
  const reqBody = req.body;
  const username = reqBody.username;
  const password = reqBody.password;
  const email = reqBody.email;
  const personalInfo = reqBody.personalInfo;
  const address = reqBody.address;

  const result = validationResult(req);
  const errors = result['errors'];

  const filePath = './server/src/data/users.json';

  let newUser = await JSON.stringify(reqBody);

  // console.log('In 11, newUser.username', username);

  if (errors && errors.length > 0) {
    res.status(200).json({
      status: 'failed',
      errors: [...errors],
    });
  } else {
    await fs.readFile(filePath, (err, data) => {
      if (err) throw err;
      // console.log('In 00 data: ', data.length);
      const fileData = data.length > 0 ? JSON.parse(data.toString()) : {};
      let userList = fileData.userList ?? [];

      // if (userList.length) {
      //   const testuser = JSON.parse(userList[0]);
      //   console.log('In 33 testuser: ', testuser);
      //   console.log('In 44 testuser.username: ', testuser.username);
      // }

      const nameUsed = isExistUserName(userList, username);
      const emailUsed = isExistUserEmail(userList, email);

      if (nameUsed) {
        res.status(200).json({
          status: 'fail',
          errors: [
            {
              type: 'field',
              value: '',
              msg: 'username used',
              path: 'username',
            },
          ],
        });
      } else if (emailUsed) {
        res.status(200).json({
          status: 'fail',
          errors: [
            {
              type: 'field',
              value: '',
              msg: 'email used',
              path: 'email',
            },
          ],
        });
      } else {
        let newUser = JSON.stringify(reqBody);
        const newList = [...userList, newUser];
        const filedata = {
          userList: newList,
        };

        fs.writeFileSync(filePath, JSON.stringify(filedata));
        res.status(200).json({
          username,
          personalInfo,
          address,
          status: 'success',
        });
      }
    });
  }
}

export function isExistUserName(users: any[], newUserName: string) {
  if (!users || !users.length) {
    return false;
  }
  const result = users.find((user) => {
    const curUser = JSON.parse(user);
    return curUser.username === newUserName;
  });
  return !!result;
}

export function isExistUserEmail(users: any[], newEmail: string) {
  if (!users || !users.length) {
    return false;
  }
  const result = users.find((user) => {
    const curUser = JSON.parse(user);
    return curUser.email === newEmail;
  });
  return !!result;
}
