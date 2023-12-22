import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TaskStatus } from "./task.model";
import { Document } from "mongoose";

@Schema()
export class Task extends Document {
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    status: TaskStatus;
}
export const TaskSchema = SchemaFactory.createForClass(Task);