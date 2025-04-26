import fs from "node:fs/promises";
import path from "node:path";

import HttpError from "../helpers/HttpError.js";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const registerController = async (req, res) => {
  const { email, subscription, avatarURL } = await authServices.registerUser(req.body);

  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
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

const getCurrentController = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  })
}

const logoutController = async (req, res) => {
  const { id } = req.user;
  await authServices.logoutUser(id);

  res.status(204).send();
}

const updateAvatar = async (req, res) => {
  if (!req.user) {
    throw HttpError(401, "Not authorized");
  }

  if (!req.file) {
    throw HttpError(400, "Avatar file is required");
  }

  const { id, avatarURL: oldAvatarURL } = req.user;

  const { path: tempPath, originalname } = req.file;
  const timestamp = Date.now();
  const fileName = `${id}_${timestamp}_${originalname}`;

  const avatarsDir = path.resolve("public", "avatars");
  const finalPath = path.join(avatarsDir, fileName);

  if (oldAvatarURL) {
    const oldFileName = path.basename(oldAvatarURL);
    if (oldFileName !== fileName) {
      const oldFilePath = path.join(avatarsDir, oldFileName);
      try {
        await fs.unlink(oldFilePath);
      } catch (error) {
        console.log(`Failed to delete old avatar: ${error.message}`);
      }
    }
  }

  await fs.rename(tempPath, finalPath);

  const newAvatarURL = `/avatars/${fileName}`;
  await authServices.updateUserAvatar(id, { avatarURL: newAvatarURL });

  res.status(200).json({ avatarURL: newAvatarURL });
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  getCurrentController: ctrlWrapper(getCurrentController),
  logoutController: ctrlWrapper(logoutController),
  updateAvatar: ctrlWrapper(updateAvatar),
}