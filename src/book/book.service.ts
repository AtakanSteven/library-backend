import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Book, BookDocument } from "./schema/book.schema";
import { CreateBookDto } from "./dto/create.book.dto";
import { Profile, ProfileDocument } from "../profile/schema/profile.schema";

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  /**
   * Creates books for current user.
   *
   * @param profileId
   * @param createBookDto
   */
  async create(profileId, createBookDto: CreateBookDto) {
    const objProfileId = new Types.ObjectId(profileId);
    return await new this.bookModel({
      name: createBookDto.name,
      author: createBookDto.author,
      creator: objProfileId,
    }).save();
  }

  /**
   * Adds other users books to users favourites.
   *
   * Users can favorite the other users books’ but not their own books.
   *
   * Users can not favorite the same book twice.
   *
   * Users only can add upto 10 books to their favourites.
   *
   * @param myId
   * @param bookId
   */
  async favouriteBook(myId, bookId) {
    const myBook = await this.getMyBook(bookId, myId);

    if (myBook == 0) {
      const duplicatedLike = await this.profileModel.exists({ favourites: { $in: bookId } });
      if (!duplicatedLike) {
        return this.profileModel.updateOne({ _id: myId, "favourites.9": { $exists: false } }, { $push: { favourites: bookId } });
      }
      throw new BadRequestException("YOU ALREADY ADDED THIS BOOK TO YOUR FAVOURITES");
    }
    throw new BadRequestException("YOU CANNOT ADD YOUR OWN BOOK TO YOUR FAVOURITES");
  }
  /**
   * List all the books of a user.
   *
   * Populate creator who is the user.
   *
   * @param creator
   */
  async getOtherBooks(creator) {
    const objCreatorId = new Types.ObjectId(creator);
    const populate = {
      path: "creator",
      select: "username",
    };
    return await this.bookModel.find({ creator: objCreatorId }).populate(populate).lean().exec();
  }

  /**
   * Gets the users own favourite book list.
   *
   * Nested populate is used to get creators username.
   *
   * If the user doesn't have any books in their favourites array, return null.
   *
   * @param myId
   */
  async getFavourites(otherProfileId) {
    const populate = {
      path: "favourites",
      populate: {
        path: "creator",
        select: "username",
      },
    };
    return await this.profileModel
      .findOne({ _id: otherProfileId, "favourites.0": { $exists: true } })
      .populate(populate)
      .exec();
  }

  /**
   * Gets the users book to see if its existing or not.
   *
   * @param _id
   * @param creatorId
   * @private
   */
  private async getMyBook(_id, creatorId) {
    const objId = new Types.ObjectId(_id);
    const creatorObjId = new Types.ObjectId(creatorId);
    return await this.bookModel.count({ _id: objId, creator: creatorObjId }).lean().exec();
  }
}
