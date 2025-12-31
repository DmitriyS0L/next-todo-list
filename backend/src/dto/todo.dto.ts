import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TodoLabelEnum } from '@libs/shared';
import { TodoPriorityEnum } from '@libs/shared';
import { TodoStatusEnum } from '@libs/shared';
import { TodoTypeEnum } from '@libs/shared';
import { TodoCheckListItem } from 'src/todo/entity/checklist.entity';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsEnum(TodoPriorityEnum)
  priority!: TodoPriorityEnum;

  @IsNotEmpty()
  @IsEnum(TodoTypeEnum)
  type!: TodoTypeEnum;

  @IsEnum(TodoStatusEnum)
  @IsOptional()
  status?: TodoStatusEnum = TodoStatusEnum.PENDING;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status?: TodoStatusEnum;

  @IsOptional()
  @IsEnum(TodoLabelEnum, { each: true })
  labels?: TodoLabelEnum[];

  @IsOptional()
  @IsArray()
  comment?: string[];

  @IsOptional()
  @IsDate()
  deadline?: Date;

  @IsOptional()
  order?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateTodoCheckListItemDto)
  checklist?: TodoCheckListItem[];
}

export class DeleteTodoDto {
  @IsNotEmpty()
  @IsString()
  id!: string;
}

export class TodoOrderItemDto {
  @IsUUID()
  id!: string;

  @IsInt()
  order!: number;
}

export class ReorderTodoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TodoOrderItemDto)
  todos!: TodoOrderItemDto[];
}

export class UpdateTodoCheckListItemDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  isChecked?: boolean;

  @IsOptional()
  @IsString()
  assigned?: string | null;

  @IsOptional()
  @IsDateString()
  date?: string;
}
