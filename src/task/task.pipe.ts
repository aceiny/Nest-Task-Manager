import {BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from './task.model';
export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]
    private isStatusValid(status:any){
        const idx = this.allowedStatus.indexOf(status)
        return idx !== -1
    }
    transform(value: any) {
        value = value.toUpperCase()
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is not a valid status`)
        }
        return value
    }
}