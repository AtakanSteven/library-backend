import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Profile, ProfileDocument } from "./schema/profile.schema";
import { CreateProfileDto } from "./dto/create.profile.dto";
import { EmailService } from "../mail/email.service";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
    private readonly emailService: EmailService,
  ) {}

  /**
   * Create profile using email.
   *
   * Auto generated password is sent to users email.
   *
   * Checks if email already exists or not.
   *
   * NOTE: Password is not protected and its stored in our database!
   *
   * @param createProfileDto
   */
  // @todo protect password?
  async create(createProfileDto: CreateProfileDto) {
    const isMailExist = await this.isMailExist(createProfileDto.email);
    const isUsernameExist = await this.isUsernameExist(createProfileDto.username);

    if (!isMailExist) {
      if (!isUsernameExist) {
        const password = Math.random().toString(36).slice(-8);
        await this.emailService.sendCode(createProfileDto.email, password);
        return await new this.profileModel({
          email: createProfileDto.email,
          password,
          username: createProfileDto.username,
        }).save();
      }
      throw new UnprocessableEntityException("USERNAME_ALREADY_EXIST");
    }
    throw new UnprocessableEntityException("EMAIL_ALREADY_EXIST");
  }

  async findOne(condition) {
    return this.profileModel.findOne(condition);
  }

  private async isMailExist(email: string): Promise<boolean> {
    const exist = await this.profileModel.count({ email }).exec();
    return exist != 0;
  }

  private async isUsernameExist(username: string): Promise<boolean> {
    const exist = await this.profileModel.count({ username }).exec();
    return exist != 0;
  }
}
