import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateTodoDto, ReorderTodoDto, UpdateTodoDto } from '../dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(id: string) {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() todoData: CreateTodoDto) {
    return this.service.create(todoData);
  }

  @Patch('reorder')
  async reorder(@Body() dto: ReorderTodoDto) {
    await this.service.reorder(dto.todos);
    return { success: true };
  }

  @Patch(':id')
  async updateStatus(@Param('id') id: string, @Body() todoData: UpdateTodoDto) {
    return this.service.update(id, todoData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() todoData: UpdateTodoDto) {
    return this.service.update(id, todoData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}

// ВАЖЛИВО: ТУТ ДІЇ ІЄРАРХІЯ
// NotFoundException - коли не знайдено (findById, findAll)
// BadRequestException - коли не вдалось створити/оновити/видалити (create, update, delete, reorder)
// Інші помилки - InternalServerErrorException
