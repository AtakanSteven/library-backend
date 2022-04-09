import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import {ProfileService} from "./profile.service";
import {CreateProfileDto} from "./dto/create.profile.dto";


@Controller('profile')
export class ProfileController {
    constructor(private readonly ProfileService: ProfileService){}

    @Post()
    async createProfile(@Res() response, @Body() createProfileDto: CreateProfileDto) {
        const newProfile = await this.ProfileService.create(createProfileDto);
        return response.status(HttpStatus.CREATED).json({
            newProfile
        })
    }

}
