import { ITodo } from '@libs/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { TodoEntity } from './entity/todo.entity';
import { CreateTodoDto } from '../dto/todo.dto';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>
  ) {}

  async findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find({ order: { order: 'ASC' }, relations: ['checklist'] });
  }

  async findByIdOrFail(id: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new Error(`Todo ${id} not found`);
    }
    return todo;
  }

  create(todoData: CreateTodoDto): Promise<TodoEntity> {
    return this.todoRepository.save(todoData);
  }

  async save(entity: DeepPartial<TodoEntity>[]): Promise<TodoEntity[]> {
    return this.todoRepository.save(entity);
  }

  async update(id: string, todoData: Partial<ITodo>): Promise<TodoEntity> {
    await this.todoRepository.save({ id, ...todoData });
    return this.findByIdOrFail(id);
  }

  async delete(id: string) {
    await this.todoRepository.delete(id);
  }
}
