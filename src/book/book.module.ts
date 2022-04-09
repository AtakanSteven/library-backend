import { Module } from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {BookService} from "./book.service";
import {Book, BookSchema} from "./schema/book.schema";
import {BookController} from "./book.controller";

@Module({
    providers: [BookService],
    controllers: [BookController],
    imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema },])],
})
export class BookModule {}
