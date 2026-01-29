import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, InsertResult, QueryRunner, Repository, UpdateResult } from 'typeorm';
import { IUser } from '@libs/shared';
import { defer, from, Observable } from 'rxjs';

export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<IUser>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['todos'] });
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { id },
      relations: ['todos'],
    });
  }

  async findByEmail(email: string, qr?: QueryRunner): Promise<User> {
    return this.userRepository.createQueryBuilder('u', qr).where({ email }).getOneOrFail();
  }

  create$(user: DeepPartial<IUser>, qr?: QueryRunner): Observable<InsertResult> {
    return defer(() =>
      this.userRepository.createQueryBuilder('u', qr).insert().values(user).execute()
    );
  }

  update$(id: string, user: DeepPartial<User>, qr?: QueryRunner): Observable<UpdateResult> {
    return defer(() =>
      this.userRepository
        .createQueryBuilder('u', qr)
        .update(User)
        .set(user)
        .where('id = :id', { id })
        .execute()
    );
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
  }
}
