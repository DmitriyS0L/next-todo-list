import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { boolean } from 'yargs';
import { TodoEntity } from './todo.entity';

@Entity('todo_checklist_item')
export class TodoCheckListItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('boolean', { default: false })
  isChecked!: boolean;

  @Column('text')
  title!: string;

  @Column('timestamp', { nullable: true })
  date!: Date;

  @Column('text', { nullable: true })
  assigned!: string;

  @ManyToOne(() => TodoEntity, (todo) => todo.checklist, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'todoId' })
  todo!: TodoEntity;

  @Column('uuid')
  todoId!: string;
}
