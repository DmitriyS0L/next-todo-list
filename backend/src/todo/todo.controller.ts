import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthUser } from '../auth/decorators/user.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTodoDto, ReorderTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(@AuthUser('id') userId: string) {
    return this.todoService.findAll(userId);
  }

  @Get(':id')
  findById(@Param('id') id: string, @AuthUser('id') userId: string) {
    return this.todoService.findById(id, userId);
  }

  @Post()
  create(@Body() todoData: CreateTodoDto, @AuthUser('id') userId: string) {
    return this.todoService.create(todoData, userId);
  }

  @Patch('reorder')
  async reorder(@Body() dto: ReorderTodoDto, @AuthUser('id') userId: string) {
    await this.todoService.reorder(dto.todos, userId);
    return { success: true };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() todoData: UpdateTodoDto,
    @AuthUser('id') userId: string
  ) {
    return this.todoService.update(id, todoData, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @AuthUser('id') userId: string) {
    return this.todoService.delete(id, userId);
  }
}

// ВАЖЛИВО: ТУТ ДІЇ ІЄРАРХІЯ
// NotFoundException - коли не знайдено (findById, findAll)
// BadRequestException - коли не вдалось створити/оновити/видалити (create, update, delete, reorder)
// Інші помилки - InternalServerErrorException
