import bcrypt from "bcrypt";

//function to get hash
export const hashPassword = async (actual, SALTROUND = 10) => {
  return await bcrypt.hash(actual, SALTROUND);
};
//function to return boolean that password match or not
export const comparePassword = async (actual, hash) => {
  return await bcrypt.compare(actual, hash);
};

