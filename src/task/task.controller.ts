import { Controller , Get , Post , Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { FilterTaskDto, createTaskDto } from './task.dto';
import { TaskStatus } from './task.model';
import { TaskStatusValidationPipe } from './task.pipe';
@Controller('task')
export class TaskController {
    constructor(private readonly taskservice:TaskService){}
    @Get()
    getAllTasks(@Query(ValidationPipe) FilterTaskDto : FilterTaskDto){
        return this.taskservice.getTasks(FilterTaskDto)
    }
    @Get('/:id')
    getTaskById(@Param('id') id:string){
        return this.taskservice.getTaskById(id)
    }
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto : createTaskDto){
        return this.taskservice.createTask(createTaskDto)
    }
    @Patch('/:id')
    updateTaskById(@Param('id') id : string , @Body('status' , TaskStatusValidationPipe) status : TaskStatus) {
        return this.taskservice.updateTaskById(id,status)
    }
    @Delete('/:id')
    deleteTaskById(@Param('id') id:string){
        return this.taskservice.deleteTaskById(id)
    }

}

