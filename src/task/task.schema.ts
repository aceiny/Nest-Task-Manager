import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TaskStatus } from "./task.model";
import { Document, Types } from "mongoose";
import { Type } from "class-transformer";

@Schema()
export class Task extends Document {
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    status: TaskStatus;
    @Prop({type : Types.ObjectId , ref : 'User'})
    user : Types.ObjectId
}
export const TaskSchema = SchemaFactory.createForClass(Task);