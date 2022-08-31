import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export default class Token {
  private static seed: string = process.env.JWT_SEED as string;
  private static validTime: string = "30d";

  constructor() {}

  static getJwtToken(payload: unknown): string {
    return jwt.sign(
      {
        user: payload,
      },
      this.seed,
      { expiresIn: this.validTime }
    );
  }

  static async checkToken(
    userToken: string
  ): Promise<void | JwtPayload | string> {
    return new Promise((resolve, reject) => {
      jwt.verify(userToken, this.seed, (err, decoded) => {
        if (err) {
          reject();
        } else {
          resolve(decoded);
        }
      });
    });
  }
}
