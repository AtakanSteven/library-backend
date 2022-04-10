import { Module } from "@nestjs/common";
import {Profile, ProfileSchema} from "./schema/profile.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {ProfileController} from "./profile.controller";
import {ProfileService} from "./profile.service";
import {EmailModule} from "../mail/email.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";

@Module({
    providers: [ProfileService],
    controllers: [ProfileController],
    imports: [MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema },]), EmailModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: {expiresIn: '1000s'}
        })],
    exports: [ProfileService]
})
export class ProfileModule {}
