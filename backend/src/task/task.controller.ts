import {
  Controller,
  Post,
  Get,
  Patch,
  Put,
  Delete,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.taskService.findAll(this.requireUserId(userId));
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('userId') userId?: string,
  ) {
    return this.taskService.findOne(id, this.requireUserId(userId));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Query('userId') userId?: string,
  ) {
    return this.taskService.update(
      id,
      this.requireUserId(userId),
      updateTaskDto,
    );
  }

  @Put(':id')
  replace(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Query('userId') userId?: string,
  ) {
    return this.taskService.update(
      id,
      this.requireUserId(userId),
      updateTaskDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Query('userId') userId?: string,
  ) {
    return this.taskService.remove(id, this.requireUserId(userId));
  }

  private requireUserId(userId?: string): string {
    if (!userId?.trim()) {
      throw new BadRequestException('userId is required');
    }

    return userId.trim();
  }
}