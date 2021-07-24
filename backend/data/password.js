import bcrypt from "bcryptjs";
const passwords = [
  { password: bcrypt.hashSync("123456", 10) },
  { password: bcrypt.hashSync("123456", 10) },
  { password: bcrypt.hashSync("123456", 10) },
];
export default passwords;
