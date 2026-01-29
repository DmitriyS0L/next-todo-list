import { ITodo } from '@libs/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';
import { TodoEntity } from './entity/todo.entity';
import { CreateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>
  ) {}

  async findAll(userId: string): Promise<TodoEntity[]> {
    return this.todoRepository.find({
      where: { user: { id: userId } },
      order: { order: 'ASC' },
      relations: ['checklist'],
    });
  }

  async findByIdOrFail(id: string, userId: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id, user: { id: userId } } });
    if (!todo) {
      throw new Error(`Todo ${id} not found`);
    }
    return todo;
  }

  async findAllByIds(ids: string[], userId: string): Promise<TodoEntity[]> {
    return this.todoRepository.find({
      where: {
        id: In(ids),
        user: { id: userId },
      },
    });
  }

  create(todoData: CreateTodoDto, userId: string): Promise<TodoEntity> {
    const todo = this.todoRepository.create({
      ...todoData,
      user: { id: userId },
    });
    return this.todoRepository.save(todo);
  }

  async save(entity: DeepPartial<TodoEntity>[]): Promise<TodoEntity[]> {
    return this.todoRepository.save(entity);
  }

  async update(id: string, todoData: Partial<ITodo>, userId: string): Promise<TodoEntity> {
    const todo = await this.findByIdOrFail(id, userId);
    return this.todoRepository.save({ ...todo, ...todoData });
  }

  async delete(id: string, userId: string) {
    const todo = await this.findByIdOrFail(id, userId);
    await this.todoRepository.remove(todo);
  }
}
