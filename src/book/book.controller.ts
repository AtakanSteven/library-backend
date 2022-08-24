import { Body, Controller, HttpStatus, Post, Res, Get, UseGuards, Request, Param, Logger } from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create.book.dto";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { MyLoggerService } from "../myLogger/myLogger.service";

@Controller("books")
export class BookController {
  constructor(private readonly bookService: BookService, private jwtService: JwtService, private readonly myLogger: MyLoggerService) {
    this.myLogger.setContext("BookController");
  }
  //private logger = new Logger("HTTP");
  private readonly logger = new Logger(BookController.name);

  @Post()
  @UseGuards(AuthGuard("jwt"))
  async createBook(@Request() req, @Res() response, @Body() createBookDto: CreateBookDto, @Body() body) {
    const user = req.user._id;
    this.myLogger.customLog("1ac6e3d4-2f5f-4655-9547-0cf64117b3f0");

    console.log("reqreqreqreq", req.requestId);

    const newBook = await this.bookService.create(user, createBookDto);
    return response.status(HttpStatus.CREATED).json({
      newBook,
    });
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/favourite")
  async favouriteBook(@Request() req, @Res() response, @Body() body) {
    const user = req.user._id;
    const newBook = await this.bookService.favouriteBook(user, body.bookId);
    return response.status(HttpStatus.CREATED).json({
      newBook,
    });
  }

  @Get()
  async otherBooks(@Res() response, @Body() body) {
    const myBooks = await this.bookService.getOtherBooks(body.creator);
    return response.status(HttpStatus.CREATED).json({
      myBooks,
    });
  }

  @Get("/favourites/:id")
  async favourites(@Res() response, @Param() param) {
    const myFavourites = await this.bookService.getFavourites(param.id);
    return response.status(HttpStatus.CREATED).json({
      myFavourites,
    });
  }
}
