import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSource } from './data-source';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        ...dataSource.options,
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
