import {Body, Controller, HttpStatus, Post, Res, Get, UseGuards, Request, Param} from "@nestjs/common";
import {BookService} from "./book.service";
import {CreateBookDto} from "./dto/create.book.dto";
import {AuthGuard} from "@nestjs/passport";
import { JwtService } from '@nestjs/jwt';

@Controller('books')
export class BookController {
    constructor(private readonly BookService: BookService, private jwtService: JwtService){}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createBook(@Request() req, @Res() response, @Body() createBookDto: CreateBookDto, @Body() body) {
        const user = req.user._id
        const newBook = await this.BookService.create(user, createBookDto);
        return response.status(HttpStatus.CREATED).json({
            newBook
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/favourite')
    async favouriteBook(@Request() req, @Res() response, @Body() body) {
        const user = req.user._id
        const newBook = await this.BookService.favouriteBook(user, body.bookId);
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

    @Get('/favourites/:id')
    async favourites(@Res() response, @Param() param ) {
        const myFavourites = await this.BookService.getFavourites(param.id);
        return response.status(HttpStatus.CREATED).json({
            myFavourites
        })
    }

}
