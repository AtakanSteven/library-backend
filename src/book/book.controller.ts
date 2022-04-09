import { Body, Controller, HttpStatus, Post, Res, Get } from "@nestjs/common";
import {BookService} from "./book.service";
import {CreateBookDto} from "./dto/create.book.dto";

@Controller('books')
export class BookController {
    constructor(private readonly BookService: BookService){}

    @Post()
    async createBook(@Res() response, @Body() createBookDto: CreateBookDto, @Body() body) {
        const newBook = await this.BookService.create(body.profileId, createBookDto);
        return response.status(HttpStatus.CREATED).json({
            newBook
        })
    }

    @Post('/favourite')
    async favouriteBook(@Res() response, @Body() body) {
        const newBook = await this.BookService.favouriteBook(body.myId, body.bookId);
        return response.status(HttpStatus.CREATED).json({
            newBook
        })
    }

    @Get()
    async otherBooks(@Res() response, @Body() body) {
        const myBooks = await this.BookService.getOtherBooks(body.creator);
        return response.status(HttpStatus.CREATED).json({
            myBooks
        })
    }
    @Get('/favourites')
    async favourites(@Res() response, @Body() body) {
        const myFavourites = await this.BookService.getFavourites(body._id);
        return response.status(HttpStatus.CREATED).json({
            myFavourites
        })
    }

}
