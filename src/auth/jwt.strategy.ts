import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";
import { ProfileService } from "../profile/profile.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private profileService: ProfileService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload) {
    const user = await this.profileService.findOne({ _id: payload.userId });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
