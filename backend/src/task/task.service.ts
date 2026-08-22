import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Task,
  TaskDocument,
} from './schemas/task.schema';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel(createTaskDto);

    return task.save();
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel
      .findOne({ _id: id, userId })
      .exec();

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(
    id: string,
    userId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.taskModel
      .findOneAndUpdate(
        { _id: id, userId },
        updateTaskDto,
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  
  async remove(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel
      .findOneAndDelete({ _id: id, userId })
      .exec();

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }
}