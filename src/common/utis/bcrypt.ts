import { hashSync, compareSync } from 'bcrypt';

/**
 *
 * @param { string } password
 * @returns
 */

export function encript(password: string) {
  const pwd = hashSync(password, 10);
  return pwd;
}

/**
 *
 * @param { string } password
 * @param { string } passwordDB
 */

export function comparePwd(password: string, passwordDB: string) {
  const isValid = compareSync(password, passwordDB);

  return isValid;
}
