import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3303,
      username: 'root',
      password: '123456',
      database: 'todo_db',
      autoLoadEntities: true,
      synchronize: true, // tự tạo table
    }),
    TodoModule,
  ]
})
export class AppModule { }
