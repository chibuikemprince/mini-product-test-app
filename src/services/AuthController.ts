// src/services/AuthenticationService.ts
import { Service } from "typedi";
import { sign, verify } from "jsonwebtoken";
@Service()
export class AuthenticationService {
  generateToken(userId: number): string {
    const token = sign({ userId }, process.env.JWT_TOKEN, {
      expiresIn: "24h",
    });
    return token;
  }

  verifyToken(token: string): number | null {
    try {
      const decoded = verify(token, process.env.JWT_TOKEN) as {
        userId: number;
      };
      return decoded.userId;
    } catch (error) {
      return null;
    }
  }

  updateTokenExpiration(token: string): string {
    // Decode the existing token to extract the payload
    const decodedToken: any = verify(token, process.env.JWT_TOKEN) as {
      userId: number;
    };
    // Set the new expiration time to 1 second from the current time
    const newExpiration = Math.floor(Date.now() / 1000) + 1;

    // Update the expiration time in the payload
    decodedToken.exp = newExpiration;

    // Sign the updated payload to generate a new token
    const updatedToken = sign(
      { userId: decodedToken.userId },
      process.env.JWT_TOKEN,
      {
        expiresIn: newExpiration,
      }
    );

    console.log(updatedToken);
    return updatedToken;
  }
}
