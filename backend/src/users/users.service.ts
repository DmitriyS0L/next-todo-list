import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { catchError, from, map, Observable, tap, throwError } from 'rxjs';
import { QueryRunner, UpdateResult } from 'typeorm';
import { UserCreateInterface } from './interface/user-create.interface';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    try {
      this.logger.log(`Finding all users`);
      const users = await this.usersRepository.findAll();
      this.logger.log(`Found ${users.length} users`);
      return users;
    } catch (err) {
      this.logger.error(`Error finding all users: ${err}`);
      throw new NotFoundException('Users not found');
    }
  }

  async findById(id: string): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.usersRepository.findById(id);
      this.logger.log(`Found user ${user.id}`);
      const { password, ...userWithoutPassword } = user; // деструктуризация об'єкта користувача для видалення пароля і повернення решти полів
      return userWithoutPassword;
    } catch (err) {
      this.logger.error(`Error finding user by id ${id}: ${err}`);
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  findByEmail$(email: string, qr?: QueryRunner): Observable<User> {
    return from(this.usersRepository.findByEmail(email, qr)).pipe(
      tap((user) => this.logger.log(`Found user ${user.email}`)),
      catchError((err) => {
        this.logger.error(`Error finding user by email ${email}: ${err}`);
        return throwError(() => new NotFoundException(err));
      })
    );
  }

  create$(input: UserCreateInterface, qr?: QueryRunner): Observable<boolean> {
    this.logger.log(`Creating user by ${JSON.stringify(input)}`);
    return from(this.usersRepository.create$(input, qr)).pipe(
      tap((user) => this.logger.log(`Created user ${JSON.stringify(user)}`)),
      map(() => true),
      catchError((err) => {
        this.logger.error(`Error creating user: ${err}`);
        return throwError(() => new NotFoundException(err));
      })
    );
  }

  update$(id: string, user: Partial<User>, qr?: QueryRunner): Observable<UpdateResult> {
    this.logger.log(`Updating user with id ${id}`);
    return from(this.usersRepository.update$(id, user, qr)).pipe(
      tap(() => this.logger.log(`Updated user with id ${id}`)),
      catchError((err) => {
        this.logger.error(`Error updating user with id ${id}: ${err}`);
        return throwError(() => new NotFoundException(`User with id ${id} not found`));
      })
    );
  }

  async delete(id: string) {
    try {
      this.logger.log(`Deleting user with id ${id}`);
      await this.usersRepository.delete(id);
      this.logger.log(`Deleted user with id ${id}`);
    } catch (err) {
      this.logger.error(`Error deleting user with id ${id}: ${err}`);
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
