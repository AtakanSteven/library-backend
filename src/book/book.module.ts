import { Module } from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {BookService} from "./book.service";
import {Book, BookSchema} from "./schema/book.schema";
import {BookController} from "./book.controller";
import {ProfileModule} from "../profile/profile.module";
import {Profile, ProfileSchema} from "../profile/schema/profile.schema";

@Module({
    providers: [BookService],
    controllers: [BookController],
    imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema },{ name: Profile.name, schema: ProfileSchema }]), ProfileModule],
})
export class BookModule {}
