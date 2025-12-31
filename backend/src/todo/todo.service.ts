import { ITodo } from '@libs/shared';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from '../dto/todo.dto';
import { TodoEntity } from './entity/todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);
  constructor(private readonly todoRepository: TodoRepository) {}

  async findAll(): Promise<TodoEntity[]> {
    try {
      this.logger.log('Finding all todos');
      const todos = await this.todoRepository.findAll();
      this.logger.log(`Found ${todos.length} todos`);
      return todos;
    } catch (err) {
      this.logger.log(`Error finding todos: ${err}`);
      throw new NotFoundException('Todos not found');
    }
  }

  async findById(id: string): Promise<TodoEntity> {
    try {
      this.logger.log(`Finding user by id ${id}`);
      const todo = await this.todoRepository.findByIdOrFail(id);
      this.logger.log(`Found user ${todo.id}`);
      return todo;
    } catch (err) {
      this.logger.log(`Error finding todo by id ${id}: ${err}`);
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
  }

  async create(todoData: CreateTodoDto): Promise<TodoEntity> {
    try {
      const savedTodo = await this.todoRepository.create(todoData);
      this.logger.log(`Todo created ${JSON.stringify(savedTodo)}`);
      return savedTodo;
    } catch (error) {
      this.logger.log(`Error creating todo ${JSON.stringify(todoData)}: ${error}`);
      throw new BadRequestException('Todo not created');
    }
  }

  async update(id: string, todoData: Partial<ITodo>): Promise<TodoEntity> {
    try {
      this.logger.log(`Updating todo ${id}`);
      const updatedTodo = await this.todoRepository.update(id, todoData);
      this.logger.log(`Todo updated ${updatedTodo.id}`);
      return updatedTodo;
    } catch (error) {
      this.logger.log(`Error updating todo ${id}: ${error}`);
      throw new BadRequestException('Todo not updated');
    }
  }

  async reorder(todos: { id: string }[]) {
    try {
      this.logger.log(`Reordering todos`);

      const updatedTodos = todos.map((todo, index) => ({
        id: todo.id,
        order: index + 1,
      }));

      await this.todoRepository.save(updatedTodos);

      this.logger.log(`Todos reordered`);
    } catch (error) {
      this.logger.error(`Error reordering todos: ${error}`);
      throw new BadRequestException('Todos not reordered');
    }
  }

  async delete(id: string) {
    await this.todoRepository.delete(id);
  }
}

// ВАЖЛИВО: ТУТ ДІЇ ІЄРАРХІЯ
// NotFoundException - коли не знайдено (findById, findAll)
// BadRequestException - коли не вдалось створити/оновити/видалити (create, update, delete, reorder)
// Інші помилки - InternalServerErrorException
