import { Controller , Get , Post , Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { FilterTaskDto, createTaskDto } from './task.dto';
import { TaskStatus } from './task.model';
import { TaskStatusValidationPipe } from './task.pipe';
import { AuthGuard } from '@nestjs/passport';
@Controller('task')
export class TaskController {
    constructor(private readonly taskservice:TaskService){}
    @Get()
    @UseGuards(AuthGuard())
    getAllTasks(@Query(ValidationPipe) FilterTaskDto : FilterTaskDto , @Req() req){
        return this.taskservice.getTasks(FilterTaskDto , req.user)
    }
    @Get('/:id')
    @UseGuards(AuthGuard())
    getTaskById(@Param('id') id:string , @Req() req){
        return this.taskservice.getTaskById(id , req.user)
    }
    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    createTask(@Body() createTaskDto : createTaskDto , @Req() req){
        return this.taskservice.createTask(createTaskDto , req.user)
    }
    @Patch('/:id')
    @UseGuards(AuthGuard())
    updateTaskById(@Param('id') id : string , @Body('status' , TaskStatusValidationPipe) status : TaskStatus , @Req() req) {
        return this.taskservice.updateTaskById(id,status , req.user)
    }
    @Delete('/:id')
    @UseGuards(AuthGuard()) 
    deleteTaskById(@Param('id') id:string , @Req() req){
        return this.taskservice.deleteTaskById(id , req.user)
    }

}

