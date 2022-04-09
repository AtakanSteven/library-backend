import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document, Types} from "mongoose";

export type BookDocument = Book & Document;

@Schema()
export class Book {

    @Prop()
    name: string;

    @Prop()
    author: string;

    @Prop({ type: Types.ObjectId, ref: "Profile" })
    creator: Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);
