import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { FilterTaskDto, createTaskDto } from './task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task as TaskS } from './task.schema';
import { Model } from 'mongoose';
import { User } from 'src/auth/auth.schema';


@Injectable()
export class TaskService {
    constructor(
        @InjectModel(TaskS.name)
        private  taskModel : Model<TaskS>
    ){}
    async getTasks(FilterTaskDto : FilterTaskDto , user) : Promise<TaskS[]> {
        const { status , search } = FilterTaskDto
        const Qobj : any = {}
        if(status){
            Qobj.status = status
        }
        if(search){
            Qobj.title = { $regex: search , $options: 'i' }
        }
        const tasks = await this.taskModel.find({...Qobj , user : user.id})
        return tasks
        
    }
    async createTask(createTaskDto : createTaskDto , user : User) : Promise<TaskS> {
        const { title , description } = createTaskDto
        console.log(user)
        const task = this.taskModel.create({ title , description , status : TaskStatus.OPEN , user : user.id })
        return task
    }
    async getTaskById(id:string , user) : Promise<TaskS> {
        try{
            const found =  await this.taskModel.findOne({_id : id , user : user.id})
            if(!found){
                throw new NotFoundException(`Task with id ${id} not found`)
            }
            return found
        }
        catch(err){
            throw new NotFoundException(`Task with id ${id} not found`)
        }
    }
    async updateTaskById(id:string , status:TaskStatus , user) : Promise<TaskS> {
        try{
            const task = await this.taskModel.findOneAndUpdate({_id : id , user : user.id } , { status } , { new : true })
            if(!task){
                throw new NotFoundException(`Task with id ${id} not found`)
            }
            return task
        }
        catch(err){
            throw new NotFoundException(`Task with id ${id} not found`)
        }
    }
    async deleteTaskById(id:string , user) : Promise<{message:string , statusCode:number}> {
        try{
            const task = await this.taskModel.findOneAndDelete({_id : id , user : user.id})
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