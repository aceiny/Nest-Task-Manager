import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { FilterTaskDto, createTaskDto } from './task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task as TaskS } from './task.schema';
import { Model } from 'mongoose';


@Injectable()
export class TaskService {
    constructor(
        @InjectModel(TaskS.name)
        private  taskModel : Model<TaskS>
    ){}
    async getTasks(FilterTaskDto : FilterTaskDto) : Promise<TaskS[]> {
        const { status , search } = FilterTaskDto
        const Qobj : any = {}
        if(status){
            Qobj.status = status
        }
        if(search){
            Qobj.title = { $regex: search , $options: 'i' }
        }
        const tasks = await this.taskModel.find(Qobj)
        return tasks
        
    }
    async createTask(createTaskDto : createTaskDto) : Promise<TaskS> {
        const { title , description } = createTaskDto
        const task = this.taskModel.create({ title , description , status : TaskStatus.OPEN })
        return task
    }
    async getTaskById(id:string) : Promise<TaskS> {
        try{
            const found =  await this.taskModel.findById(id)
            if(!found){
                throw new NotFoundException(`Task with id ${id} not found`)
            }
            return found
        }
        catch(err){
            throw new NotFoundException(`Task with id ${id} not found`)
        }
    }
    async updateTaskById(id:string , status:TaskStatus) : Promise<TaskS> {
        try{
            const task = await this.taskModel.findByIdAndUpdate(id , { status } , { new : true })
            if(!task){
                throw new NotFoundException(`Task with id ${id} not found`)
            }
            return task
        }
        catch(err){
            throw new NotFoundException(`Task with id ${id} not found`)
        }
    }
    async deleteTaskById(id:string) : Promise<{message:string , statusCode:number}> {
        try{
            const task = await this.taskModel.findByIdAndDelete(id)
            if(!task){
                throw new NotFoundException(`Task with id ${id} not found`)
            }
            return { message : `Task with id ${id} deleted successfully` , statusCode : 200  }
        }
        catch(err){
            throw new NotFoundException(`Error while deleting task with id ${id}: ${err.message}`)
        }
    
    }
}