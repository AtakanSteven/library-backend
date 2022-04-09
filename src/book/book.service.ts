import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {Book, BookDocument} from "./schema/book.schema";
import {CreateBookDto} from "./dto/create.book.dto";

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private readonly bookModel: Model<BookDocument>,
        ) {}

    async create(profileId, createBookDto: CreateBookDto) {
        const objProfileId = new Types.ObjectId(profileId)
        return await new this.bookModel({
            name: createBookDto.name,
            author: createBookDto.author,
            creator: objProfileId
        }).save()
    }

    async getMyBooks(_id) {
        const populate = {
            path: "creator"
        };

        return this.bookModel.findOne({_id}).populate(populate).lean();
    }

}
