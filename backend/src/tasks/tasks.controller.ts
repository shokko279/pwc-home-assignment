import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

// TODO for candidates: Add authentication guard to protect these routes
// TODO for candidates: Extract user ID from JWT token instead of hardcoding
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
    // FIXME: This hardcoded userId should come from the authenticated user's JWT token
    const userId = req.user.userId;
    return this.tasksService.create(createTaskDto, userId);
  }
  
  @Get()
  findAll(@Req() req: any) {
    const userId = req.user.userId;
    return this.tasksService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.userId;
    return this.tasksService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.tasksService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.userId;
    return this.tasksService.remove(id, userId);
  }
}
