import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  })
}

const loginController = async (req, res) => {
  const { token, user } = await authServices.loginUser(req.body);

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  })
}

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
}