import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const createdTask = new this.taskModel({
      ...createTaskDto,
      userId,
    });
    return createdTask.save();
  }

  async findAll(userId: string): Promise<Task[]> {
    // NOTE: This currently returns ALL tasks from ALL users
    // TODO for candidates: Add authorization to filter by userId
    return this.taskModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Task | null> {
    // NOTE: This currently returns any task regardless of user
    // TODO for candidates: Add authorization check
    const task = await this.taskModel.findOne({ _id: id, userId }).exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task | null> {
    // NOTE: This currently updates any task regardless of user
    // TODO for candidates: Add authorization check
    const task = await this.taskModel.findOneAndUpdate(
      { _id: id, userId },
      updateTaskDto,
      { new: true },
    );

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId.toString() !== userId.toString()) {
      throw new ForbiddenException('You cannot modify this task');
    }

    Object.assign(task, updateTaskDto);

    return task;
  }

  async remove(id: string, userId: string): Promise<Task | null> {
    // NOTE: This currently deletes any task regardless of user
    // TODO for candidates: Add authorization check
    const task = await this.taskModel.findOneAndDelete({ _id: id, userId });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId.toString() !== userId.toString()) {
      throw new ForbiddenException('You cannot delete this task');
    }

    return task;
  }
}
