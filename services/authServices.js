import bcrypt from "bcrypt";

import HttpError from "../helpers/HttpError.js";

import User from "../db/models/User.js";

import { generateToken } from "../helpers/jwt.js";

export const findUser = query => User.findOne({
  where: query,
})

export const registerUser = async data => {
  const { email, password } = data;
  const user = await User.findOne({
    where: {
      email
    }
  })

  if (user) {
    throw HttpError(409, "Email in use")
  }

  const hashPassword = await bcrypt.hash(password,10)

  return User.create({...data, password: hashPassword});
}

export const loginUser = async data => {
  const { email, password } = data;
  const user = await User.findOne({
    where: {
      email
    }
  });
  if (!user) {
    throw HttpError(401, "Email or password is wrong")
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401,"Email or password is wrong")
  }

  const payload = {
    id: user.id
  };

  const token = generateToken(payload)

  await user.update({token})

  return { token, user };
}

export const logoutUser = async id => {
  const user = await findUser({id});
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await user.update({token: null})

}