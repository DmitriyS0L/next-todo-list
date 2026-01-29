import { ITodo } from '@libs/shared';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/todo.dto';
import { TodoEntity } from './entity/todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);
  constructor(private readonly todoRepository: TodoRepository) {}

  async findAll(userId: string): Promise<TodoEntity[]> {
    try {
      this.logger.log('Finding all todos');
      const todos = await this.todoRepository.findAll(userId);
      this.logger.log(`Found ${todos.length} todos`);
      return todos;
    } catch (err) {
      this.logger.log(`Error finding todos: ${err}`);
      throw new NotFoundException('Todos not found');
    }
  }

  async findById(id: string, userId: string): Promise<TodoEntity> {
    try {
      this.logger.log(`Finding todo by id ${id}`);
      const todo = await this.todoRepository.findByIdOrFail(id, userId);
      this.logger.log(`Found todo ${todo.id}`);
      return todo;
    } catch (err) {
      this.logger.log(`Error finding todo by id ${id}: ${err}`);
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
  }

  async create(todoData: CreateTodoDto, userId: string): Promise<TodoEntity> {
    try {
      const savedTodo = await this.todoRepository.create(todoData, userId);
      this.logger.log(`Todo created ${JSON.stringify(savedTodo)}`);
      return savedTodo;
    } catch (error) {
      this.logger.log(`Error creating todo ${JSON.stringify(todoData)}: ${error}`);
      throw new BadRequestException('Todo not created');
    }
  }

  async update(id: string, todoData: Partial<ITodo>, userId: string): Promise<TodoEntity> {
    try {
      this.logger.log(`Updating todo ${id}`);
      const updatedTodo = await this.todoRepository.update(id, todoData, userId);
      this.logger.log(`Todo updated ${updatedTodo.id}`);
      return updatedTodo;
    } catch (error) {
      this.logger.log(`Error updating todo ${id}: ${error}`);
      throw new BadRequestException('Todo not updated');
    }
  }

  async reorder(todos: { id: string }[], userId: string) {
    // Додаємо userId як другий аргумент
    try {
      this.logger.log(`Reordering todos for user: ${userId}`);

      // 1. Отримуємо всі ID, які прийшли з фронтенду
      const todoIds = todos.map((t) => t.id);

      // 2. ПЕРЕВІРКА: Шукаємо в базі таски з цими ID, що належать саме цьому юзеру
      const userTodos = await this.todoRepository.findAllByIds(todoIds, userId);

      if (userTodos.length !== todos.length) {
        throw new ForbiddenException('One or more todos not found or access denied');
      }

      // 3. Формуємо масив для оновлення (зберігаємо тільки ID та новий порядок)
      const updatedTodos = todos.map((todo, index) => ({
        id: todo.id,
        order: index + 1,
        userId: userId,
      }));

      // 4. Зберігаємо
      await this.todoRepository.save(updatedTodos);

      this.logger.log(`Todos reordered for user: ${userId}`);
      return { success: true };
    } catch (error) {
      this.logger.error(`Error reordering todos: ${error}`);
      if (error instanceof ForbiddenException) throw error;
      throw new BadRequestException('Todos not reordered');
    }
  }

  async delete(id: string, userId: string) {
    this.logger.log(`Deleting todo ${id}`);
    await this.todoRepository.delete(id, userId);
  }
}

// ВАЖЛИВО: ТУТ ДІЇ ІЄРАРХІЯ
// NotFoundException - коли не знайдено (findById, findAll)
// BadRequestException - коли не вдалось створити/оновити/видалити (create, update, delete, reorder)
// Інші помилки - InternalServerErrorException
