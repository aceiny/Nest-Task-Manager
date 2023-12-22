import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
     MongooseModule.forRoot('mongodb+srv://Aceiny:LJncaXBX4nm9nVeX@taskmanager.jcz9knr.mongodb.net/NestTaskManager?retryWrites=true&w=majority') 
     , TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
