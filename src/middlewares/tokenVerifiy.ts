import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";

import { AuthenticationService } from "../services/AuthController";

export function authenticateHttpRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.query.token as string;

  const authService = Container.get(AuthenticationService);

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7); // Remove 'Bearer ' from the header value
    // Use the token for authentication or further processing
    const userId = authService.verifyToken(token);

    req.userId = userId;
    next();
    res.sendStatus(200);
  } else {
    res.status(401).json({ error: "Invalid token" });
  }
}

export function logout(req: Request, res: Response, next: NextFunction): void {
  const token = req.query.token as string;

  const authService = Container.get(AuthenticationService);
  const userId = authService.updateTokenExpiration(token);

  if (userId) {
    res.status(200).json({ error: false, message: "logged out." });
  } else {
    res.status(401).json({ error: false, message: "invalid token" });
  }
}
