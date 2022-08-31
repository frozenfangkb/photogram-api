import jwt, { JwtPayload } from "jsonwebtoken";

export default class Token {
  private static seed: string = "this_is_a_public_seed_and_its_FALSE";
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
