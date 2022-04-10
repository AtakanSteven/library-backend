import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { ProfileModule } from "../profile/profile.module";
import {AuthController} from "./auth.controller";
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        ProfileModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1000s'}
        })],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, PassportModule, JwtStrategy, JwtModule],
    controllers: [AuthController]
})
export class AuthModule {}
