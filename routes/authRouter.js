import express from "express";

import authenticate from "../middlewares/authenticate.js"

import authControllers from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";

import { authRegesterSchema, authLoginSchema } from "../schemas/authSchemas.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(authRegesterSchema), authControllers.registerController);
authRouter.post("/login", validateBody(authLoginSchema), authControllers.loginController);
authRouter.get("/current", authenticate, authControllers.getCurrentController);
authRouter.post("/logout", authenticate, authControllers.logoutController);

export default authRouter;