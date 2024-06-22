import { Router } from "express";
import {
  loginMiddleware,
  registerMiddleware,
} from "./middlewares/authMiddleware";
import { ProductMiddlewareInstance } from "./middlewares/productMiddleware";
import {
  createMediaMiddleware,
  viewAllMediaMiddleware,
  viewMediaMiddleware,
} from "./middlewares/mediaMiddleware";
import { logout, authenticateHttpRequest } from "./middlewares/tokenVerifiy";

const authRouter = Router();

authRouter.post("/auth/register", registerMiddleware);
authRouter.post("/auth/login", loginMiddleware);
authRouter.post("/auth/logout", logout);

authRouter.post(
  "/product/create",
  authenticateHttpRequest,
  ProductMiddlewareInstance.create
);
authRouter.get(
  "/product/getall",
  authenticateHttpRequest,
  ProductMiddlewareInstance.getAll
);

authRouter.post(
  "/media/create",
  authenticateHttpRequest,
  createMediaMiddleware
);
authRouter.get(
  "/media/getall",
  authenticateHttpRequest,
  viewAllMediaMiddleware
);
authRouter.get("/media/download", authenticateHttpRequest, viewMediaMiddleware);

export default authRouter;
