import { Body, Controller, HttpStatus, Post, Res, Get } from "@nestjs/common";
import {BookService} from "./book.service";
import {CreateBookDto} from "./dto/create.book.dto";

@Controller('book')
export class BookController {
    constructor(private readonly BookService: BookService){}

    @Post()
    async createBook(@Res() response, @Body() createBookDto: CreateBookDto, @Body() body) {
        const newBook = await this.BookService.create(body.profileId, createBookDto);
        return response.status(HttpStatus.CREATED).json({
            newBook
        })
    }
    @Get()
    async getMyBooks(@Res() response, @Body() body) {
        const myBooks = await this.BookService.getMyBooks(body.bookId);
        return response.status(HttpStatus.CREATED).json({
            myBooks
        })
    }

}
