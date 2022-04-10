import {Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from "../profile/profile.service";

@Injectable()
export class AuthService {
    constructor(private profileService: ProfileService, private jwtTokenService: JwtService){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.profileService.findOne(username);

        if (user && user.password === password) {
            const {password, ...result} = user
            return result
        }
        return null
    }

    /**
     * Login with username password and get access token.
     *
     * @param username
     * @param password
     */
    async loginWithCredentials(username, password) {
        const user = await this.profileService.findOne({username, password});
        if (user) {
            const payload = { userId: user._id };
            const accessToken = this.jwtTokenService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('Incorrect login credentials!');
        }
    }
}
