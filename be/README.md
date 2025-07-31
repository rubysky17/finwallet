
![Markdown Logo](/background.png)
### Get Started

- Ví dụ: Khi muốn tạo 1 đầu API mới ví dụ "/task" và CRUD với nó thì trong đầu hãy nghĩ **MCS** (Module - Controler - Service).
- **Module** sẽ chứa 2 thứ là *Controller* và *Service*
- Đối với handshort ta có thể chạy lệnh để tạo nhanh 3 files:
```bash
nest g module todo
nest g controller todo
nest g service todo
```
- Sau đó ta tiếp tục logic ở vậy thực thể muốn tạo trông như thế nào ? Entity để ánh xạ tới thực thể.
```typescript
// todo/todo.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todos")
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: false })
    isCompleted: boolean
}

// Thực thể mang id, title, isCompleted
```
- Tiếp theo, mình sẽ đến với vẽ đường hay còn gọi là **Controller**
```typescript
// todo/todo.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    getAll() {
        return this.todoService.getAllTodos();
    }
}

// todo bên trong tham số decorator của Controller là nghĩa "/todo"
// Lúc này, TodoService sẽ warning tại vì mình chưa viết logic cho tuyến đó
// contructor để có thể sử dụng this "chấm" đến đối tượng mình muốn truy xuất cụ thể là thằng TodoService, còn muốn truy xuất nhiều hơn thì mình sẽ nâng cao hơn.
```
- Cuối cùng là hoàn thành logic của **Service**
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepo: Repository<Todo>,
    ) { }

    findAll() {
        return this.todoRepo.find();
    }
}

// Đối với service, ta sẽ có mở đầu bằng @InjectTable()
// Tiếp theo, constructor sẽ là decorator @InjectRepository(Todo), với tham số là entity Todo đã định nghĩa
// Tiếp tục, khai báo đối tượng là todoRepo với type là Repository<Todo> và Todo bên trong Repository chính là khái niệm Ultity trong Typescript cơ bản
// Cuối cùng viết logic thôi là xong.
```
- Còn một điều quan trọng nữa là phải cấu hình **Module** để nó két nối 2 thằng **Service** và **Controller** lại với nhau.
```typescript
import { Module } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./todo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule { }

// ! Lưu ý: Imports trực tiếp sử dụng Entity trong suốt service vận hành.
```