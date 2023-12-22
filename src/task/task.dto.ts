import { TaskStatus } from "./task.model";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
export class createTaskDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
}


export class FilterTaskDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;
    @IsOptional()
    search: string;
}
